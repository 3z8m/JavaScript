'use server'

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
	const presence = formData.get("presence") as string				// 在席	
	const destination = formData.get("destination") as string		// 行先


	// DB更新
	await prisma.destination_i.update({
		where: { id },
		data: {
			name,
			order,
			row,
			presence,
			destination
		}
	})

	redirect('/destination_i')
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
    const presence = formData.get("presence") as string
    const destination = formData.get("destination") as string

	try {
		await prisma.destination_i.update({
			where: { id },
			data: {
				name,
				order,
				row,
				presence,
				destination
			}
		})
		return { success: true, errors: {} }
	} catch (error) {
		console.error(error)
		return {success: false, errors: { db: ["更新に失敗しました"]}}
	}
}
