"use client"

import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import {
  ChartContainer, ChartTooltipContent
} from "@/components/ui/chart";

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";

// 型
type GanttItem = {
  品番: string;
  start: string; // ISO8601
  end: string;   // ISO8601
  duration: number;
};

const chartConfigGantt = {
  作業: { label: "作業区間", color: "#2563eb" },
} as const;

export function GanttChart() {
  const [data, setData] = useState<GanttItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/gantt-data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('データ取得失敗:', err);
      }
    })();
  }, []);

  // recharts用に「バーの開始位置」と「長さ」を計算
  const chartData = data.map(item => ({
    ...item,
    barStart: dayjs(item.start).valueOf(),
    barLength: dayjs(item.end).diff(dayjs(item.start), 'millisecond'),
    startLabel: dayjs(item.start).format('MM/DD HH:mm'),
    endLabel: dayjs(item.end).format('MM/DD HH:mm'),
  }));

  // X軸の範囲
  const minX = Math.min(...chartData.map(d => d.barStart));
  const maxX = Math.max(...chartData.map(d => d.barStart + d.barLength));

  return (
    <div className="flex flex-row gap-3">
      <Card>
        <CardHeader>
          <CardTitle>作業ガントチャート</CardTitle>
          <CardDescription>1本のタイムラインにA～Eを並べて表示</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigGantt} className="min-h-[100px] w-full">
            <ResponsiveContainer width="100%" height={100}>
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis
                  type="number"
                  domain={[minX, maxX]}
                  tickFormatter={v => dayjs(v).format('MM/DD HH:mm')}
                  scale="time"
                />
                <YAxis
                  type="category"
                  dataKey={() => ""} // 1本の棒だけ
                  hide
                />
                <Tooltip
                  content={<ChartTooltipContent />}
                  formatter={(_, __, props) => {
                    const { payload } = props;
                    return [
                      `${payload.startLabel} ～ ${payload.endLabel}`,
                      payload.品番
                    ];
                  }}
                />
                <Bar
                dataKey="barLength"
                barSize={30}
                background
                shape={(props: any) => {
                    const { y, height, payload } = props;
                    return (
                    <g>
                        <rect
                        x={payload.barStart}
                        y={y}
                        width={payload.barLength}
                        height={height}
                        fill="#2563eb"
                        rx={4}
                        />
                        <text
                        x={payload.barStart + payload.barLength / 2}
                        y={y + height / 2}
                        fill="#fff"
                        fontWeight="bold"
                        fontSize={16}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        >
                        {payload.品番}
                        </text>
                    </g>
                    );
                }}
                />


              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          1本のタイムライン上にA～Eを並べて表示
        </CardFooter>
      </Card>
    </div>
  );
}
