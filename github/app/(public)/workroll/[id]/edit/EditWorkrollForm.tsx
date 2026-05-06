'use client'

import { useState, useActionState } from "react";
import { updateWorkroll } from "@/lib/workroll/actions/update";
import { Button } from "@/components/ui/button";
import { EditFormProps } from "@/types/workroll";

export default function EditWorkrollForm({ data }: EditFormProps) {

    const [rollType, setRollType] = useState(data.roll_type);
    const [grindingType, setGrindingType] = useState(data.grinding_type);
    const [judgement, setJudgement] = useState(data.judgement);
    const [operator, setOperator] = useState(data.operator);
    const [operationGroup, setOperationGroup] = useState(data.operation_group);

    const [state, formAction] = useActionState(updateWorkroll, {
        success: false,
        errors: {}
    });

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl text-center">ワークロール編集</h1>
            <br />

            <form action={formAction} className="space-y-6 text-center">

                {/* ---------------------------------------------------------
                    ロール番号
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">ロール番号</label>
                    <input
                        type="text"
                        name="roll_id"
                        defaultValue={data.roll_id}
                        className="border p-2 ml-3"
                    />
                </div>

                {/* ---------------------------------------------------------
                    ロール種（ドロップダウン）
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">ロール種</label>
                    <select
                        name="roll_type"
                        value={rollType}
                        onChange={(e) => setRollType(e.target.value)}
                        className="border p-2 ml-3"
                    >
                        <option value="H30">H30</option>
                        <option value="H50">H50</option>
                        <option value="WC30">WC30</option>
                    </select>
                </div>

                {/* ---------------------------------------------------------
                    砥石種（ドロップダウン）
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">砥石種</label>
                    <select
                        name="grinding_type"
                        value={grindingType}
                        onChange={(e) => setGrindingType(e.target.value)}
                        className="border p-2 ml-3"
                    >
                        <option value="SD#120">SD#120</option>
                        <option value="SD#600">SD#600</option>
                    </select>
                </div>

                {/* ---------------------------------------------------------
                    数値入力
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">研削量</label>
                    <input
                        type="number"
                        name="grinding_amount"
                        defaultValue={data.grinding_amount}
                        className="border p-2 ml-3"
                    />
                </div>

                <div>
                    <label className="font-bold text-xl">ロール径</label>
                    <input
                        type="number"
                        name="diameter"
                        defaultValue={data.diameter}
                        className="border p-2 ml-3"
                    />
                </div>

                <div>
                    <label className="font-bold text-xl">Ra（市川）</label>
                    <input
                        type="number"
                        name="ra_i"
                        defaultValue={data.ra_i}
                        className="border p-2 ml-3"
                    />
                </div>

                <div>
                    <label className="font-bold text-xl">Ra（光）</label>
                    <input
                        type="number"
                        name="ra_h"
                        defaultValue={data.ra_h}
                        className="border p-2 ml-3"
                    />
                </div>

                {/* ---------------------------------------------------------
                    合否（ドロップダウン）
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">合否</label>
                    <select
                        name="judgement"
                        value={judgement}
                        onChange={(e) => setJudgement(e.target.value)}
                        className="border p-2 ml-3"
                    >
                        <option value="OK">OK</option>
                        <option value="NG">NG</option>
                    </select>
                </div>

                {/* ---------------------------------------------------------
                    コメント
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">コメント</label>
                    <textarea
                        name="comment"
                        defaultValue={data.comment ?? ""}
                        className="border p-2 ml-3 w-80 h-24"
                    />
                </div>

                {/* ---------------------------------------------------------
                    作業日・時間
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">作業日</label>
                    <input
                        type="date"
                        name="operation_date"
                        defaultValue={data.operation_date}
                        className="border p-2 ml-3"
                    />
                </div>

                <div>
                    <label className="font-bold text-xl">開始時間</label>
                    <input
                        type="time"
                        name="start_time"
                        defaultValue={data.start_time}
                        className="border p-2 ml-3"
                    />
                </div>

                <div>
                    <label className="font-bold text-xl">終了時間</label>
                    <input
                        type="time"
                        name="end_time"
                        defaultValue={data.end_time}
                        className="border p-2 ml-3"
                    />
                </div>

                {/* ---------------------------------------------------------
                    作業者（ドロップダウン）
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">作業者</label>
                    <select
                        name="operator"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="border p-2 ml-3"
                    >
                        <option value="横内">横内</option>
                        <option value="他">他</option>
                    </select>
                </div>

                {/* ---------------------------------------------------------
                    作業組（ドロップダウン）
                --------------------------------------------------------- */}
                <div>
                    <label className="font-bold text-xl">作業組</label>
                    <select
                        name="operation_group"
                        value={operationGroup}
                        onChange={(e) => setOperationGroup(e.target.value)}
                        className="border p-2 ml-3"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                {/* ---------------------------------------------------------
                    更新ボタン
                --------------------------------------------------------- */}
                <Button type="submit" className="bg-blue-500 text-white text-xl px-4 py-5 w-full rounded">
                    更新
                </Button>

                {/* ---------------------------------------------------------
                    hidden fields
                --------------------------------------------------------- */}
                <input type="hidden" name="id" value={data.id} />
            </form>
        </div>
    );
}