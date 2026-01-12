"use client"

import { useEffect, useState } from 'react';

import { 
	Line, LineChart, 
	CartesianGrid, XAxis, YAxis,
} from "recharts"

import { 
	ChartConfig, ChartContainer, 
	ChartTooltip, ChartTooltipContent, 
	ChartLegend, ChartLegendContent 
} from "@/components/ui/chart"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"


const chartConfig = {
	temp: {	label: "Temperature", color: "#2563eb"},
} satisfies ChartConfig


export function ChartBal() {

	//--------------------------------------------------------------------
	// 2ミル気温データ
	//--------------------------------------------------------------------
	const [chartData, setChartData] = useState<{ time: string; temp: number }[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/chart');					// api/chartにHTTP GETリクエストを送信して、グラフデータを取得
				const { temp2_time, temp2_temp } = await res.json();	// レスポンスをJSON形式に変換

				// Rechartで扱うため、timeとtempのペアを作成
				setChartData(
					temp2_time.map((time: string, i: number) => ({
						time,
						temp: temp2_temp[i],
					}))
				);
			} catch (err) {
				console.error('データ取得失敗:', err);
			}
		})();
	}, []);		// 空配列 [] によりコンポーネントの初回マウント時のみ実行


	return (
		<div className="flex flex-row gap-3">
			
			{/* Line Chart */}
			<Card>
				<CardHeader>
					<CardTitle>気温 2ミル</CardTitle>
					<CardDescription>一週間の気温</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<LineChart data={chartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="time"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(4, 8)} // 日付の整形
							/>
							<YAxis
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Line
								type="monotone"
								dataKey="temp"
								stroke="var(--color-temp)"
								strokeWidth={3}
								dot={{ r: 4, strokeWidth: 2, fill: "var(--color-background)" }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					データ元: HAKU.ライン作業実績_V
				</CardFooter>
			</Card>

		</div>
	)
}
