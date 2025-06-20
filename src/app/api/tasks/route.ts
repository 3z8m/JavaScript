// ============================================================
// MongoDBに接続し、全てのタスクを取得してクライアントに返すAPI
// GETリクエストが来たときに呼び出される
// ============================================================

import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

// データ取得
export const GET = async () => {
    try {
        // データベースと接続を確立
        await connectDB();

        // すべてのタスクを取得し、allTasksにTaskDocument配列型で挿入
        const allTasks: TaskDocument[] = await TaskModel.find();
        
        // messageと取得したデータを返す
        /*
          HTTPレスポンスとしてJSON形式のデータを返すためのヘルパー関数
            第1引数：本文（必須）
            第2引数：初期設定（省略可）statusコードなど
        */
        return NextResponse.json({ message: 'タスク取得成功', tasks: allTasks });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'タスク取得失敗'}, { status: 500 });
    }
};

// リクエストごとに最新のデータを取得
export const dynamic = 'force-dynamic';