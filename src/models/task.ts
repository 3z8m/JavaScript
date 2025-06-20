import mongoose, { Document } from 'mongoose';

// 
export interface Task {
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
}

// mongooseのDocumentクラスに定義されているinterfaceを追加
export interface TaskDocument extends Task, Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

// スキーマ定義
const taskSchema = new mongoose.Schema<TaskDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });   // createdAt, updatedAtを自動的に入力

/* 
    タスクモデルを作成
    すでにタスクモデルがある場合は mongoose.models.Task を使用
    無い場合は taskSchemaを使って、'Task'というモデルを作成
*/
export const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema);