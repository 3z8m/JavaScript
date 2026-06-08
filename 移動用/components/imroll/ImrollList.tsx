"use client";

import { useState, useEffect, useRef } from "react";
import { ImrollAdmin } from "@/components/imroll/ImrollAdmin";
import { ImrollDelete } from "@/components/imroll/ImrollDelete";
import { Imroll } from "@/types/imroll";

export function ImrollList({ imroll }: { imroll: Imroll[] }) {

    const [imrTaperCodeFilter, setImrTaperCodeFilter] = useState("");
    const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

    const filtered = imroll.filter((item: Imroll) => {
        return (
            (imrTaperCodeFilter === "" || item.taper_code === imrTaperCodeFilter)
        );
    });

    // 砥石種リストの状態管理
    const [imrTaperCodes, setImrTaperCodes] = useState<string[]>([]);

    useEffect(() => {
        const loadImrTaperCodes = async () => {
            const res = await fetch("/data/imr_taper_code.json");
            const data = await res.json();
            setImrTaperCodes(data.imr_taper_codes);
        };
        loadImrTaperCodes();
    }, []);

    // 研削種選択時にスクロール移動
    const handleImrTaperCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setImrTaperCodeFilter(value);

        if (value) {
            setTimeout(() => {
                const firstMatchingRow = imroll.find(item => item.taper_code === value);
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
                    href="/api/imroll/export"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    CSV出力
                </a>

                {/* テーパーコード フィルタ */}
                <select
                    value={imrTaperCodeFilter}
                    onChange={handleImrTaperCodeChange}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">テーパーコード（すべて）</option>
                    {imrTaperCodes.map((type) => (
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
                        <th className="px-4 sticky top-10 bg-white z-10">テーパーコード</th>
                        <th className="px-4 sticky top-10 bg-white z-10">IMRセットコード</th>
                        <th className="px-4 sticky top-10 bg-white z-10">IMR番号</th>
                        <th className="px-4 sticky top-10 bg-white z-10">円筒度1</th>
                        <th className="px-4 sticky top-10 bg-white z-10">円筒度2</th>
                        <th className="px-4 sticky top-10 bg-white z-10">円筒度3</th>
                        <th className="px-4 sticky top-10 bg-white z-10">円筒度4</th>
                        <th className="px-4 sticky top-10 bg-white z-10">円筒度5</th>
                        <th className="px-4 sticky top-10 bg-white z-10">差分</th>
                        <th className="px-4 sticky top-10 bg-white z-10">直径(研削前)</th>
                        <th className="px-4 sticky top-10 bg-white z-10">直径(研削後)</th>
                        <th className="px-4 sticky top-10 bg-white z-10">研削量</th>
                        <th className="px-4 sticky top-10 bg-white z-10">研削種</th>
                        <th className="px-4 sticky top-10 bg-white z-10">Ra</th>
                        <th className="px-4 sticky top-10 bg-white z-10">作業日付</th>
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
                    {filtered.map((dist: Imroll) => (
                        <tr 
                            key={dist.id}
                            ref={(el) => {
                                if (el) {
                                    rowRefs.current.set(dist.id, el);
                                }
                            }}
                        >
                            <td className="border p-2 text-center">{dist.taper_code}</td>
                            <td className="border p-2 text-center">{dist.imr_set_code}</td>
                            <td className="border p-2 text-center">{dist.imr_id}</td>
                            <td className="border p-2 text-center">{dist.cylindricity1}</td>
                            <td className="border p-2 text-center">{dist.cylindricity2}</td>
                            <td className="border p-2 text-center">{dist.cylindricity3}</td>
                            <td className="border p-2 text-center">{dist.cylindricity4}</td>
                            <td className="border p-2 text-center">{dist.cylindricity5}</td>
                            <td className="border p-2 text-center">{dist.pair_diff}</td>
                            <td className="border p-2 text-center">{dist.imr_diameter_before}</td>
                            <td className="border p-2 text-center">{dist.imr_diameter_after}</td>
                            <td className="border p-2 text-center">{dist.grinding_amount}</td>
                            <td className="border p-2 text-center">{dist.grinding_type}</td>
                            <td className="border p-2 text-center">{dist.imr_ra}</td>
                            <td className="border p-2 text-center">{dist.operation_date}</td>
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
                                <ImrollAdmin id={dist.id} />
                            </td>
                            <td className="border p-2 text-center">
                                <ImrollDelete id={dist.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
