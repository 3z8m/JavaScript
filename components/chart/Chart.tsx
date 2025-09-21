"use client"

import { useEffect, useState } from 'react';

import { 
	Bar, BarChart, 
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


//---------------------------------------------------------------------
// チャート設定
//---------------------------------------------------------------------
const chartConfigLine = {
	ライン1: { label: "1ミル", color: "#2563eb" },
	ライン2: { label: "2ミル", color: "#60a5fa" },
	ライン3: { label: "3ミル", color: "#82ca9d" },
	ライン5: { label: "2BAL", color: "#f87171" },
	ライン6: { label: "3BAL", color: "#fbbf24" },
	ライン7: { label: "7ミル", color: "#a78bfa" },
	ライン8: { label: "8ミル", color: "#f472b6" },
} satisfies ChartConfig

const chartConfigSteel = {
	区分0: { label: "進行", color: "#2563eb" },
	区分1: { label: "保留", color: "#60a5fa" },
} satisfies ChartConfig

//---------------------------------------------------------------------
// 型定義
//---------------------------------------------------------------------
type GroupProcessItem = {
	作業日: string;
	[key: string]: string | number; 	// 動的なキーを許容
};

type LineWeightItem = {
	作業日: string;
	ラインコード: string;
	合計作業後重量: number;
};

type LineUptimeItem = {
	作業日: string;
	ラインコード: string;
	合計稼働時間: number;
};

type GroupSteelItem = {
	[key: string]: string | number;
};

type SteelWeightItem = {
	鋼種コード: string;
	保留区分: string;
	合計重量: number;
};

//---------------------------------------------------------------------
// 鋼種コードの変換マップ
//---------------------------------------------------------------------
const steelCodeMap: Record<string, string> = {
	"251": "S430",
    "309": "Y205",
	"322": "S444",
	"401": "CuTi",
	"461": "130S",
	"500": "S301",
    "600": "S304",
    // 必要に応じて他のコードも追加
};


export function Chart() {

	//--------------------------------------------------------------------
	// ライン別作業後重量
	//--------------------------------------------------------------------
	const [lineData, setLineData] = useState<GroupProcessItem[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/chart');		// APIからデータ取得
				const json = await res.json(); 				// オブジェクト形式

				const rawData: LineWeightItem[] = json.lineTime.map((date: string, index: number) => ({
					作業日: date,
					ラインコード: json.lineCode[index],
					//合計作業後重量: json.lineWeight[index],
					合計作業後重量: Math.round((json.lineWeight[index] / 1000) * 10) / 10	// "kg"から"小数点1桁のton"に変換
				}));

				// データ整形：日付ごとにラインコードをキーに変換
				const grouped: Record<string, GroupProcessItem> = {};
				rawData.forEach((item: LineWeightItem) => {
					const date = item.作業日;
					const codeKey = `ライン${item.ラインコード}`;
					if (!grouped[date]) grouped[date] = { 作業日: date };
					grouped[date][codeKey] = item.合計作業後重量;
				});

				const formattedData = Object.values(grouped);
				setLineData(formattedData); // Recharts用データにセット
			} catch (err) {
				console.error('データ取得失敗:', err);
			}
		})();
	}, []);


	//--------------------------------------------------------------------
	// ライン別稼働時間
	//--------------------------------------------------------------------
	const [lineUptimeData, setLineUptimeData] = useState<GroupProcessItem[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/chart');		// APIからデータ取得
				const json = await res.json(); 				// オブジェクト形式

				const rawData: LineUptimeItem[] = json.lineTime.map((date: string, index: number) => ({
					作業日: date,
					ラインコード: json.lineCode[index],
					合計稼働時間: Math.round((json.lineUptime[index] / 60) * 10) / 10	// "分"から"小数点1桁の時間"に変換
				}));

				// データ整形：日付ごとにラインコードをキーに変換
				const grouped: Record<string, GroupProcessItem> = {};
				rawData.forEach((item: LineUptimeItem) => {
					const date = item.作業日;
					const codeKey = `ライン${item.ラインコード}`;
					if (!grouped[date]) grouped[date] = { 作業日: date };
					grouped[date][codeKey] = item.合計稼働時間;
				});

				const formattedData = Object.values(grouped);
				setLineUptimeData(formattedData); // Recharts用データにセット
			} catch (err) {
				console.error('データ取得失敗:', err);
			}
		})();
	}, []);


	//--------------------------------------------------------------------
	// 鋼種別後重量
	//--------------------------------------------------------------------
	const [steelData, setSteelData] = useState<GroupSteelItem[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/chart');		// APIからデータ取得
				const json = await res.json(); 				// オブジェクト形式

				// JSONデータを整形してRecharts用のデータ形式に変換
				const rawData: SteelWeightItem[] = json.steelWeight_steelcode.map((steelcode: string, index: number) => ({
					鋼種コード: steelCodeMap[steelcode],				// 変換マップを適用
					//鋼種コード: steelCodeMap[steelcode] ?? steelcode	// 変換マップに存在しない場合は元のコードを使用
					保留区分: json.steelWeight_hold[index],
					合計重量: json.steelWeight_weight[index],
				}))
				.filter((item: SteelWeightItem) => item.鋼種コード !== undefined); // steelCodeMapに存在するコードだけ残す

				// データ整形：日付ごとにラインコードをキーに変換
				const grouped: Record<string, GroupSteelItem> = {};
				rawData.forEach((item: SteelWeightItem) => {
					const steelcode = item.鋼種コード;
					const codeKey = `区分${item.保留区分}`;
					if (!grouped[steelcode]) grouped[steelcode] = { 鋼種コード: steelcode };
					grouped[steelcode][codeKey] = item.合計重量;
				});

				const formattedData = Object.values(grouped);
				setSteelData(formattedData); // Recharts用データにセット
			} catch (err) {
				console.error('データ取得失敗:', err);
			}
		})();
	}, []);

	
	return (
		<div className="flex flex-row gap-3">

			<Card>
				<CardHeader>
					<CardTitle>ライン別作業後重量</CardTitle>
					<CardDescription>一週間の作業後重量</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfigLine} className="min-h-[200px] w-full">
						<LineChart data={lineData} >
							<XAxis dataKey="作業日" />
							<YAxis
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => `${value}t`}
							/>
							<Line dataKey="ライン1" stroke={chartConfigLine.ライン1.color} strokeWidth={3} />
							<Line dataKey="ライン2" stroke={chartConfigLine.ライン2.color} strokeWidth={3} />
							<Line dataKey="ライン3" stroke={chartConfigLine.ライン3.color} strokeWidth={3} />
							<Line dataKey="ライン5" stroke={chartConfigLine.ライン5.color} strokeWidth={3} />
							<Line dataKey="ライン6" stroke={chartConfigLine.ライン6.color} strokeWidth={3} />
														
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
						</LineChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					ライン作業実績_V	
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>ライン別稼働時間</CardTitle>
					<CardDescription>一週間の稼働時間（通板時間）</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfigLine} className="min-h-[200px] w-full">
						<LineChart data={lineUptimeData} >
							<XAxis dataKey="作業日" />
							<YAxis
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => `${value}h`}
								domain={[0, 'auto']}
								ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]} // 2時間刻み
							/>
							<Line dataKey="ライン1" stroke={chartConfigLine.ライン1.color} strokeWidth={3} />
							<Line dataKey="ライン2" stroke={chartConfigLine.ライン2.color} strokeWidth={3} />
							<Line dataKey="ライン3" stroke={chartConfigLine.ライン3.color} strokeWidth={3} />
							<Line dataKey="ライン5" stroke={chartConfigLine.ライン5.color} strokeWidth={3} />
							<Line dataKey="ライン6" stroke={chartConfigLine.ライン6.color} strokeWidth={3} />
														
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
						</LineChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					ライン作業実績_V	
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>鋼種別重量</CardTitle>
					<CardDescription>現在の鋼種別重量</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfigSteel} className="min-h-[200px] w-full">
						<BarChart accessibilityLayer data={steelData} >
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="鋼種コード" 
								tickLine={false}
								tickMargin={10}
								axisLine={false}
							/>
							<YAxis
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => (value >= 1000 ? `${value / 1000}t` : value)}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />

							<Bar dataKey="区分0" stackId="a" fill={chartConfigSteel.区分0.color} />
							<Bar dataKey="区分1" stackId="a" fill={chartConfigSteel.区分1.color} radius={[4, 4, 0, 0]} />
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					コイル_V
				</CardFooter>
			</Card>

		</div>
	)
}
