import { NextResponse } from "next/server";
import { getWorkroll } from "@/lib/workroll/workroll";
import { Workroll } from "@/types/workroll";


function escapeCSV(value: any): string {
    if (value == null) return "";
    const str = String(value);
    if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const yearMonth = searchParams.get("yearMonth");

    const workroll = await getWorkroll();

    // 年月指定がある場合はフィルタ
    const filtered = yearMonth
        ? workroll.filter(w =>
            w.operation_date &&
            w.operation_date.startsWith(yearMonth)
        )
        : workroll;

    const headers: (keyof Workroll)[] = [
        "roll_id","roll_type","grinding_type","grinding_amount",
        "diameter_rg","diameter_ml","width",
        "ra_i","ra_h","operation_date","grinding_number",
        "processing_time",
        "non_processing_code1","non_processing_time1",
        "non_processing_code2","non_processing_time2",
        "non_processing_code3","non_processing_time3",
        "non_processing_code4","non_processing_time4",
        "non_processing_code5","non_processing_time5",
        "operator","operation_group","judgement",
        "comment","status"
    ];

    // CSV 本体
    const rows = filtered.map((w) =>
        headers.map((h) => escapeCSV(w[h])).join(",")
    );

    // -----------------------------
    //  roll_type × grinding_type ごとの grinding_amount 合計
    // -----------------------------
    const summaryMap: Record<string, number> = {};

    for (const w of filtered) {
        const key = `${w.roll_type || "未設定"}__${w.grinding_type || "未設定"}`;
        const amount = Number(w.grinding_amount) || 0;
        summaryMap[key] = (summaryMap[key] || 0) + amount;
    }

    // summary を CSV 行に変換
    const summaryRows = [
        "roll_type,grinding_type,total_grinding_amount",
        ...Object.entries(summaryMap).map(([key, total]) => {
            const [roll_type, grinding_type] = key.split("__");
            return `${escapeCSV(roll_type)},${escapeCSV(grinding_type)},${escapeCSV(total)}`;
        })
    ];

    // -----------------------------
    // CSV 全体を結合（2 行空ける）
    // -----------------------------
    const csv =
        "\uFEFF" +
        [
            headers.join(","), // ヘッダ
            ...rows,           // 本体
            "",                // 空行
            "集計結果",         // 集計表のタイトル
            ...summaryRows     // 集計表
        ].join("\n");

    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename=workroll_${yearMonth}.csv`
        },
    });
}

