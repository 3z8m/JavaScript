import { prisma } from "@/lib/prisma";


export async function getOwnPosts(userId: string) {
	return await prisma.post.findMany({
		where: {
			authorId: userId
		},
		select: {
			id: true,
			title: true,
			published: true,
			updatedAt: true,
		},
		orderBy: {
			createdAt: "desc"
		},
	})
}


export async function getOwnPost(userId: string, postId: string) {
	try {
		return await prisma.post.findFirstOrThrow({
			where: {
				AND: [					// 投稿IDとユーザーIDの両方で
					{ id: postId },
					{ authorId: userId }
				]
			},
			select: {
				id: true,
				title: true,
				content: true,
				topImage: true,
				author: true,
				published: true,
				createdAt: true,
				updatedAt: true
			}
		})
	} catch (error) {
		console.log(error)
		return null;		// エラーが発生した場合はnullを返す
	}
}