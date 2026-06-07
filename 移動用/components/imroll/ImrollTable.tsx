//============================================================
// 一定時間ごとにデータを取得＋レンダリング
//============================================================
'use client'

import React, { useState, useEffect, useRef } from "react";
import { Imroll } from "@/types/imroll";
import { ImrollButton } from "./ImrollButton";


export function ImrollTable() {

    // APIから取得したImrollデータを格納するステート
    const [imroll, setImroll] = useState<Imroll[]>([]);

    // テーパーコードの状態管理
    const [imrTaperCodes, setImrTaperCodes] = useState<string[]>([]);

    // 列への参照マップ
    const columnRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    //------------------------------------------------------------------------
    // taper_code → 列番号、列番号 → 見出し名・背景色 を定義したマッピングデータ
    //------------------------------------------------------------------------
    const [imrTaperMap, setImrTaperMap] = useState<any>(null);

    useEffect(() => {
        const loadImrTaperMap = async () => {
            const res = await fetch("/data/imr_taper_map.json");
            const json = await res.json();
            setImrTaperMap(json);
        };
        loadImrTaperMap();
    }, []);

    useEffect(() => {
        const loadImrTaperCodes = async () => {
            const res = await fetch("/data/imr_taper_code.json");
            const data = await res.json();
            setImrTaperCodes(data.taper_code);
        };
        loadImrTaperCodes();
    }, []);

    // taper_code → 列番号
    const getColumnByImrTaperCode = (code: string): string => {
        if (!imrTaperMap) return "7"; // ロード前はその他扱い

        const found = imrTaperMap.types.find((t: any) => t.taper_code === code);
        return found ? found.column : imrTaperMap.default.column;
    };


    // 列番号 → 見出し名
    const getHeaderByColumn = (col: string): string => {
        if (!imrTaperMap) return "";

        const found = imrTaperMap.types.find((t: any) => t.column === col);
        return found ? found.header : imrTaperMap.default.header;
    };

    // 列番号 → 背景色
    const getBgColor = (col: string): string => {
        if (!imrTaperMap) return "#EEE";

        const found = imrTaperMap.types.find((t: any) => t.column === col);
        return found ? found.bgColor : imrTaperMap.default.bgColor;
    };

    // imr_taper_code ごとに背景色を少し濃くする
    const getBgColorStrong = (col: string): string => {
        if (!imrTaperMap) return "#CCC";

        const found = imrTaperMap.types.find((t: any) => t.column === col);
        return found ? found.bgColorStrong : imrTaperMap.default.bgColorStrong;
    };

    //============================================================
    // データ取得
    //============================================================
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/imroll");
            const data: Imroll[] = await res.json();

            // status が "廃棄" のものを除外
            const filtered = data.filter(obj => obj.status !== "廃棄");

            // imr_id ごとに最後の1件だけ残す
            const uniqueLatest: Imroll[] = Object.values(
                filtered.reduce((acc: Record<string, Imroll>, cur: Imroll) => {
                    acc[cur.imr_id] = cur; // 同じ imr_id は上書き → 最後の1件が残る
                    return acc;
                }, {})
            );

            setImroll(uniqueLatest);
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // 10秒ごと更新
        return () => clearInterval(interval);
    }, []);

    //============================================================
    // imr_set_code ごとに縦方向へ分割して表示するテーブル
    //============================================================
    const renderTable = (content: Imroll[], header: string, col: string) => {
        
        // imr_set_code ごとにグループ化
        const grouped = content.reduce((acc: Record<string, Imroll[]>, cur) => {
            const rt = cur.imr_set_code ?? "未設定";
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
                        <th className="px-4 py-2 text-base font-bold">径</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(grouped).map((rt) => {
                        const items = grouped[rt].slice()

                        // ★ 〇個ごとに列へ分割
                        const columns = chunk(items, 10);

                        return (
                            <React.Fragment key={rt}>
                                {/* imr_set_code の小見出し */}
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
                                                                        <ImrollButton
                                                                            id={obj.id}
                                                                            imr_id={obj.imr_id}
                                                                            status={obj.status}
                                                                        />
                                                                    </td>
                                                                    <td className="text-center px-1" style={{ borderRight: "1px solid #ddd" }}>
                                                                        <span style={{ fontSize: "1.1rem" }}>
                                                                            {obj.imr_diameter_after === 0 || obj.imr_diameter_after == null ? "" : obj.imr_diameter_after}
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

            <div className="w-full" style={{ paddingBottom: "120px" }}>
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
                                imroll.filter(obj => getColumnByImrTaperCode(obj.taper_code) === col),
                                getHeaderByColumn(col),
                                col   // taper_code ごとの背景色を決めるために列番号も渡す
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
