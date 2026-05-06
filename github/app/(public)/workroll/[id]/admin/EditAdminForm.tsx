'use client'

import { useState, useActionState } from "react";
import { forceUpdate } from "@/lib/workroll/actions/update";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { EditFormProps } from "@/types/workroll";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export default function EditAdminForm({ data }: EditFormProps) {

    const router = useRouter();

    // 各フィールドの初期値
    const [rollId, setRollId] = useState(data.roll_id);
    const [rollType, setRollType] = useState(data.roll_type);
    const [grindingType, setGrindingType] = useState(data.grinding_type);

    const [grindingAmount, setGrindingAmount] = useState(data.grinding_amount);
    const [diameter, setDiameter] = useState(data.diameter);
    const [raI, setRaI] = useState(data.ra_i);
    const [raH, setRaH] = useState(data.ra_h);

    const [judgement, setJudgement] = useState(data.judgement);
    const [comment, setComment] = useState(data.comment ?? "");

    const [operationDate, setOperationDate] = useState(data.operation_date);
    const [startTime, setStartTime] = useState(data.start_time);
    const [endTime, setEndTime] = useState(data.end_time);

    const [operator, setOperator] = useState(data.operator);
    const [operationGroup, setOperationGroup] = useState(data.operation_group);

    const [state, formAction] = useActionState(
        async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
            const result = await forceUpdate(prevState, formData);
            if (result.success) {
                router.push('/workroll/list');
            }
            return result;
        },
        { success: false, errors: {} }
    );

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center text-3xl font-bold">管理者編集：{data.roll_id}</h1>

            <form action={formAction} className="space-y-6 text-center">

                {/* ロール番号 */}
                <div>
                    <Label htmlFor="roll_id" className="text-xl">ロール番号</Label>
                    <Input
                        id="roll_id"
                        name="roll_id"
                        value={rollId}
                        onChange={(e) => setRollId(e.target.value)}
                    />
                </div>

                {/* ロール種 */}
                <div>
                    <Label htmlFor="roll_type" className="text-xl">ロール種</Label>
                    <select
                        id="roll_type"
                        name="roll_type"
                        value={rollType}
                        onChange={(e) => setRollType(e.target.value)}
                        className="border p-2 rounded"
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
                        value={grindingType}
                        onChange={(e) => setGrindingType(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="SD#120">SD#120</option>
                        <option value="SD#600">SD#600</option>
                    </select>
                </div>

                {/* 数値項目 */}
                <div>
                    <Label className="text-xl">研削量</Label>
                    <Input
                        type="number"
                        name="grinding_amount"
                        value={grindingAmount}
                        onChange={(e) => setGrindingAmount(Number(e.target.value))}
                    />
                </div>

                <div>
                    <Label className="text-xl">ロール径</Label>
                    <Input
                        type="number"
                        name="diameter"
                        value={diameter}
                        onChange={(e) => setDiameter(Number(e.target.value))}
                    />
                </div>

                <div>
                    <Label className="text-xl">Ra（市川）</Label>
                    <Input
                        type="number"
                        name="ra_i"
                        value={raI}
                        onChange={(e) => setRaI(Number(e.target.value))}
                    />
                </div>

                <div>
                    <Label className="text-xl">Ra（光）</Label>
                    <Input
                        type="number"
                        name="ra_h"
                        value={raH}
                        onChange={(e) => setRaH(Number(e.target.value))}
                    />
                </div>

                {/* 合否 */}
                <div>
                    <Label className="text-xl">合否</Label>
                    <select
                        name="judgement"
                        value={judgement}
                        onChange={(e) => setJudgement(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="○">○</option>
                        <option value="×">×</option>
                    </select>
                </div>

                {/* コメント */}
                <div>
                    <Label className="text-xl">コメント</Label>
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border p-2 rounded w-80 h-24"
                    />
                </div>

                {/* 作業日・時間 */}
                <div>
                    <Label className="text-xl">作業日</Label>
                    <Input
                        type="date"
                        name="operation_date"
                        value={operationDate}
                        onChange={(e) => setOperationDate(e.target.value)}
                    />
                </div>

                <div>
                    <Label className="text-xl">開始時間</Label>
                    <Input
                        type="time"
                        name="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <div>
                    <Label className="text-xl">終了時間</Label>
                    <Input
                        type="time"
                        name="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                {/* 作業者 */}
                <div>
                    <Label className="text-xl">作業者</Label>
                    <select
                        name="operator"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="横内">横内</option>
                        <option value="他">他</option>
                    </select>
                </div>

                {/* 作業組 */}
                <div>
                    <Label className="text-xl">作業組</Label>
                    <select
                        name="operation_group"
                        value={operationGroup}
                        onChange={(e) => setOperationGroup(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                {/* hidden */}
                <input type="hidden" name="id" value={data.id} />

                <Button type="submit" className="bg-blue-500 text-white px-4 py-5 w-full rounded">
                    更新
                </Button>
            </form>
        </div>
    );
}
