import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const completedTasks: TaskDocument[] = await TaskModel.find({
            isCompleted: true,      // trueのみ抽出
        });

        return NextResponse.json({ message: 'タスク取得成功', tasks: completedTasks });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'タスク取得失敗'}, { status: 500 });
    }
};

// リクエストごとに最新のデータを取得
export const dynamic = 'force-dynamic';