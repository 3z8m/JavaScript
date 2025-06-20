'use server';

import { Task, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { redirect } from "next/navigation";


// server actionでエラーが発生したときにエラーを返す型を定義
export interface FormState {
    error: String;
};


//------------------------------------------------------------------
// 新規作成
//------------------------------------------------------------------
//FormData：HTML <form> 要素からデータを取得・操作できるインターフェース
export const createTask = async (state: FormState, formData: FormData) => {

    // Task型のオブジェクトを作成
    const newTask: Task = {
        title: formData.get('title') as string,             // formのname属性から取得
        description: formData.get('description') as string,
        dueDate: formData.get('dueDate') as string,
        isCompleted: false,
    }

    try {
        await connectDB()                           // DBに接続
        await TaskModel.create(newTask)             // 新規登録
    } catch (error) {
        state.error = 'タスクの作成に失敗しました';
        return state;
    }

    redirect('/')
};


//------------------------------------------------------------------
// 更新
//------------------------------------------------------------------
export const updateTask = async (id: string, state: FormState, formData: FormData) => {
    const updateTask: Task = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        dueDate: formData.get('dueDate') as string,
        isCompleted: Boolean(formData.get('isCompleted')),
    }

    try {
        await connectDB()
        await TaskModel.updateOne({ _id: id }, updateTask);
    } catch (error) {
        state.error = 'タスクの更新に失敗しました';
        return state;
    }

    redirect('/')
};


//------------------------------------------------------------------
// 削除
//------------------------------------------------------------------
export const deleteTask = async (id: string, state: FormState) => {

    try {
        await connectDB()
        await TaskModel.deleteOne({ _id: id });
    } catch (error) {
        state.error = 'タスクの削除に失敗しました';
        return state;
    }

    redirect('/')
};