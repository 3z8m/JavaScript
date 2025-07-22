'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import DeletePostDialog from "@/components/post/DeletePostDialog"


export default function PostDropdownMenu({postId}:{postId: string}) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // 削除ダイアログの状態管理
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)     // 削除ダイアログの表示状態

    const handleDeleteDialogChage = (open: boolean) => {
        setShowDeleteDialog(open)           // 削除ダイアログの表示状態を更新
        if (!open) {
            setIsDeleteDialogOpen(false)    // ダイアログが閉じられた場合、ドロップダウンメニューも閉じる
        }
    }

    return (
        <>
        <DropdownMenu open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}> 
            <DropdownMenuTrigger className="px-2 py-1 border rounded-md">⋯</DropdownMenuTrigger> 
            <DropdownMenuContent> 
                <DropdownMenuItem asChild> 
                    <Link href={`/manage/posts/${postId}`} className="cursor-pointer">詳細</Link> 
                </DropdownMenuItem> 
                <DropdownMenuItem asChild> 
                    <Link href={`/manage/posts/${postId}/edit`} className="cursor-pointer">編集</Link> 
                </DropdownMenuItem> 
                <DropdownMenuItem className="text-red-600 cursor-pointer"
                    onSelect={() => {
                        setIsDeleteDialogOpen(false)    // ドロップダウンメニューを閉じる
                        setShowDeleteDialog(true)       // 削除ダイアログを開く
                    }}
                >削除</DropdownMenuItem>
            </DropdownMenuContent> 
        </DropdownMenu>
        
        {/* 削除ダイアログの表示 */}
        {showDeleteDialog && (
            <DeletePostDialog
                postId={postId}
                isOpen={showDeleteDialog}
                onOpenChange={handleDeleteDialogChage}
            />
        )}
        </>
    )
}
