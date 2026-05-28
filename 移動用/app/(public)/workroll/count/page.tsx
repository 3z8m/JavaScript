//===============================================================
// ワークロール数集計ページ
//===============================================================

import { getWorkrollCount } from "@/lib/workroll/workroll";

// 静的化を防ぐ
export const dynamic = "force-dynamic";


const statusColor: Record<string, string> = {
    "加工済": "bg-blue-300 text-2xl",
    "使用中": "bg-red-300 text-2xl",
    "使用済": "bg-gray-300 text-2xl",
    "廃棄": "bg-gray-400 text-2xl",
};


// ページ作成
export default async function WorkrollCountPage() {
    const data = await getWorkrollCount();

    // nullチェック
    if (!data || !data.workrollList) {
        return (
            <main style={{ padding: "2rem" }}>
                <h1>データ取得に失敗しました</h1>
            </main>
        );
    }

    // null を補正
    const validWorkrollList = data.workrollList.map((item) => ({
        roll_type: item.roll_type ?? "未設定",
        grinding_type: item.grinding_type ?? "未設定",
        status: item.status ?? "未設定",
        count: item.count ?? 0,
    }));

    // -----------------------------
    // 軸の一覧を作成
    // -----------------------------

    // roll_type（縦軸）
    const rollTypes = Array.from(
        new Set(validWorkrollList.map((item) => item.roll_type))
    );

    // grinding_type（縦軸）
    const grindingTypes = Array.from(
        new Set(validWorkrollList.map((item) => item.grinding_type))
    );

    // status（横軸）
    const statusList = Array.from(
        new Set(validWorkrollList.map((item) => item.status))
    );

    // -----------------------------
    // クロス集計 summary[roll_type][grinding_type][status]
    // -----------------------------
    const summary: Record<
        string,
        Record<string, Record<string, number>>
    > = {};


    for (const row of validWorkrollList) {
        const rt = row.roll_type;
        const gt = row.grinding_type;
        const st = row.status;

        if (!summary[rt]) summary[rt] = {};
        if (!summary[rt][gt]) summary[rt][gt] = {};
        if (!summary[rt][gt][st]) summary[rt][gt][st] = 0;

        summary[rt][gt][st] += row.count;
    }


    // -----------------------------
    // 表の描画
    // -----------------------------
    const renderPivotTable = () => (
        <div style={{ marginBottom: "2rem" }}>
            <h1 className="text-2xl font-bold mb-4">ワークロール数</h1>

            <table
                className="text-center"
                style={{ borderCollapse: "collapse", width: "100%" }}
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>ロール種</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>研削種</th>
                        {statusList.map((st, i) => (
                            <th
                                key={i}
                                style={{ border: "1px solid black", padding: "8px" }}
                                className={`border border-black p-2 ${statusColor[st] ?? "bg-gray-500 text-white"}`}
                            >
                                {st}
                            </th>
                        ))}                        
                    </tr>
                </thead>

                <tbody>
                    {rollTypes.map((rt) => {
                        const grindingList = Object.keys(summary[rt]);
                        const rowSpan = grindingList.length;

                        return grindingList.map((gt, idx) => (
                            <tr key={`${rt}-${gt}`}>
                                {/* roll_type は最初の行だけ表示して rowSpan で結合 */}
                                {idx === 0 && (
                                    <td
                                        rowSpan={rowSpan}
                                        style={{ border: "1px solid black", padding: "8px" }}
                                    >
                                        {rt}
                                    </td>
                                )}

                                {/* grinding_type */}
                                <td style={{ border: "1px solid black", padding: "8px" }}>
                                    {gt}
                                </td>

                                {/* status 列 */}
                                {statusList.map((st, k) => (
                                    <td
                                        key={k}
                                        className={`border border-black p-2 ${statusColor[st] ?? "bg-gray-500 text-white"}`}
                                    >
                                        {summary[rt]?.[gt]?.[st] || ""}
                                    </td>
                                ))}
                            </tr>
                        ));
                    })}
                </tbody>
            </table>
        </div>
    );


    return <main style={{ padding: "2rem" }}>{renderPivotTable()}</main>;
}
