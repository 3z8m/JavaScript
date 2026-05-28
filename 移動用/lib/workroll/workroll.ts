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
// ロール種類ごとの個数を取得
// ==============================================================
export async function getWorkrollCount() {
    try {
        const workrollRaw = await prisma.workroll.groupBy({
            by: ['roll_type', 'grinding_type', 'status'],
            _count: { status: true },
        });

        const workrollList = workrollRaw.map((item: WorkrollCountGroup) => ({
            roll_type: item.roll_type,
            grinding_type: item.grinding_type,
            status: item.status,
            count: item._count.status
        }));

        return { workrollList }

    } catch (error) {
        console.error("Error fetching workroll counts:", error);
        return null
    }
}
