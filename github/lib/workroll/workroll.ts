import { prisma } from "@/lib/prisma";
import { Workroll} from "@/types/workroll";


// ==============================================================
// 行先ボードの一覧を取得
// ==============================================================
export async function getWorkroll() : Promise<Workroll[]>{
    return await prisma.workroll.findMany({
        orderBy: { roll_id: 'asc'}
    })
}


// ==============================================================
// 特定の行先ボードを取得
// ==============================================================
export async function getEachWorkroll(id: string) {
    try {
        return await prisma.workroll.findFirstOrThrow({
            where: { id },
        })
    } catch (error) {
        console.error("Error fetching destination:", error);
        return null;  // エラーが発生した場合はnullを返す
    }
}



