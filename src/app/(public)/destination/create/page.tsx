'use client' 

import { useActionState } from "react"; 
import { createDestination } from "@/lib/destination/actions/create";
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
					<Label htmlFor="name">名前</Label>
					<Input type="text" id="name" name="name" placeholder="表示名" /> 
				</div>
                <div>
					<Label htmlFor="order">並び順</Label>
					<Input type="text" id="order" name="order" placeholder="例：0101" /> 
				</div>
                <div>
                    <Label htmlFor="row">行</Label>
                    <Input type="text" id="row" name="row" placeholder="例：1" />
                </div>
                <div>
                    <Label htmlFor="place">執務場所</Label>
                    <Input type="text" id="place" name="mu" placeholder="例：mu" />
                </div>
                <div>
                    <Label htmlFor="presence">在席</Label>
                    <Input type="text" id="presence" name="presence" defaultValue="#1e90ff" />
                </div>
                <div>
                    {/* （非表示）行先：デフォルト：空白 */}
                    <Input type="hidden" id="detination" name="detination" defaultValue="" />
                </div>
                <div>
                    {/* （非表示）昼食：デフォルト：空白 */}
                    <Input type="hidden" id="lunch" name="lunch" defaultValue="" />
                </div>
                <div>
                    <Label htmlFor="lunch_default">弁当管理要否</Label>
                    <Input type="text" id="lunch_default" name="lunch_default"  defaultValue="0" />
                </div>
                <div className="font-bold text-2xl px-2">
                    <Label htmlFor="lunch_default">弁当管理要否</Label>
                    <label><input type="radio" name="lunch_default" value="0" checked />否</label>
                    <label><input type="radio" name="lunch_default" value="1" />要</label>
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
