"use client";

import { useState, useEffect, useRef } from "react";
import { WorkrollAdmin } from "@/components/workroll/WorkrollAdmin";
import { WorkrollDelete } from "@/components/workroll/WorkrollDelete";
import { Workroll } from "@/types/workroll";

export function WorkrollList({ workroll }: { workroll: Workroll[] }) {
    const [rollTypeFilter, setRollTypeFilter] = useState("");
    const [grindingTypeFilter, setGrindingTypeFilter] = useState("");
    const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

    const filtered = workroll.filter((item: Workroll) => {
        return (
            (rollTypeFilter === "" || item.roll_type === rollTypeFilter) &&
            (grindingTypeFilter === "" || item.grinding_type === grindingTypeFilter)
        );
    });

    // 砥石種リストの状態管理
    const [grindingTypes, setGrindingTypes] = useState<string[]>([]);

    useEffect(() => {
        const loadGrindingTypes = async () => {
            const res = await fetch("/data/grinding_type.json");
            const data = await res.json();
            setGrindingTypes(data.grinding_types);
        };
        loadGrindingTypes();
    }, []);

    // 研削種選択時にスクロール移動
    const handleGrindingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGrindingTypeFilter(value);

        if (value) {
            setTimeout(() => {
                const firstMatchingRow = workroll.find(item => item.grinding_type === value);
                if (firstMatchingRow && rowRefs.current.has(firstMatchingRow.id)) {
                    const row = rowRefs.current.get(firstMatchingRow.id);
                    row?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 0);
        }
    };


    return (
        <div className="w-full">

            {/* ▼ フィルタ UI ▼ */}
            <div className="flex gap-4 mb-4">

                {/* CSV ダウンロード */}
                <a
                    href="/api/workroll/export"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    CSV出力
                </a>

                {/* ロール種フィルタ */}
                <select
                    value={rollTypeFilter}
                    onChange={(e) => setRollTypeFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">ロール種（すべて）</option>
                    <option value="φ30">φ30</option>
                    <option value="φ40">φ40</option>
                    <option value="φ50">φ50</option>
                </select>

                {/* 研削種フィルタ */}
                <select
                    value={grindingTypeFilter}
                    onChange={handleGrindingTypeChange}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">研削種（すべて）</option>
                    {grindingTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

            </div>

            {/* ▼ テーブル ▼ */}
            <table className="table table-sm w-full">
                <thead>
                    <tr>
                        <th className="px-4 sticky top-10 bg-white z-10">ロール番号</th>
                        <th className="px-4 sticky top-10 bg-white z-10">ロール種</th>
                        <th className="px-4 sticky top-10 bg-white z-10">研削種</th>
                        <th className="px-4 sticky top-10 bg-white z-10">研削量</th>
                        <th className="px-4 sticky top-10 bg-white z-10">ロール径(RG)</th>
                        <th className="px-4 sticky top-10 bg-white z-10">ロール径(ML)</th>
                        <th className="px-4 sticky top-10 bg-white z-10">幅</th>
                        <th className="px-4 sticky top-10 bg-white z-10">Ra_市川</th>
                        <th className="px-4 sticky top-10 bg-white z-10">Ra_光</th>
                        <th className="px-4 sticky top-10 bg-white z-10">作業日付</th>
                        <th className="px-4 sticky top-10 bg-white z-10">作業順</th>
                        <th className="px-4 sticky top-10 bg-white z-10">研削時間</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止コード1</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止時間1</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止コード2</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止時間2</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止コード3</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止時間3</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止コード4</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止時間4</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止コード5</th>
                        <th className="px-4 sticky top-10 bg-white z-10">休止時間5</th>
                        <th className="px-4 sticky top-10 bg-white z-10">作業者</th>
                        <th className="px-4 sticky top-10 bg-white z-10">作業組</th>
                        <th className="px-4 sticky top-10 bg-white z-10">合否</th>
                        <th className="px-4 sticky top-10 bg-white z-10">コメント</th>
                        <th className="px-4 sticky top-10 bg-white z-10">ステータス</th>
                        <th className="px-4 sticky top-10 bg-white z-10">編集</th>
                        <th className="px-4 sticky top-10 bg-white z-10">削除</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.map((dist: Workroll) => (
                        <tr 
                            key={dist.id}
                            ref={(el) => {
                                if (el) {
                                    rowRefs.current.set(dist.id, el);
                                }
                            }}
                        >
                            <td className="border p-2 text-center">{dist.roll_id}</td>
                            <td className="border p-2 text-center">{dist.roll_type}</td>
                            <td className="border p-2 text-center">{dist.grinding_type}</td>
                            <td className="border p-2 text-center">{dist.grinding_amount}</td>
                            <td className="border p-2 text-center">{dist.diameter_rg}</td>
                            <td className="border p-2 text-center">{dist.diameter_ml}</td>
                            <td className="border p-2 text-center">{dist.width}</td>
                            <td className="border p-2 text-center">{dist.ra_i}</td>
                            <td className="border p-2 text-center">{dist.ra_h}</td>
                            <td className="border p-2 text-center">{dist.operation_date}</td>
                            <td className="border p-2 text-center">{dist.grinding_number}</td>
                            <td className="border p-2 text-center">{dist.processing_time}</td>
                            <td className="border p-2 text-center">{dist.non_processing_code1}</td>
                            <td className="border p-2 text-center">{dist.non_processing_time1}</td>
                            <td className="border p-2 text-center">{dist.non_processing_code2}</td>
                            <td className="border p-2 text-center">{dist.non_processing_time2}</td>
                            <td className="border p-2 text-center">{dist.non_processing_code3}</td>
                            <td className="border p-2 text-center">{dist.non_processing_time3}</td>
                            <td className="border p-2 text-center">{dist.non_processing_code4}</td>
                            <td className="border p-2 text-center">{dist.non_processing_time4}</td>
                            <td className="border p-2 text-center">{dist.non_processing_code5}</td>
                            <td className="border p-2 text-center">{dist.non_processing_time5}</td>
                            <td className="border p-2 text-center">{dist.operator}</td>
                            <td className="border p-2 text-center">{dist.operation_group}</td>
                            <td className="border p-2 text-center">{dist.judgement}</td>
                            <td className="border p-2 text-center">{dist.comment}</td>
                            <td className="border p-2 text-center">{dist.status}</td>
                            <td className="border p-2 text-center">
                                <WorkrollAdmin id={dist.id} />
                            </td>
                            <td className="border p-2 text-center">
                                <WorkrollDelete id={dist.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
