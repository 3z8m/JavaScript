"use client"

import { 
	Bar, BarChart, 
	Line, LineChart, 
	CartesianGrid, XAxis, YAxis 
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


const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig


export function Component() {
	return (
		<div className="flex flex-row gap-3">
			{/* Bar Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Bar Chart - Multiple</CardTitle>
					<CardDescription>January - June 2024</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<BarChart accessibilityLayer data={chartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<YAxis
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
							<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					Data source: Example data
				</CardFooter>
			</Card>

			{/* Bar Chart */}	
			<Card>
				<CardHeader>
					<CardTitle>Stacked Bar Chart - Multiple</CardTitle>
					<CardDescription>January - June 2024</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<BarChart accessibilityLayer data={chartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<YAxis
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
							<Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					Data source: Example data
				</CardFooter>
			</Card>

			{/* Line Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Line Chart - Multiple</CardTitle>
					<CardDescription>January - June 2024</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<LineChart accessibilityLayer data={chartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
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
								dataKey="desktop"
								stroke="var(--color-desktop)"
								strokeWidth={3}
								dot={{ r: 4, strokeWidth: 2, fill: "var(--color-background)" }}
								activeDot={{ r: 6 }}
							/>
							<Line
								type="monotone"
								dataKey="mobile"
								stroke="var(--color-mobile)"
								strokeWidth={3}
								dot={{ r: 4, strokeWidth: 2, fill: "var(--color-background)" }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground">
					Data source: Example data
				</CardFooter>
			</Card>
		</div>
	)
}
