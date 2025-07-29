'use client' 

import { useActionState } from "react"; 
import { createDestination } from "@/lib/destination/actions/create";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const RadioButtonStyle = {
    width: "20px",
    height: "20px",
    marginRight: "4px"
};


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

                <div className="font-bold text-xl px-2">
                    <Label htmlFor="place" className="text-xl">座席</Label>
                    <label className="px-2">
                        <input type="radio" name="place" value="mu" defaultChecked style={RadioButtonStyle} />
                        μ事務所
                    </label>
                    <label className="px-2">
                        <input type="radio" name="place" value="f3" style={RadioButtonStyle} />
                        3F事務所
                    </label>
                </div>
                <div>
                    {/* （非表示）在席：デフォルト：出社 */}
                    <Input type="hidden" id="presence" name="presence" defaultValue="#4169E1" />
                </div>
                <div>
                    {/* （非表示）行先：デフォルト：空白 */}
                    <Input type="hidden" id="detination" name="detination" defaultValue="" />
                </div>
                <div>
                    {/* （非表示）昼食：デフォルト：空白 */}
                    <Input type="hidden" id="lunch" name="lunch" defaultValue="" />
                </div>
                <div className="font-bold text-xl px-2">
                    <Label htmlFor="lunch_default" className="text-xl">弁当管理要否</Label>
                    <label className="px-2">
                        <input type="radio" name="lunch_default" value="0" defaultChecked style={RadioButtonStyle}/>
                        否
                    </label>
                    <label className="px-2">
                        <input type="radio" name="lunch_default" value="1" style={RadioButtonStyle} />
                        要
                    </label>
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
