//============================================================
// 一定時間ごとにデータを取得＋レンダリング
//============================================================
'use client'

import React, { useState, useEffect, useRef } from "react";
import { Workroll } from "@/types/workroll";
import { WorkrollButton } from "./WorkrollButton";


export function WorkrollTable() {

    // APIから取得したWorkrollデータを格納するステート
    const [workroll, setWorkroll] = useState<Workroll[]>([]);

    // ソート状態（昇順・降順・なし）を管理するステート
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    // 砥石種リストの状態管理
    const [grindingTypes, setGrindingTypes] = useState<string[]>([]);

    // 列への参照マップ
    const columnRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    // スクロールコンテナの参照
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    //------------------------------------------------------------------------
    // grinding_type → 列番号、列番号 → 見出し名・背景色 を定義したマッピングデータ
    //------------------------------------------------------------------------
    const [grindingMap, setGrindingMap] = useState<any>(null);

    useEffect(() => {
        const loadMap = async () => {
            const res = await fetch("/data/grinding_map.json");
            const json = await res.json();
            setGrindingMap(json);
        };
        loadMap();
    }, []);

    useEffect(() => {
        const loadGrindingTypes = async () => {
            const res = await fetch("/data/grinding_type.json");
            const data = await res.json();
            setGrindingTypes(data.grinding_types);
        };
        loadGrindingTypes();
    }, []);

    // grinding_type → 列番号
    const getColumnByGrindingType = (type: string): string => {
        if (!grindingMap) return "7"; // ロード前はその他扱い

        const found = grindingMap.types.find((t: any) => t.grinding_type === type);
        return found ? found.column : grindingMap.default.column;
    };

    // grinding_type 選択時のスクロール移動（横方向のみ）
    const handleGrindingTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        if (!selectedType) return;

        const targetCol = getColumnByGrindingType(selectedType);
        setTimeout(() => {
            const colDiv = columnRefs.current.get(targetCol);
            if (colDiv && scrollContainerRef.current) {
                const colRect = colDiv.getBoundingClientRect();
                const containerRect = scrollContainerRef.current.getBoundingClientRect();
                
                // 横方向のスクロール位置を計算
                const scrollLeft = scrollContainerRef.current.scrollLeft + (colRect.left - containerRect.left);
                
                // 横方向のみスクロール
                scrollContainerRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }
        }, 0);
    };

    // 列番号 → 見出し名
    const getHeaderByColumn = (col: string): string => {
        if (!grindingMap) return "";

        const found = grindingMap.types.find((t: any) => t.column === col);
        return found ? found.header : grindingMap.default.header;
    };

    // 列番号 → 背景色
    const getBgColor = (col: string): string => {
        if (!grindingMap) return "#EEE";

        const found = grindingMap.types.find((t: any) => t.column === col);
        return found ? found.bgColor : grindingMap.default.bgColor;
    };

    // grinding_type ごとに背景色を少し濃くする
    const getBgColorStrong = (col: string): string => {
        if (!grindingMap) return "#CCC";

        const found = grindingMap.types.find((t: any) => t.column === col);
        return found ? found.bgColorStrong : grindingMap.default.bgColorStrong;
    };

    //============================================================
    // データ取得
    //============================================================
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/workroll");
            const data: Workroll[] = await res.json();

            // status が "廃棄" のものを除外
            const filtered = data.filter(obj => obj.status !== "廃棄");

            // roll_id ごとに最後の1件だけ残す
            const uniqueLatest: Workroll[] = Object.values(
                filtered.reduce((acc: Record<string, Workroll>, cur: Workroll) => {
                    acc[cur.roll_id] = cur; // 同じ roll_id は上書き → 最後の1件が残る
                    return acc;
                }, {})
            );

            setWorkroll(uniqueLatest);
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // 10秒ごと更新
        return () => clearInterval(interval);
    }, []);

    //============================================================
    // roll_type ごとに縦方向へ分割して表示するテーブル
    //============================================================
    const renderTable = (content: Workroll[], header: string, col: string) => {
        
        // roll_type ごとにグループ化
        const grouped = content.reduce((acc: Record<string, Workroll[]>, cur) => {
            const rt = cur.roll_type ?? "未設定";
            if (!acc[rt]) acc[rt] = [];
            acc[rt].push(cur);
            return acc;
        }, {});

        // 配列を size 個ずつに分割する関数
        const chunk = <T,>(arr: T[], size: number): T[][] => {
            const result: T[][] = [];
            for (let i = 0; i < arr.length; i += size) {
                result.push(arr.slice(i, i + size));
            }
            return result;
        };

        return (
            <table className="table table-sm w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-2xl font-bold">{header}</th>
                        <th className="px-4 py-2 text-base font-bold">Ra</th>
                        <th className="px-4 py-2 text-base font-bold">径(RG)</th>
                        <th className="px-4 py-2 text-base font-bold">径(ML)</th>
                        <th className="px-4 py-2 text-base font-bold">板幅</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(grouped).map((rt) => {
                        const items = grouped[rt]
                            .slice()
                            .sort((a, b) => {
                                if (!sortOrder) return 0;
                                const da = a.diameter_rg ?? 0;
                                const db = b.diameter_rg ?? 0;
                                return sortOrder === "asc" ? da - db : db - da;
                            });

                        // ★ 〇個ごとに列へ分割
                        const columns = chunk(items, 10);

                        return (
                            <React.Fragment key={rt}>
                                {/* roll_type の小見出し */}
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-2 py-1 text-lg font-semibold text-center"
                                        style={{
                                            backgroundColor: getBgColorStrong(col),
                                        }}
                                    >
                                        {rt}
                                    </td>
                                </tr>

                                {/* 横方向に列を増やす */}
                                <tr>
                                    <td colSpan={4}>
                                        <div className="flex flex-row gap-4">
                                            {columns.map((colItems, colIndex) => (
                                                <div
                                                    key={colIndex}
                                                    className="flex flex-col"
                                                    style={{ minWidth: "180px" }}
                                                >
                                                    <table className="table table-sm w-full">
                                                        <tbody>
                                                            {colItems.map((obj) => (
                                                                <tr
                                                                    key={obj.id}
                                                                    style={{
                                                                        borderBottom: "8px solid transparent",
                                                                    }}
                                                                >
                                                                    <td className="px-1 py-1">
                                                                        <WorkrollButton
                                                                            id={obj.id}
                                                                            roll_id={obj.roll_id}
                                                                            status={obj.status}
                                                                        />
                                                                    </td>
                                                                    <td className="text-center px-1" style={{ borderRight: "1px solid #ddd" }}>
                                                                        <span style={{ fontSize: "1.1rem" }}>
                                                                            {obj.ra_i === 0 || obj.ra_i == null ? "" : obj.ra_i}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-center px-1" style={{ borderRight: "1px solid #ddd" }}>
                                                                        <span style={{ fontSize: "1.1rem" }}>
                                                                            {obj.diameter_rg === 0 || obj.diameter_rg == null ? "" : obj.diameter_rg}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-center px-1" style={{ borderRight: "1px solid #ddd" }}>
                                                                        <span style={{ fontSize: "1.1rem" }}>
                                                                            {obj.diameter_ml === 0 || obj.diameter_ml == null ? "" : obj.diameter_ml}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-center px-1">
                                                                        <span style={{ fontSize: "1.1rem" }}>
                                                                            {obj.width === 0 || obj.width == null ? "" : obj.width}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    //============================================================
    // レイアウト（4列）
    //============================================================
    return (
        <div className="w-full">

            {/* 径でソートするボタン + 研削種セレクト（スクロール追従） */}
            <div className="fixed bottom-0 left-0 right-0 flex gap-2 bg-white p-3 border-t border-gray-300 z-50 shadow-lg">
                <button
                    className="px-3 py-1 bg-blue-200 rounded"
                    onClick={() => setSortOrder("asc")}
                >
                    径 昇順
                </button>

                <button
                    className="px-3 py-1 bg-blue-200 rounded"
                    onClick={() => setSortOrder("desc")}
                >
                    径 降順
                </button>

                <button
                    className="px-3 py-1 bg-gray-300 rounded"
                    onClick={() => setSortOrder(null)}
                >
                    並び替え解除
                </button>

                {/* 研削種セレクト */}
                <select
                    onChange={handleGrindingTypeSelect}
                    className="border px-3 py-1 rounded ml-4"
                    defaultValue=""
                >
                    <option value="">研削種を選択</option>
                    {grindingTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* コンテンツ（下部の固定要素用スペース確保） */}
            <div className="pb-20 overflow-x-auto" ref={scrollContainerRef}>
                {/* 4列レイアウト */}
                <div className="flex flex-row gap-1 w-full">
                    {["1", "2", "3", "4", "5", "6", "7"].map((col, index) => (
                        <div
                            key={col}
                            ref={(el) => {
                                if (el) {
                                    columnRefs.current.set(col, el);
                                }
                            }}
                            className="flex-1"
                            style={{
                                backgroundColor: getBgColor(col),
                                borderRight: index < 3 ? "1px solid #DDD" : "none",
                                paddingRight: "4px",
                                paddingTop: "4px",
                                paddingBottom: "4px"
                            }}
                        >
                            {renderTable(
                                workroll.filter(obj => getColumnByGrindingType(obj.grinding_type) === col),
                                getHeaderByColumn(col),
                                col   // grinding_type ごとの背景色を決めるために列番号も渡す
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
