'use client'

import { useActionState } from "react";
import { createWorkroll } from "@/lib/workroll/actions/create";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreatePage() {

    const [state, formAction] = useActionState(createWorkroll, {
        success: false,
        errors: {}
    });

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">【ワークロール】新規登録</h1>

            <form action={formAction} className="space-y-6">

                {/* ロール番号 */}
                <div>
                    <Label htmlFor="roll_id" className="text-xl">ロール番号</Label>
                    <Input type="text" id="roll_id" name="roll_id" placeholder="例：R001" />
                </div>

                {/* ロール種 */}
                <div>
                    <Label htmlFor="roll_type" className="text-xl">ロール種</Label>
                    <select
                        id="roll_type"
                        name="roll_type"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="H30">H30</option>
                        <option value="H50">H50</option>
                        <option value="WC30">WC30</option>
                    </select>
                </div>

                {/* 砥石種 */}
                <div>
                    <Label htmlFor="grinding_type" className="text-xl">砥石種</Label>
                    <select
                        id="grinding_type"
                        name="grinding_type"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="SD#120">SD#120</option>
                        <option value="SD#600">SD#600</option>
                    </select>
                </div>

                {/* 数値項目 */}
                <div>
                    <Label htmlFor="grinding_amount" className="text-xl">研削量</Label>
                    <Input type="number" id="grinding_amount" name="grinding_amount" step="0.01" />
                </div>

                <div>
                    <Label htmlFor="diameter" className="text-xl">ロール径</Label>
                    <Input type="number" id="diameter" name="diameter" step="0.01" />
                </div>

                <div>
                    <Label htmlFor="ra_i" className="text-xl">Ra（市川）</Label>
                    <Input type="number" id="ra_i" name="ra_i" step="0.01" />
                </div>

                <div>
                    <Label htmlFor="ra_h" className="text-xl">Ra（光）</Label>
                    <Input type="number" id="ra_h" name="ra_h" step="0.01" />
                </div>

                {/* 合否 */}
                <div>
                    <Label htmlFor="judgement" className="text-xl">合否</Label>
                    <select
                        id="judgement"
                        name="judgement"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="OK">OK</option>
                        <option value="NG">NG</option>
                    </select>
                </div>

                {/* コメント */}
                <div>
                    <Label htmlFor="comment" className="text-xl">コメント</Label>
                    <textarea
                        id="comment"
                        name="comment"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full h-24"
                    />
                </div>

                {/* 作業日・時間 */}
                <div>
                    <Label htmlFor="operation_date" className="text-xl">作業日</Label>
                    <Input type="date" id="operation_date" name="operation_date" />
                </div>

                <div>
                    <Label htmlFor="start_time" className="text-xl">開始時間</Label>
                    <Input type="time" id="start_time" name="start_time" />
                </div>

                <div>
                    <Label htmlFor="end_time" className="text-xl">終了時間</Label>
                    <Input type="time" id="end_time" name="end_time" />
                </div>

                {/* 作業者 */}
                <div>
                    <Label htmlFor="operator" className="text-xl">作業者</Label>
                    <select
                        id="operator"
                        name="operator"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="横内">横内</option>
                        <option value="他">他</option>
                    </select>
                </div>

                {/* 作業組 */}
                <div>
                    <Label htmlFor="operation_group" className="text-xl">作業組</Label>
                    <select
                        id="operation_group"
                        name="operation_group"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                {/* 成功・エラー表示 */}
                {state.success && <p className="text-green-600">登録完了！</p>}
                {Object.keys(state.errors).length > 0 && (
                    <p className="text-red-600">登録時にエラーが発生しました</p>
                )}

                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    登録
                </Button>
            </form>
        </div>
    );
}
