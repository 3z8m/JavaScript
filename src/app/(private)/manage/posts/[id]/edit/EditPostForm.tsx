'use client' 

import { useState, useActionState, useEffect } from "react"; 
import { updatePost } from "@/lib/actions/updatePost";
import ReactMarkdown from "react-markdown"; 
import remarkGfm from "remark-gfm"; 
import rehypeHighlight from "rehype-highlight"; 
import TextareaAutosize from "react-textarea-autosize"; 
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";


type EditPostFormProps = {
    post: {
        id: string;
        title: string;
        content: string;
        topImage?: string | null;
        published: boolean;
    }
}


export default function EditPostForm({post}: EditPostFormProps) {
    // フォームの状態を管理
    const [title, setTitle] = useState(post.title);                         // タイトルを設定
    const [content, setContent] = useState(post.content);                   // 投稿内容を設定
    const [published, setPublished] = useState(post.published);             // 公開状態を設定
    const [imagePreview, setImagePreview] = useState(post.topImage || '');  // トップ画像のプレビュー
    const [contentLength, setContentLength] = useState(0);                  // 投稿内容の文字数を設定
    const [preview, setPreview] = useState(false)				            // プレビュー表示のトグル状態
    const [state, formAction] = useActionState(updatePost, {	            // アクションの初期状態
        success: false,
        errors: {}
    })

    // トップ画像のプレビューを更新
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)				// 入力文字を更新
        setContentLength(value.length)	// 文字数をカウント
    }

    // 画像選択時のハンドラー 
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl) // プレビューURLを設定
        } else {
            setImagePreview('')         // 画像が選択されていない場合は空
        }
    }

    // コンポーネントの初期化時に画像プレビューを設定
    useEffect(() => {
        return () => {
            // コンポーネントがアンマウントされる際にオブジェクトURLを解放
            if (imagePreview && imagePreview !== post.topImage ) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview, post.topImage])


    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <Input type="text" id="title" name="title" placeholder="タイトルを入力"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    {state.errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.title.join(', ')}
                        </p>
                    )}
                </div>
                <div> 
                    <Label htmlFor="topImage">トップ画像</Label> 
                    <Input type="file" id="topImage" accept="image/*" name="topImage"
                     onChange={handleImageChange} />    {/* 画像を切り替え */}
                    { imagePreview && (
                        <div className="mt-2">
                            <Image src={imagePreview} alt={post.title} width={0} height={0}
                             sizes="200px" className="w-[200px]" priority />
                        </div>
                    )}
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.topImage.join(', ')}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="content">内容(Markdown)</Label>
                    <TextareaAutosize 
                        id="content" name="content" className="w-full border p-2" placeholder="Markdown形式で入力"
                        minRows={8} value={content} onChange={handleContentChange} />
                        {state.errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                                {state.errors.content.join(', ')}
                            </p>
                        )}
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">
                    文字数： {contentLength}
                </div>
                <div>
                    {/* プレビュー表示（トグル） */}
                    <Button type="button" onClick={() => setPreview(!preview)} className="mb-2">
                        {preview ? '編集に戻る' : 'プレビュー'}
                    </Button>
                </div>
                {preview && (
                    <div className="border p-4 bg-gray-50 prose max-w-none markdown-table">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false} 			// HTMLをスキップしない
                            unwrapDisallowed={true} 	// Markdownの改行を解釈
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}

                {/* 公開状態のラジオボタン */}
                <RadioGroup value={published.toString()} name="published"
                 onValueChange={(value) => setPublished(value === "true")}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="published-one" />
                        <Label htmlFor="published-one">表示</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="published-two" />
                        <Label htmlFor="published-two">非表示</Label>
                    </div>                
                </RadioGroup>

                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    更新
                </Button>

                {/* フォームのフィールド */} 
                <input type="hidden" name="postId" value={post.id} />
                <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />

            </form>
        </div>
    )
}
