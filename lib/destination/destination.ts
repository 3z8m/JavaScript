import { prisma } from "@/lib/prisma";
import { Destination_h} from "@/types/destination";
import { LunchGroup } from "@/types/destination"; 


// ==============================================================
// 行先ボードの一覧を取得
// ==============================================================
export async function getDestination() : Promise<Destination_h[]>{
    return await prisma.destination_h.findMany({
        orderBy: { order: 'asc'}
    })
}


// ==============================================================
// 特定の行先ボードを取得
// ==============================================================
export async function getEachDestination(id: string) {
    try {
        return await prisma.destination_h.findFirstOrThrow({
            where: { id },
        })
    } catch (error) {
        console.error("Error fetching destination:", error);
        return null;  // エラーが発生した場合はnullを返す
    }
}


// ==============================================================
// 弁当の種類ごとの個別を取得
// ==============================================================
export async function getLunchCount() {
    try {
        const lunchRaw = await prisma.destination_h.groupBy({
            by: ['place', 'lunch'],
            _count: { lunch: true },
        });

        const lunchList = lunchRaw.map((item: LunchGroup) => ({
            place: item.place, 
            lunch: item.lunch, 
            count: item._count.lunch 
        }));


        return { lunchList }

    } catch (error) {
        console.error(error)
        return null
    }
}