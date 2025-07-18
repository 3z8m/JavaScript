import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostCardProps } from "@/types/post"


export default function PostCard({post}: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
        <Link href={`/posts/${post.id}`}>
			{post.topImage && (
				<div className="relative w-full h-48">
					<Image
						src={post.topImage}
						alt={post.title}
						fill
						// 画面サイズによって画像の幅を動的に変更し、表示を最適化
						// 画面の幅が 768px以下の場合、画像の幅を100%（100vw）
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="rounded-t-md object-cover"
						priority
					/>
				</div>
			)}
			<br></br>
			<CardHeader>
				<CardTitle className="line-clamp-2">{post.title}</CardTitle>
			</CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
					<span>{post.author.name}</span>
					<time>
						{formatDistanceToNow(new Date(post.createdAt),{
							addSuffix: true,
							locale: ja
						})}
					</time>
                </div>
            </CardContent>
        </Link>
    </Card>
  )
}
