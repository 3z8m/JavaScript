import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {

    // 現在の日付を取得し、YYYY-MM-ddに変換
    const currentDate = new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '-');     //  /:正規表現の開始、\:エスケープ文字、/:変換対象の文字、/:正規表現の終わり、g:グローバル

    try {
        await connectDB();
        const expiredTasks: TaskDocument[] = await TaskModel.find({
            isCompleted: false,                 // falseのみ抽出
            dueDate: { $lt: currentDate },      // $lt … mongoDBで"より小さい"を取得する演算子
        });
        return NextResponse.json({ message: 'タスク取得成功', tasks: expiredTasks });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'タスク取得失敗'}, { status: 500 });
    }
};

// リクエストごとに最新のデータを取得
export const dynamic = 'force-dynamic';