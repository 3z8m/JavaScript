'use client' 

import { useActionState } from "react"; 
import { forceUpdate } from "@/lib/destination/actions/update";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditFormProps } from "@/types/destination";


type ActionState = {
  success: boolean
  errors: Record<string, string[]>
}


export function ForceUpdate({data}: EditFormProps) {

    const router = useRouter()

    // フォームの状態を管理
    const [state, formAction] = useActionState(
        async (
            prevState: ActionState, 
            formData: FormData
        ): Promise<ActionState> => {
            const result = await forceUpdate(prevState, formData);
            if (result.success) {
                router.push('/destination')     // 成功時にリダイレクト
            }
            return result;
        }, {
            success: false,
            errors: {}
        }
    );

    return (
        <div className="container mx-auto mt-10">
            
            <h2 className="text-center text-2xl font-bold">
                {data.name}さん、弁当：{data.lunch}で良いですか？
            </h2>
            
            <div className="flex flex-row items-center justify-center mt-8">
                <div className="px-5">
                    <Button className="bg-blue-700 text-white hover:bg-blue-600 w-30" asChild>
                        <Link href={`/destination/${data.id}/edit`}>編集画面</Link>
                    </Button>
                </div>
                <div className="px-5">
                    <form action={formAction} className="space-y-4">

                        {/* フォームの非表示フィールド */}
                        {/* input要素のvalueにnullは許容されないため、[string | null] 定義されているものは [?? ""]で空文字に変換 */}
                        <input type="hidden" name="id" value={data.id} />
                        <input type="hidden" name="name" value={data.name} />
                        <input type="hidden" name="order" value={data.order} />
                        <input type="hidden" name="row" value={data.row} />
                        <input type="hidden" name="place" value={data.place ?? ""} />
                        <input type="hidden" name="presence" value={data.presence ?? ""} />
                        <input type="hidden" name="destination" value={data.destination ?? ""} />
                        <input type="hidden" name="lunch" value={data.lunch ?? ""} />
                        <input type="hidden" name="lunch_default" value={data.lunch_default} />

                        <Button type="submit" className="bg-gray-600 text-white hover:bg-gray-500 w-30">
                            そのまま登録
                        </Button>
                    </form>
                </div>
            </div>

            {/* エラーメッセージの表示 */}
            {!state.success && Object.keys(state.errors).length > 0 && (
            <div className="text-red-600 text-center">
                {Object.entries(state.errors).map(([field, messages]) => (
                <p key={field}>{messages.join(", ")}</p>
                ))}
            </div>
            )}

        </div>
    )
}
