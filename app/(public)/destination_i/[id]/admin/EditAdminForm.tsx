'use client' 

import { useState, useActionState } from "react"; 
import { forceUpdate } from "@/lib/destination_i/actions/update";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { EditFormProps_i } from "@/types/destination";


type ActionState = {
  success: boolean
  errors: Record<string, string[]>
}

export default function EditAdminForm({data}: EditFormProps_i) {

    const router = useRouter()
    
    // フォームの状態を管理
    const [order, setOrder] = useState(data.order);                 // 並び順の初期値は現在の登録値
    const [row, setRow] = useState(data.row);                       // 列の初期値は現在の登録値
    const [state, formAction] = useActionState(
        async (
            prevState: ActionState, 
            formData: FormData
        ): Promise<ActionState> => {
            const result = await forceUpdate(prevState, formData);
            if (result.success) {
                router.push('/destination_i/list')     // 成功時にリダイレクト
            }
            return result;
        }, {
            success: false,
            errors: {}
        }
    );


    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center text-3xl font-bold">編集：{data.name}さん</h1>
            
            <form action={formAction} className="space-y-4 text-center">

                {/* ----------------------------------------------------------------
                        並び順
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">
					<Label htmlFor="order" className="text-xl">並び順</Label>
					<Input type="text" id="order" name="order" value={order}
                     onChange={(e) => setOrder(e.target.value)} /> 
                    {state.errors.order && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.order.join(', ')}
                        </p>
                    )}
                </div>
                {/* ----------------------------------------------------------------
                        列
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">

                    <select id="row" name="row" value={row}
                        onChange={(e) => setRow(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        {[0, 1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num.toString()}>
                                {num}
                            </option>
                        ))}
                    </select>
                    {state.errors.row && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.row.join(', ')}
                        </p>
                    )}
                </div>

                <br />
                <hr />
                <br />

                {/* フォームの非表示フィールド */}
                {/* input要素のvalueにnullは許容されないため、[string | null] 定義されているものは [?? ""]で空文字に変換 */}
                <input type="hidden" name="id" value={data.id} />
                <input type="hidden" name="name" value={data.name} />
                <input type="hidden" name="presence" value={data.presence ?? ""} />
                <input type="hidden" name="destination" value={data.destination ?? ""} />

                <Button type="submit" className="bg-blue-500 text-white px-4 py-5 w-full rounded">
                    更新
                </Button>
            </form>
        </div>
    )
}
