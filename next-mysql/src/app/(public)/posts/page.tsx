import PostCard from "@/components/post/PostCard"
import { getPosts, searchPosts } from "@/lib/post"
import { Post } from '@/types/post'
import SearchBox from "@/components/post/SearchBox"


type SearchParams = {
	search? : string
}

export default async function PostsPage(
	{searchParams}:{searchParams: Promise<SearchParams>}
) {

	const resolvedSearchParams = await searchParams
	const query = resolvedSearchParams.search || ''
	// クエリが存在する場合は検索、存在しない場合は全件取得
	const  posts = query ? await searchPosts(query) as Post[] : await getPosts() as Post[]

	return (
		<>
		<div className="container mx-auto px-4 py-8">
			<SearchBox />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
		</>
	)
}
