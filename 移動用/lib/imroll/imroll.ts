import { prisma } from "@/lib/prisma";
import { Imroll } from "@/types/imroll";


// ==============================================================
// 一覧を取得
// ==============================================================
export async function getImroll() : Promise<Imroll[]>{
    return await prisma.imroll.findMany({
        orderBy: { imr_id: 'asc'}
    })
}


// ==============================================================
// 特定のロールデータを取得
// ==============================================================
export async function getEachImroll(id: string) {
    try {
        return await prisma.imroll.findFirstOrThrow({
            where: { id },
        })
    } catch (error) {
        console.error("Error fetching imroll:", error);
        return null;  // エラーが発生した場合はnullを返す
    }
}