'use server'

//import { postSchema } from "@/validations/post"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"


type ActionState = {
    success: boolean;
    errors: Record<string, string[]>    // Record型（キー，バリュー）
}

export async function updateDestination(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

	// フォームから来た情報を取得
	const id = formData.get("id") as string
	const name = formData.get("name") as string						// 名前
	const order = formData.get("order") as string					// 並び順（Admin）
	const row = formData.get("row") as string						// 列（Admin）
	const place = formData.get("place") as string					// 執務場所（Admin）	
	const presence = formData.get("presence") as string				// 在席	
	const destination = formData.get("destination") as string		// 行先
	const lunch = formData.get("lunch") as string					// 昼食	
	const lunch_default = formData.get("lunch_default") as string	// 昼食管理要否（Admin）

    // 特定の値をチェックし、ワーニング画面に遷移
    //　 弁当管理要否の初期設定が「1」、かつ「出社」、かつ「弁当：無」⇒ワーニング
    //   弁当管理要否の初期設定が「1」、かつ「在宅/出張/年休」、かつ「弁当：無以外」⇒ワーニング
	const showWarning = (
		(lunch_default === "1" && presence === "#0030E0" && lunch === "") ||
		(lunch_default === "1" && ["#228822", "#D030D0", "#D1001C"].includes(presence) && lunch !== "")
	)

	// DB更新
	await prisma.destination_h.update({
		where: { id },
		data: {
			name,
			order,
			row,
			place,
			presence,
			destination,
			lunch,
			lunch_default
		}
	})

	// 更新後に条件に応じてリダイレクト
	if (showWarning) {
		redirect(`/destination/${id}/lunch_warning`)
	} else {
		redirect('/destination')
	}
}


// lunch_warning から
export async function forceUpdate(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const order = formData.get("order") as string
    const row = formData.get("row") as string
    const place = formData.get("place") as string
    const presence = formData.get("presence") as string
    const destination = formData.get("destination") as string
    const lunch = formData.get("lunch") as string
    const lunch_default = formData.get("lunch_default") as string

	try {
		await prisma.destination_h.update({
			where: { id },
			data: {
				name,
				order,
				row,
				place,
				presence,
				destination,
				lunch,
				lunch_default
			}
		})
		return { success: true, errors: {} }
	} catch (error) {
		console.error(error)
		return {success: false, errors: { db: ["更新に失敗しました"]}}
	}
}
