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


const chartConfigSteel = {
    区分0: { label: "進行", color: "#2563eb" },
    区分1: { label: "保留", color: "#60a5fa" },
} satisfies ChartConfig

//---------------------------------------------------------------------
// 型定義
//---------------------------------------------------------------------

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
