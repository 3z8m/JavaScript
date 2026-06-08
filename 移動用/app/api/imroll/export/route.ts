import { NextResponse } from "next/server";
import { getImroll } from "@/lib/imroll/imroll";
import { Imroll } from "@/types/imroll";


function escapeCSV(value: any): string {
    if (value == null) return "";
    const str = String(value);
    if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

export async function GET() {
    const imroll = await getImroll();

    // CSV ヘッダ
    const headers: (keyof Imroll)[] = [
        "imr_id","taper_code","imr_set_code",
        "cylindricity1","cylindricity2","cylindricity3","cylindricity4","cylindricity5",
        "pair_diff","imr_diameter_before","imr_diameter_after",
        "grinding_type","grinding_amount",
        "imr_ra","operation_date",
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
    const rows = imroll.map((w) =>
        headers.map((h) => escapeCSV(w[h])).join(",")
    );

    // Excel 文字化け防止：BOM を付ける
    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=imroll.csv",
        },
    });
}
