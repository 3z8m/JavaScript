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
	const name = formData.get("name") as string
	const presence = formData.get("presence") as string
	const destination = formData.get("destination") as string
	const lunch = formData.get("lunch") as string

	// バリデーション


	// DBに保存
	await prisma.destination_h.update({
		where: { id: id },
		data: {
			name,
			presence,
			destination,
			lunch
		}
	})

	// リダイレクト
	redirect('/destination')
}