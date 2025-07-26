'use server'

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"; 

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>    // Record型（キー，バリュー）
}

export async function deletePost(postId: string): Promise<ActionState> {
    await prisma.post.delete({
        where: { id: postId }
    });

    // リダイレクト
    redirect('/dashboard');
}