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

export async function GET() {
    const workroll = await getWorkroll();

    // CSV ヘッダ
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
    const rows = workroll.map((w) =>
        headers.map((h) => escapeCSV(w[h])).join(",")
    );

    // Excel 文字化け防止：BOM を付ける
    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=workroll.csv",
        },
    });
}
