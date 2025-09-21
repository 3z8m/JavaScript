//import { Component } from "@/components/chart/ChartExample";
import { Chart } from "@/components/chart/Chart";
import { GanttChart } from "@/components/chart/GanttChart";
//import { ChartBal } from "@/components/chart/ChartBal";
//import { GraphPage } from "@/components/chart/SgkData";


export default function Page() {
    return (
        <div className="p-4">
            {/* <Component /> */}
            <Chart />
            <GanttChart />
            {/* <ChartBal /> */}
            {/* <GraphPage /> */}
        </div>
    );
}