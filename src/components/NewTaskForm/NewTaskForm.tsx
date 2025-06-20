'use client';

// useFormState ：渡されたアクションの結果に基づき state を更新するフック
// useFormStatus：フォーム送信時のステータス情報を提供するフック
import { useFormState, useFormStatus } from "react-dom";

import { FormState, createTask } from "@/actions/task";


const NewTaskForm = () => {

    // createTask 関数を useFormState 経由でサーバーアクションとして呼び出し、
    // createTask() をサーバー側で実行し、MongoDB にタスクを登録して '/' にリダイレクト
    const initialState: FormState = { error: '' };
    const [state, formAction ] = useFormState(createTask, initialState);

    const SubmitButton = () => {

        // useFormStatus() は { pending: boolean } のようなオブジェクトを返す。
        // この pending は「今このフォームが送信処理中かどうか（pendingがtrueか）」
        const { pending } = useFormStatus();

        return (
            <button 
                type="submit" 
                className="mt-8 py-2 w-full rounded-md text-white bg-gray-800
                    hover:bg-gray-700 text-sm font-semibold shadow-sm
                    disabled:bg-gray-400" 
                disabled={pending}      // フォーム送信中（pending === true）ならボタンは無効化（グレーアウト）
                                        // ユーザーがフォームを連打して何度も送信しないようにするための安全対策
            >
                Create
            </button>
        );
    }

    return (
        <div className="mt-10 mx-auto w-full max-w-sm">
            <form action={formAction}>  {/* フォームの内容をformActionに渡し、タスクを作成 */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">タイトル</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required 
                        className="block mt-2 py-1.5 px-2 w-full rounded-md border-0
                        shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="description" className="block text-sm font-medium">説明</label>
                    <input 
                        type="text" 
                        id="description" 
                        name="description" 
                        required 
                        className="block mt-2 py-1.5 px-2 w-full rounded-md border-0
                        shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="dueDate" className="block text-sm font-medium">期限</label>
                    <input 
                        type="date" 
                        id="dueDate" 
                        name="dueDate"
                        min="2020-01-01"
                        max="2100-12-31"
                        required 
                        className="block mt-2 py-1.5 px-2 w-full rounded-md border-0
                        shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                </div>
                <SubmitButton />
                {state.error && (
                    <p className="mt-2 text-red-500 text-sm">
                        {state.error}
                    </p>
                )}
            </form>    
        </div>
    )
};

export default NewTaskForm