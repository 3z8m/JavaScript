"use client";

import { useState, useEffect, useRef } from "react";
import { WorkrollAdmin } from "@/components/workroll/WorkrollAdmin";
import { WorkrollDelete } from "@/components/workroll/WorkrollDelete";
import { Workroll } from "@/types/workroll";
import { Keypad } from "@/components/Keypad";


export function WorkrollList({ workroll }: { workroll: Workroll[] }) {

    const [filters, setFilters] = useState({
        rollType: "",
        grindingType: "",
        rollID: "",
    });

    const [grindingTypes, setGrindingTypes] = useState<string[]>([]);
    const [yearMonth, setYearMonth] = useState(() => {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    });

    const [showKeypad, setShowKeypad] = useState(false);
    const [activeField] = useState<"rollID">("rollID");

    const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

    // ▼ grinding_type.json 読み込み
    useEffect(() => {
        fetch("/data/grinding_type.json")
            .then(res => res.json())
            .then(data => setGrindingTypes(data.grinding_types));
    }, []);

    // ▼ grindingType 選択時にスクロール
    useEffect(() => {
        if (!filters.grindingType) return;

        const target = workroll.find(w => w.grinding_type === filters.grindingType);
        if (!target) return;

        const row = rowRefs.current.get(target.roll_id);
        row?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [filters.grindingType, workroll]);

    // ▼ フィルタ済みデータ
    const filtered = workroll.filter(w =>
        (!filters.rollType || w.roll_type === filters.rollType) &&
        (!filters.grindingType || w.grinding_type === filters.grindingType) &&
        (!filters.rollID || w.roll_id === filters.rollID)
    );

    // ▼ テンキー入力
    const handleKeyPress = (key: string) => {
        setFilters(prev => {
            const cur = prev[activeField];
            if (key === "DEL") return { ...prev, [activeField]: cur.slice(0, -1) };
            return { ...prev, [activeField]: cur + key };
        });
    };

    return (
        <div className="w-full">

            {/* ▼ フィルタ UI ▼ */}
            <div className="flex gap-4 mb-4">

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showKeypad}
                        onChange={(e) => setShowKeypad(e.target.checked)}
                        className="w-6 h-6 accent-blue-600"
                    />
                    ロールID入力
                </label>

                <input
                    type="text"
                    placeholder="ロールID"
                    value={filters.rollID}
                    readOnly={showKeypad}
                    onChange={(e) =>
                        !showKeypad &&
                        setFilters({ ...filters, rollID: e.target.value })
                    }
                    className="border px-3 py-2 rounded"
                />

                <select
                    value={filters.rollType}
                    onChange={(e) => setFilters({ ...filters, rollType: e.target.value })}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">ロール種（すべて）</option>
                    <option value="φ30">φ30</option>
                    <option value="φ40">φ40</option>
                    <option value="φ50">φ50</option>
                </select>

                <select
                    value={filters.grindingType}
                    onChange={(e) => setFilters({ ...filters, grindingType: e.target.value })}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">研削種（すべて）</option>
                    {grindingTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>

                <input
                    type="month"
                    value={yearMonth}
                    onChange={(e) => setYearMonth(e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                <a
                    href={`/api/workroll/export_period?yearMonth=${yearMonth}`}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    指定年月CSV出力
                </a>

                <a
                    href="/api/workroll/export_all"
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                    全データCSV出力
                </a>
            </div>

            {/* ▼ テンキー ▼ */}
            {showKeypad && (
                <Keypad onPress={handleKeyPress} />
            )}


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
