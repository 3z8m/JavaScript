'use server'

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"


type ActionState = {
    success: boolean;
    errors: Record<string, string[]>    // Record型（キー，バリュー）
}

export async function createDestination(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

	// フォームから来た情報を取得
	const name = formData.get("name") as string
	const order = formData.get("order") as string
	const row = formData.get("row") as string
	const place = formData.get("place") as string
	const presence = formData.get("presence") as string
	const destination = formData.get("detination") as string
	const lunch = formData.get("lunch") as string
	const lunch_default = formData.get("lunch_default") as string

	// バリデーション


	// DBに保存
	await prisma.destination_h.create({
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

	// リダイレクト
	redirect('/destination')
}