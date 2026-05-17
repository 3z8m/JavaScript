//================================================================
// 編集フォーム
// - 数値項目はテンキーで入力する仕様のため、専用の状態管理と入力処理を実装
// - 作業者は外部JSONから取得したリストをセレクトボックスで表示
//   （作業者リストは public/data/operators.json）
//================================================================


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

export default function EditAdminForm({ data, operators }: EditFormProps & { operators: string[] }) {

    const router = useRouter();

    // 各フィールドの初期値
    const [rollId, setRollId] = useState(data.roll_id);
    const [rollType, setRollType] = useState(data.roll_type);
    const [grindingType, setGrindingType] = useState(data.grinding_type);

    const [judgement, setJudgement] = useState(data.judgement);
    const [comment, setComment] = useState(data.comment ?? "");

    const [operationDate, setOperationDate] = useState(data.operation_date);
    const [startTime, setStartTime] = useState(data.start_time);
    const [endTime, setEndTime] = useState(data.end_time);

    const [operator, setOperator] = useState(data.operator);
    const [operationGroup, setOperationGroup] = useState(data.operation_group);
    const [status, setStatus] = useState(data.status);

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

    // 数値項目をまとめて管理（初期値をセット）
    const [values, setValues] = useState({
        grinding_amount: String(data.grinding_amount ?? ""),
        diameter: String(data.diameter ?? ""),
        ra_i: String(data.ra_i ?? ""),
        ra_h: String(data.ra_h ?? "")
    });

    // テンキーで入力する欄と項目
    const [activeField, setActiveField] = useState<
        "grinding_amount" | "diameter" | "ra_i" | "ra_h"
    >("grinding_amount");

    // テンキー押下処理
    const handleKeyPress = (key: string) => {
        setValues(prev => {
            const current = prev[activeField];

            if (key === "DEL") {
                return { ...prev, [activeField]: current.slice(0, -1) };
            }
            return { ...prev, [activeField]: current + key };
        });
    };


    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">管理者編集：{data.roll_id}</h1>

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
                        value={grindingType}
                        onChange={(e) => setGrindingType(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="SD#120">SD#120</option>
                        <option value="SD#600">SD#600</option>
                    </select>
                </div>

                {/* 研削量（テンキー入力） */}
                <div>
                    <Label className="text-xl">研削量</Label>

                    {/* 表示用（直接入力不可） */}
                    <Input
                        type="text"
                        value={values.grinding_amount}
                        readOnly
                        onClick={() => setActiveField("grinding_amount")}
                        className={`text-xl ${
                            activeField === "grinding_amount" ? "border-blue-500 border-2" : ""
                        }`}
                    />

                    {/* フォーム送信用 */}
                    <input type="hidden" name="grinding_amount" value={values.grinding_amount} />
                </div>

                {/* ロール径（テンキー入力） */}
                <div>
                    <Label className="text-xl">ロール径</Label>
                    <Input
                        type="text"
                        value={values.diameter}
                        readOnly
                        onClick={() => setActiveField("diameter")}
                        className={`text-xl ${
                            activeField === "diameter" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="diameter" value={values.diameter} />
                </div>

                {/* Ra（テンキー入力） */}
                <div>
                    <Label className="text-xl">Ra（市川）</Label>
                    <Input
                        type="text"
                        value={values.ra_i}
                        readOnly
                        onClick={() => setActiveField("ra_i")}
                        className={`text-xl ${
                            activeField === "ra_i" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="ra_i" value={values.ra_i} />
                </div>

                {/* Ra（テンキー入力） */}
                <div>
                    <Label className="text-xl">Ra（光）</Label>
                    <Input
                        type="text"
                        value={values.ra_h}
                        readOnly
                        onClick={() => setActiveField("ra_h")}
                        className={`text-xl ${
                            activeField === "ra_h" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="ra_h" value={values.ra_h} />
                </div>

                {/* ▼ 共通テンキー ▼ */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                    {["1","2","3","4","5","6","7","8","9",".","0","DEL"].map(key => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleKeyPress(key)}
                            className="bg-gray-200 py-3 rounded text-xl font-bold"
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* 作業日 */}
                <div>
                    <Label className="text-xl">作業日</Label>
                    <Input
                        type="date"
                        name="operation_date"
                        value={operationDate}
                        onChange={(e) => setOperationDate(e.target.value)}
                    />
                </div>

                {/* 作業開始時間 */}
                <div>
                    <Label className="text-xl">開始時間</Label>
                    <Input
                        type="time"
                        name="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                
                {/* 作業終了時間 */}
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
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        {operators.map((op) => (
                            <option key={op} value={op}>
                                {op}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 作業組 */}
                <div>
                    <Label className="text-xl">作業組</Label>
                    <select
                        name="operation_group"
                        value={operationGroup}
                        onChange={(e) => setOperationGroup(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                {/* 合否 */}
                <div>
                    <Label className="text-xl">合否</Label>
                    <select
                        name="judgement"
                        value={judgement}
                        onChange={(e) => setJudgement(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="OK">OK</option>
                        <option value="NG">NG</option>
                    </select>
                </div>

                {/* コメント */}
                <div>
                    <Label className="text-xl">コメント</Label>
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full h-24"
                    />
                </div>

                {/* ステータス */}
                <div>
                    <Label className="text-xl">ステータス</Label>
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="加工済">加工済</option>
                        <option value="使用中">使用中</option>
                        <option value="使用済">使用済</option>
                        <option value="廃棄">廃棄</option>
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
