'use server'

import { postSchema } from "@/validations/post"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"
import { saveImage } from "@/utils/image";


type ActionState = {
    success: boolean;
    errors: Record<string, string[]>    // Record型（キー，バリュー）
}

export async function updatePost(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

	// フォームから来た情報を取得
	const title = formData.get("title") as string
	const content = formData.get("content") as string
	const topImageInput = formData.get("topImage")
	const topImage = topImageInput instanceof File ? topImageInput : null
	const postId = formData.get("postId") as string
	const published = formData.get("published") === "true"
	const oldImageUrl = formData.get("oldImageUrl") as string

	// バリデーション
	const validationResult = postSchema.safeParse({ title, content, topImage })
	if(!validationResult.success) {
		const { fieldErrors } = validationResult.error.flatten();
		return Promise.resolve({ success: false, errors: fieldErrors });
	}

	// 画像保存
	let imageUrl = oldImageUrl
	if (topImage instanceof File && topImage.size > 0 && topImage.name !== 'undefined') {
		const newImageUrl = await saveImage(topImage)
		if(!newImageUrl) {
			return { success: false, errors: { image: ['画像の保存に失敗しました']}}
		}
		imageUrl = newImageUrl
	}

	// DBに保存
	await prisma.post.update({
		where: { id: postId },
		data: {
			title,
			content,
			published,
			topImage: imageUrl,
		}
	})

	// リダイレクト
	redirect('/dashboard')
}