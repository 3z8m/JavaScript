import { getOwnPost } from "@/lib/ownPost"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ja } from 'date-fns/locale'
import { auth } from "@/auth"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ReactMarkdown from "react-markdown"; 
import remarkGfm from "remark-gfm";             // Markdownの拡張機能
import rehypeHighlight from "rehype-highlight"; // コードハイライト用のスタイル
import "highlight.js/styles/github.css";        // コードハイライト用のスタイル


type Params = {
    params: Promise<{id: string}>
}

export default async function ShowPage({params}: Params) {

    // セッション取得
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.email || !userId) {
        throw new Error("不正なリクエストです")
    }

    const {id} = await params
    const post = await getOwnPost(userId, id)

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
                {post.topImage && (
                    <div className="relative w-full h-64 lg:h-96">
                        <Image
                            src={post.topImage}
                            alt={post.title}
                            fill
                            sizes="100vw"   // 画像の幅を100%（100vw）
                            className="rounded-t-md object-cover"
                            priority
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none markdown-table">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false} 			// HTMLをスキップしない
                            unwrapDisallowed={true} 	// Markdownの改行を解釈
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author.name}</span>
                        <time className="text-sm text-gray-500">
                            {format(new Date(post.createdAt), 'yyyy年MM月dd日', {locale: ja })}
                        </time>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
