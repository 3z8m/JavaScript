"use client";

import { useEffect, useState } from 'react';

type GraphData = {
    title: string;
    processWeight_time: string[];
    processWeight_opecode: string[];
    processWeight_weight: number[];
};

export function GraphPage() {
    const [data, setData] = useState<GraphData | null>(null);

    useEffect(() => {
        fetch('/api/chart')
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error('データ取得失敗:', err));
    }, []);

    if (!data) return <div>読み込み中...</div>;

    return (
        <div>
            <h1>{data.title}</h1>
            <table className="table table-sm w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-1 py-1">日付</th>
                        <th className="px-1 py-1">作業コード</th>
                        <th className="px-1 py-1">作業後重量</th>
                    </tr>
                </thead>
                <tbody>
                    {data.processWeight_time.map((time, idx) => (
                    <tr key={idx}>
                        <td className="px-1 py-1 text-center">{time}</td>
                        <td className="px-1 py-1 text-center">{data.processWeight_opecode[idx]}</td>
                        <td className="px-1 py-1 text-right">{data.processWeight_weight[idx]}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}