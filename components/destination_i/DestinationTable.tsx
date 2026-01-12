//============================================================
// 一定時間ごとにデータを取得＋レンダリング
//============================================================

'use client'

import { useState, useEffect } from "react";
import { Destination_i } from "@/types/destination";
import { DestinationButton } from "./DestinationButton";


export function DestinationTable() {
	const [destination, setDestination] = useState<Destination_i[]>([]);

	// データを取得、更新
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/destination_i");
			const data = await res.json();
			setDestination(data);
		};

		fetchData(); 									// 初期読み込み
		const interval = setInterval(fetchData, 5000)	// 5秒ごとに再取得
		return () => clearInterval(interval)			// コンポーネントが外れたら停止
	}, []);

	const renderTable = (content: Destination_i[]) => (
		<table className="table table-sm w-full">
			<thead>
				<tr>
				<th className="px-4"></th>
				<th className="px-4">行先</th>
				</tr>
			</thead>
			<tbody>
				{content.map((obj) => (
				<tr key={obj.id} style={{ borderBottom: "8px solid transparent" }}>
					<td className="px-1 py-1">
						<DestinationButton id={obj.id} presence={obj.presence ?? ""} name={obj.name} />
					</td>
					<td className="text-center px-1">
						<span style={{ fontSize: "1.1rem" }}>{obj.destination ?? ""}</span>
					</td>
				</tr>
				))}
			</tbody>
		</table>
	);

	return (
		<div className="flex flex-row gap-1 w-full">
		{["1", "2", "3", "4", "5"].map((row, index) =>
		<div 
			key={row} 
			className="flex-1"
			style={{
				borderRight: index < 4 ? "1px solid #DDD" : "none", // 最後の列以外に薄い線
      			paddingRight: "4px"
			}}
		>
			{renderTable(destination.filter(obj => obj.row === row))}
		</div>
		)}
		</div>
	);
}
