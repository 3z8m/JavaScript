//============================================================
// 一定時間ごとにデータを取得＋レンダリング
//============================================================
'use client'

import React, { useState, useEffect } from "react";
import { Workroll } from "@/types/workroll";
import { WorkrollButton } from "./WorkrollButton";

// roll_type → 列番号
const getColumnByRollType = (type: string): string => {
    switch (type) {
        case "H30":
            return "1";
        case "H50":
            return "2";
        case "WC30":
            return "3";
        default:
            return "4";
    }
};

// 列番号 → 見出し名
const columnHeader: Record<string, string> = {
    "1": "H30",
    "2": "H50",
    "3": "WC30",
    "4": "その他"
};

// 列番号 → 背景色
const columnBgColor: Record<string, string> = {
    "1": "#E0F7FF", // H30
    "2": "#FFF4CC", // H50
    "3": "#FFE0E0", // WC30
    "4": "#F0F0F0"  // その他
};

// grinding_type ごとに背景色を少し濃くする
const grindingBgColor: Record<string, string> = {
    "1": "#B3E9FF", // H30 → 少し濃い水色
    "2": "#FFE08A", // H50 → 少し濃い黄色
    "3": "#FFB3B3", // WC30 → 少し濃い赤
    "4": "#D9D9D9"  // その他 → 少し濃いグレー
};


export function WorkrollTable() {

    // APIから取得したWorkrollデータを格納するステート
    const [workroll, setWorkroll] = useState<Workroll[]>([]);

    // ソート状態（昇順・降順・なし）を管理するステート
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    // データ取得
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
    // grinding_type ごとに縦方向へ分割して表示するテーブル
    //============================================================
    const renderTable = (content: Workroll[], header: string, col: string) => {
        // grinding_type ごとにグループ化
        const grouped = content.reduce((acc: Record<string, Workroll[]>, cur) => {
            const gt = cur.grinding_type ?? "未設定";
            if (!acc[gt]) acc[gt] = [];
            acc[gt].push(cur);
            return acc;
        }, {});

        return (
            <table className="table table-sm w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-2xl font-bold">{header}</th>
                        <th className="px-4 py-2 text-base font-bold">径</th>
                        <th className="px-4 py-2 text-base font-bold">Ra</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(grouped).map((gt) => (
                        <React.Fragment key={gt}>
                            {/* grinding_type の小見出し */}
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-2 py-1 text-lg font-semibold text-center"
                                    style={{
                                        backgroundColor: grindingBgColor[col],
                                        // paddingTop: "20px"
                                    }}
                                >
                                    {gt}
                                </td>
                            </tr>

                            {/* grinding_type に属する WorkrollButton を縦に並べる */}
                            {grouped[gt]
                                .slice()                        // 元データを破壊しない
                                .sort((a, b) => {               // 径でソート
                                    if (!sortOrder) return 0;
                                    const da = a.diameter ?? 0;
                                    const db = b.diameter ?? 0;
                                    return sortOrder === "asc" ? da - db : db - da;
                                })
                                .map((obj) => (
                                    <tr key={obj.id} style={{ borderBottom: "8px solid transparent" }}>
                                        <td className="px-1 py-1">
                                            <WorkrollButton
                                                id={obj.id}
                                                roll_id={obj.roll_id}
                                                status={obj.status}
                                            />
                                        </td>
                                        <td className="text-center px-1">
                                            <span style={{ fontSize: "1.1rem" }}>{obj.diameter ?? ""}</span>
                                        </td>
                                        <td className="text-center px-1">
                                            <span style={{ fontSize: "1.1rem" }}>{obj.ra_i ?? ""}</span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        );
    };

    //============================================================
    // レイアウト（4列）
    //============================================================
    return (
        <div className="w-full">

            {/* 径でソートするボタン */}
            <div className="flex gap-2 mb-2">
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
            </div>

            {/* 4列レイアウト */}
            <div className="flex flex-row gap-1 w-full">
                {["1", "2", "3", "4"].map((col, index) => (
                    <div
                        key={col}
                        className="flex-1"
                        style={{
                            backgroundColor: columnBgColor[col],
                            borderRight: index < 3 ? "1px solid #DDD" : "none",
                            paddingRight: "4px",
                            paddingTop: "4px",
                            paddingBottom: "4px"
                        }}
                    >
                        {renderTable(
                            workroll.filter(obj => getColumnByRollType(obj.roll_type) === col),
                            columnHeader[col],
                            col   // grinding_type ごとの背景色を決めるために列番号も渡す
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
