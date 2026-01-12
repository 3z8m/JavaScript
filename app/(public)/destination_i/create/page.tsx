'use client' 

import { useActionState } from "react"; 
import { createDestination } from "@/lib/destination_i/actions/create";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export default function CreatePage() {

    // フォームの状態を管理
    const [state, formAction] = useActionState(createDestination, {	// アクションの初期状態
        success: false,
        errors: {}
    })

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">【行先ボード】新規ユーザー登録</h1>
            <form action={formAction} className="space-y-4">
				<div>
					<Label htmlFor="name" className="text-xl">名前</Label>
					<Input type="text" id="name" name="name" placeholder="表示名" /> 
				</div>
                <div>
					<Label htmlFor="order" className="text-xl">並び順</Label>
					<Input type="text" id="order" name="order" placeholder="例：0101" /> 
				</div>
                <div className="font-bold text-2xl px-2">
					<Label htmlFor="row" className="text-xl">列</Label>
                    <select id="row" name="row"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num.toString()}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    {/* （非表示）在席：デフォルト：不在 */}
                    <Input type="hidden" id="presence" name="presence" defaultValue="#778899" />
                </div>
                <div>
                    {/* （非表示）行先：デフォルト：空白 */}
                    <Input type="hidden" id="detination" name="detination" defaultValue="" />
                </div>

                {state.success && <p className="text-green-600">登録完了！</p>}
                {Object.keys(state.errors).length > 0 && (
                    <p className="text-red-600">登録時にエラーが発生しました</p>
                )}

                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    登録
                </Button>
            </form>
        </div>
    )
}
