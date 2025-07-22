import { prisma } from "@/lib/prisma";

// 行先ボードの一覧を取得
export async function getDestination() {
    return await prisma.destination_h.findMany({
        orderBy: { order: 'asc'}
    })
}

// 特定の行先ボードを取得
export async function getEachDestination(id: string) {
    try {
        return await prisma.destination_h.findFirstOrThrow({
            where: { id },
            select: {
                id: true,
                name: true,
                destination: true,
                presence: true,
                lunch: true,
            }
        })
    } catch (error) {
        console.error("Error fetching destination:", error);
        return null;  // エラーが発生した場合はnullを返す
    }
}