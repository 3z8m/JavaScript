import { prisma } from "@/lib/prisma";
import { Destination_i } from "@/types/destination";


// ==============================================================
// 行先ボードの一覧を取得
// ==============================================================
export async function getDestination() : Promise<Destination_i[]>{
    return await prisma.destination_i.findMany({
        orderBy: { order: 'asc'}
    })
}


// ==============================================================
// 特定の行先ボードを取得
// ==============================================================
export async function getEachDestination(id: string) {
    try {
        return await prisma.destination_i.findFirstOrThrow({
            where: { id },
        })
    } catch (error) {
        console.error("Error fetching destination:", error);
        return null;  // エラーが発生した場合はnullを返す
    }
}