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

    const [workroll, setWorkroll] = useState<Workroll[]>([]);

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
                        <th className="px-4 py-2 text-lg font-bold">{header}</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(grouped).map((gt) => (
                        <React.Fragment key={gt}>
                            {/* grinding_type の小見出し */}
                            <tr>
                                <td
                                    className="px-2 py-1 font-semibold text-center"
                                    style={{
                                        backgroundColor: grindingBgColor[col]
                                    }}
                                >
                                    {gt}
                                </td>
                            </tr>

                            {/* grinding_type に属する WorkrollButton を縦に並べる */}
                            {grouped[gt].map((obj) => (
                                <tr key={obj.id} style={{ borderBottom: "8px solid transparent" }}>
                                    <td className="px-1 py-1">
                                        <WorkrollButton
                                            id={obj.id}
                                            roll_id={obj.roll_id}
                                            status={obj.status}
                                        />
                                    </td>
                                </tr>
                            ))}
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
                        col   // ← 追加
                    )}
                </div>
            ))}
        </div>
    );
}
