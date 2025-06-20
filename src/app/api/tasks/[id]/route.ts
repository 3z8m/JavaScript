import { TaskModel } from "@/models/task";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database";


export const GET = async (
    _: NextRequest,                         // リクエストオブジェクト（今回は使わないので"_"に）
    { params }: { params: { id: string}}    // ルートパラメータから"id"を抽出（/api/tasks/1 => params.id === "1"）
) => {
    try {
        await connectDB();
        const task = await TaskModel.findById(params.id);

        if (!task) {
            return NextResponse.json(
                {message: 'タスクが存在しません'},
                {status: 404}
            );
        }
        return NextResponse.json({ message: 'タスク取得成功', task })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
    }
};

export const dynamic = 'force-dynamic';