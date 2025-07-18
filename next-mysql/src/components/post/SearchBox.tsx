'use client'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function SearchBox() {
	const [ search, setSearch ] = useState('')
	const [ debouncedSearch, setDebouncedSearch ] = useState('')
	const router = useRouter()

	// デバウンス（処理の負荷軽減のため、一定時間後に実行）
	useEffect(() => {
		const timer = setTimeout(() => {	// 0.5秒待機
			setDebouncedSearch(search)
		}, 500)

		return () => clearTimeout(timer)	// 設定したらタイマーを解除
	}, [search])

	// debouncedSearchが更新されたら実行
	useEffect(() => {
		if(debouncedSearch.trim()) {							// debouncedSearchがあれば不要な空白はtrim
			router.push(`/?search=${debouncedSearch.trim()}`)	// リダイレクト
		} else {
			router.push('/')									// 入力が無ければ'/'にリダイレクト
		}
	}, [debouncedSearch, router])

	return (
		<>
		<Input
			placeholder="記事を検索"
			className="w-[200px] lg:w-[300px]"
			value={search}
			onChange={(e) => setSearch(e.target.value)}	// 文字が入力された瞬間にイベント実行
		/>
		</>
	)
}
