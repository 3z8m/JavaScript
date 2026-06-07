import { prisma } from "@/lib/prisma";
import { Workroll, WorkrollCountGroup} from "@/types/workroll";


// ==============================================================
// 一覧を取得
// ==============================================================
export async function getWorkroll() : Promise<Workroll[]>{
    return await prisma.workroll.findMany({
        orderBy: { roll_id: 'asc'}
    })
}


// ==============================================================
// 特定のロールデータを取得
// ==============================================================
export async function getEachWorkroll(id: string) {
    try {
        return await prisma.workroll.findFirstOrThrow({
            where: { id },
        })
    } catch (error) {
        console.error("Error fetching workroll:", error);
        return null;  // エラーが発生した場合はnullを返す
    }
}


// ==============================================================
// ロール種類ごとの個数（roll_id ごとに最後の状態だけをカウント）
// ==============================================================
export async function getWorkrollCountLatest() {
    // 全行を取得（最後判定に使うカラムでソート）
    const rows = await prisma.workroll.findMany({
        select: {
            roll_id: true,
            roll_type: true,
            grinding_type: true,
            status: true,
        },
    });

    // roll_id ごとに「最後の1件」だけ残す（後勝ち）
    const latestByRollId = Object.values(
        rows.reduce((acc, row) => {
            acc[row.roll_id] = row;
            return acc;
        }, {} as Record<string, (typeof rows)[number]>)
    );

    // 「最後の1件」だけを使って集計
    const grouped = latestByRollId.reduce((acc, row) => {
        const key = `${row.roll_type}__${row.grinding_type}__${row.status}`;
        if (!acc[key]) {
            acc[key] = {
                roll_type: row.roll_type,
                grinding_type: row.grinding_type,
                status: row.status,
                count: 0,
            };
        }
        acc[key].count += 1;
        return acc;
    }, {} as Record<string, { roll_type: string | null; grinding_type: string | null; status: string | null; count: number }>);

    const workrollList = Object.values(grouped);

    return { workrollList };
}
