'use client' 

import { useState, useActionState } from "react"; 
import { createPost } from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown"; 
import remarkGfm from "remark-gfm"; 
import rehypeHighlight from "rehype-highlight"; 
import TextareaAutosize from "react-textarea-autosize"; 
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { postSchema } from "@/validations/post";


export default function CreatePage() {
	// フォームの状態を管理
	const [content, setContent] = useState('')					// 入力内容を管理
	const [contentLength, setContentLength] = useState(0)		// 入力内容と文字数を管理
	const [preview, setPreview] = useState(false)				// プレビュー表示のトグル状態
	const [state, formAction] = useActionState(createPost, {	// アクションの初期状態
		success: false,
		errors: {}
	})

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value
		setContent(value)				// 入力文字を更新
		setContentLength(value.length)	// 文字数をカウント
	}

	//-----------------------------------------------------
	// フォームのバリデーションエラーを管理
	// フォーカスが外れたときにバリデーションを実行
	//-----------------------------------------------------
 	const [formErrors, setFormErrors] = useState({title:'', content:''})

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		try {
			if (name === 'title') {
				postSchema.pick({title: true}).parse({title: value})
			} else if  (name === 'content') {
				postSchema.pick({content: true}).parse({content: value})
			}
			setFormErrors(prev =>({
				...prev,
				[name]: ''		// 以前の状態を空にする
			}))
		} catch(error){
			if (error instanceof z.ZodError) {						// バリデーションエラーの場合
				const errorMessage = error.errors[0]?.message || ''	// 最初のエラーを表示
				setFormErrors( prev => ({
					...prev,
					[name]: errorMessage
				}))
			}
		}
	}


	return (
		<div className="container mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
			<form action={formAction} className="space-y-4">
				<div>
					<Label htmlFor="title">タイトル</Label>
					<Input type="text" id="title" name="title" placeholder="タイトルを入力"
					onBlur={handleBlur} /> 
					{state.errors.title && (
						<p className="text-red-500 text-sm mt-1">
							{state.errors.title.join(', ')}
						</p>
					)}
					{/* フォーカスが外れたときにバリデーションを実行 */}
					{ formErrors.title && (
						<p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
					)}
				</div>
				<div> 
					<Label htmlFor="topImage">トップ画像</Label> 
					<Input type="file" id="topImage" accept="image/*" name="topImage" />
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
				<Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
					記事を投稿
				</Button>
			</form>
		</div>
	)
}
