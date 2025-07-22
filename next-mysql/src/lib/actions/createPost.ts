'use server'

import { postSchema } from "@/validations/post"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"
import { auth } from "@/auth";
import { saveImage } from "@/utils/image";


type ActionState = {
    success: boolean;
    errors: Record<string, string[]>    // Record型（キー，バリュー）
}

export async function createPost(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

	// フォームから来た情報を取得
	const title = formData.get("title") as string
	const content = formData.get("content") as string
	const topImageInput = formData.get("topImage")
	const topImage = topImageInput instanceof File ? topImageInput : null

	// バリデーション
	const validationResult = postSchema.safeParse({ title, content, topImage })
	if(!validationResult.success) {
		const { fieldErrors } = validationResult.error.flatten();
		return Promise.resolve({ success: false, errors: fieldErrors });
	}

	// 画像保存
	const imageUrl = topImage ? await saveImage(topImage) : null;
    if(topImage && !imageUrl){
        return { success: false, errors: { image: ['画像の保存に失敗しました']}}
    }

	// セッション取得
	const session = await auth()
	const userId = session?.user?.id
	if (!session?.user?.email || !userId) {
		throw new Error("不正なリクエストです")
	}

	// DBに保存
	await prisma.post.create({
		data: {
			title,
			content,
			topImage: imageUrl,	
			published: true,	// デフォルトで公開状態
			authorId: userId
		}
	})

	// リダイレクト
	redirect('/dashboard')
}