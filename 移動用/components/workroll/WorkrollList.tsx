"use client";

import { useState } from "react";
import { WorkrollAdmin } from "@/components/workroll/WorkrollAdmin";
import { WorkrollDelete } from "@/components/workroll/WorkrollDelete";
import { Workroll } from "@/types/workroll";

export function WorkrollList({ workroll }: { workroll: Workroll[] }) {
    const [rollTypeFilter, setRollTypeFilter] = useState("");
    const [grindingTypeFilter, setGrindingTypeFilter] = useState("");

    const filtered = workroll.filter((item: Workroll) => {
        return (
            (rollTypeFilter === "" || item.roll_type === rollTypeFilter) &&
            (grindingTypeFilter === "" || item.grinding_type === grindingTypeFilter)
        );
    });

    return (
        <div className="w-full">

            {/* ▼ フィルタ UI ▼ */}
            <div className="flex gap-4 mb-4">

                {/* ロール種フィルタ */}
                <select
                    value={rollTypeFilter}
                    onChange={(e) => setRollTypeFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">ロール種（すべて）</option>
                    <option value="H30">H30</option>
                    <option value="H50">H50</option>
                    <option value="WC30">WC30</option>
                </select>

                {/* 研削種フィルタ */}
                <select
                    value={grindingTypeFilter}
                    onChange={(e) => setGrindingTypeFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">研削種（すべて）</option>
                    <option value="SD#120">SD#120</option>
                    <option value="SD#600">SD#600</option>
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
                        <th className="px-4 sticky top-10 bg-white z-10">ロール径</th>
                        <th className="px-4 sticky top-10 bg-white z-10">Ra_市川</th>
                        <th className="px-4 sticky top-10 bg-white z-10">Ra_光</th>
                        <th className="px-4 sticky top-10 bg-white z-10">作業日付</th>
                        <th className="px-4 sticky top-10 bg-white z-10">開始時間</th>
                        <th className="px-4 sticky top-10 bg-white z-10">終了時間</th>
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
                        <tr key={dist.id}>
                            <td className="border p-2 text-center">{dist.roll_id}</td>
                            <td className="border p-2 text-center">{dist.roll_type}</td>
                            <td className="border p-2 text-center">{dist.grinding_type}</td>
                            <td className="border p-2 text-center">{dist.grinding_amount}</td>
                            <td className="border p-2 text-center">{dist.diameter}</td>
                            <td className="border p-2 text-center">{dist.ra_i}</td>
                            <td className="border p-2 text-center">{dist.ra_h}</td>
                            <td className="border p-2 text-center">{dist.operation_date}</td>
                            <td className="border p-2 text-center">{dist.start_time}</td>
                            <td className="border p-2 text-center">{dist.end_time}</td>
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
