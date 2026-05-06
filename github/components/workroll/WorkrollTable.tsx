//============================================================
// 一定時間ごとにデータを取得＋レンダリング
//============================================================

'use client'

import { useState, useEffect } from "react";
import { Workroll } from "@/types/workroll";
import { WorkrollButton } from "./WorkrollButton";


export function WorkrollTable() {

	const [workroll, setWorkroll] = useState<Workroll[]>([]);

	// データを取得、更新
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/workroll");
			const data = await res.json();
			setWorkroll(data);
		};

		fetchData(); 									// 初期読み込み
		const interval = setInterval(fetchData, 5000)	// 5秒ごとに再取得
		return () => clearInterval(interval)			// コンポーネントが外れたら停止
	}, []);

	const renderTable = (content: Workroll[]) => (
		<table className="table table-sm w-full">
			<thead>
				<tr>
					<th className="px-4">編集</th>
				</tr>
			</thead>
			<tbody>
				{content.map((obj) => (
				<tr key={obj.id} style={{ borderBottom: "8px solid transparent" }}>
					<td className="px-1 py-1">
						<WorkrollButton id={obj.id} roll_id={obj.roll_id} grinding_type={obj.grinding_type} />
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
				{renderTable(workroll.filter(obj => obj.row === row))}
			</div>
			)}
		</div>
	);
}
