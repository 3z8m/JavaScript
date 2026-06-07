//================================================================
// 編集フォーム
// - 数値項目はテンキーで入力する仕様のため、専用の状態管理と入力処理を実装
// - 作業者は外部JSONから取得したリストをセレクトボックスで表示
//   （作業者リストは public/data/operators.json）
//================================================================


'use client'

import { useState, useEffect, useActionState } from "react";
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

    // 各フィールドの初期値（選択項目）
    const [rollType, setRollType] = useState(data.roll_type);
    const [grindingType, setGrindingType] = useState(data.grinding_type);
    const [judgement, setJudgement] = useState(data.judgement);
    const [comment, setComment] = useState(data.comment ?? "");

    const [operationDate, setOperationDate] = useState(data.operation_date ?? "");
    const [grindingNumber, setGrindingNumber] = useState(data.grinding_number ?? "");
    const [nonProcessingCode1, setNonProcessingCode1] = useState(data.non_processing_code1 ?? "");
    const [nonProcessingCode2, setNonProcessingCode2] = useState(data.non_processing_code2 ?? "");
    const [nonProcessingCode3, setNonProcessingCode3] = useState(data.non_processing_code3 ?? "");
    const [nonProcessingCode4, setNonProcessingCode4] = useState(data.non_processing_code4 ?? "");
    const [nonProcessingCode5, setNonProcessingCode5] = useState(data.non_processing_code5 ?? "");

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

    // テンキー項目はすべて values に統合
    const [values, setValues] = useState({
        roll_id: String(data.roll_id ?? ""),
        grinding_amount: String(data.grinding_amount ?? ""),
        diameter_rg: String(data.diameter_rg ?? ""),
        diameter_ml: String(data.diameter_ml ?? ""),
        width: String(data.width ?? ""),
        ra_i: String(data.ra_i ?? ""),
        ra_h: String(data.ra_h ?? ""),
        grinding_number: String(data.grinding_number ?? ""),
        processing_time: String(data.processing_time ?? ""),
        non_processing_time1: String(data.non_processing_time1 ?? ""),
        non_processing_time2: String(data.non_processing_time2 ?? ""),
        non_processing_time3: String(data.non_processing_time3 ?? ""),
        non_processing_time4: String(data.non_processing_time4 ?? ""),
        non_processing_time5: String(data.non_processing_time5 ?? ""),
    });

    // テンキーで入力する欄と項目
    const [activeField, setActiveField] = useState<
        "roll_id" | "grinding_amount" | "diameter_rg" | "diameter_ml" | "width" | "ra_i" | "ra_h" | "grinding_number" |
         "processing_time" | "non_processing_time1" | "non_processing_time2" | "non_processing_time3" | "non_processing_time4" | "non_processing_time5"
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

    // 砥石種リストの状態管理
    const [grindingTypes, setGrindingTypes] = useState<string[]>([]);

    useEffect(() => {
        const loadGrindingTypes = async () => {
            const res = await fetch("/data/grinding_type.json");
            const data = await res.json();
            setGrindingTypes(data.grinding_types);
        };
        loadGrindingTypes();
    }, []);


    // 停止コードリストの状態管理
    const [nonProcessingCodes, setNonProcessingCodes] = useState<{ code: string; label: string }[]>([]);

    useEffect(() => {
        const loadNonProcessingCodes = async () => {
            const res = await fetch("/data/non_processing_code.json");
            const data = await res.json();
            setNonProcessingCodes(data);
        };
        loadNonProcessingCodes();
    }, []);

    
    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">管理者編集：{data.roll_id}</h1>

            <form action={formAction} className="space-y-6 text-center">

                {/* ロール番号 */}
                <div>
                    <Label htmlFor="roll_id" className="text-xl">ロール番号</Label>

                    {/* 表示用（直接入力不可） */}
                    <Input
                        type="text"
                        value={values.roll_id}
                        readOnly
                        onClick={() => setActiveField("roll_id")}
                        className={`text-2xl h-[48px] ${
                            activeField === "roll_id" ? "border-blue-500 border-2" : ""
                        }`}
                    />

                    {/* フォーム送信用 */}
                    <input type="hidden" name="roll_id" value={values.roll_id} />
                </div>

                {/* ロール種 */}
                <div>
                    <Label htmlFor="roll_type" className="text-xl">ロール種</Label>
                    <select
                        id="roll_type"
                        name="roll_type"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value={rollType}>{rollType}</option>
                        <option value="">-----</option>
                        <option value="φ30">φ30</option>
                        <option value="φ40">φ40</option>
                        <option value="φ50">φ50</option>
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
                        <option value={grindingType}>{grindingType}</option>                        
                        {grindingTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
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
                        className={`text-2xl h-[48px] ${
                            activeField === "grinding_amount" ? "border-blue-500 border-2" : ""
                        }`}
                    />

                    {/* フォーム送信用 */}
                    <input type="hidden" name="grinding_amount" value={values.grinding_amount} />
                </div>

                {/* ロール径(RG)（テンキー入力） */}
                <div>
                    <Label className="text-xl">ロール径(RG)</Label>
                    <Input
                        type="text"
                        value={values.diameter_rg}
                        readOnly
                        onClick={() => setActiveField("diameter_rg")}
                        className={`text-2xl h-[48px] ${
                            activeField === "diameter_rg" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="diameter_rg" value={values.diameter_rg} />
                </div>

                {/* ロール径(ML)（テンキー入力） */}
                <div>
                    <Label className="text-xl">ロール径(ML)</Label>
                    <Input
                        type="text"
                        value={values.diameter_ml}
                        readOnly
                        onClick={() => setActiveField("diameter_ml")}
                        className={`text-2xl h-[48px] ${
                            activeField === "diameter_ml" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="diameter_ml" value={values.diameter_ml} />
                </div>

                {/* 幅（テンキー入力） */}
                <div>
                    <Label className="text-xl">幅</Label>
                    <Input
                        type="text"
                        value={values.width}
                        readOnly
                        onClick={() => setActiveField("width")}
                        className={`text-2xl h-[48px] ${
                            activeField === "width" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="width" value={values.width} />
                </div>

                {/* Ra（テンキー入力） */}
                <div>
                    <Label className="text-xl">Ra（市川）</Label>
                    <Input
                        type="text"
                        value={values.ra_i}
                        readOnly
                        onClick={() => setActiveField("ra_i")}
                        className={`text-2xl h-[48px] ${
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
                        className={`text-2xl h-[48px] ${
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
                            className="bg-gray-200 py-3 rounded text-2xl font-bold"
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* ▼ アルファベットキーボード ▼ */}
                <div className="grid grid-cols-6 gap-2 mt-3">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(key => (
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

                {/* 研削回数 */}
                <div>
                    <Label className="text-xl">研削回数</Label>
                    <Input
                        type="text"
                        name="grinding_number"
                        value={grindingNumber}
                        onChange={(e) => setGrindingNumber(e.target.value)}
                    />
                </div>

                {/* 加工時間 */}
                <div>
                    <Label className="text-xl">加工時間（分）</Label>
                    <Input
                        type="text"
                        name="processing_time"
                        value={values.processing_time}
                        readOnly
                        onClick={() => setActiveField("processing_time")}
                    />
                </div>

                {/* 休止コード1・休止時間1（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">休止コード1</Label>
                        <select
                            id="non_processing_code1"
                            name="non_processing_code1"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value={nonProcessingCode1}>{nonProcessingCode1}</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">休止時間1（分）</Label>
                        <Input
                            type="text"
                            name="non_processing_time1"
                            value={values.non_processing_time1}
                            readOnly
                            onClick={() => setActiveField("non_processing_time1")}
                            className={`border p-2 text-xl w-full h-[48px] ${
                                activeField === "non_processing_time1" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                    </div>
                </div>

                {/* 休止コード2・休止時間2（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">休止コード2</Label>
                        <select
                            id="non_processing_code2"
                            name="non_processing_code2"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value={nonProcessingCode2}>{nonProcessingCode2}</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">休止時間2（分）</Label>
                        <Input
                            type="text"
                            name="non_processing_time2"
                            value={values.non_processing_time2}
                            readOnly
                            onClick={() => setActiveField("non_processing_time2")}
                            className={`border p-2 text-xl w-full h-[48px] ${
                                activeField === "non_processing_time2" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                    </div>
                </div>

                {/* 休止コード3・休止時間3（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">休止コード3</Label>
                        <select
                            id="non_processing_code3"
                            name="non_processing_code3"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value={nonProcessingCode3}>{nonProcessingCode3}</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">休止時間3（分）</Label>
                        <Input
                            type="text"
                            name="non_processing_time3"
                            value={values.non_processing_time3}
                            readOnly
                            onClick={() => setActiveField("non_processing_time3")}
                            className={`border p-2 text-xl w-full h-[48px] ${
                                activeField === "non_processing_time3" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                    </div>
                </div>

                {/* 休止コード4・休止時間4（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">休止コード4</Label>
                        <select
                            id="non_processing_code4"
                            name="non_processing_code4"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value={nonProcessingCode4}>{nonProcessingCode4}</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">休止時間4（分）</Label>
                        <Input
                            type="text"
                            name="non_processing_time4"
                            value={values.non_processing_time4}
                            readOnly
                            onClick={() => setActiveField("non_processing_time4")}
                            className={`border p-2 text-xl w-full h-[48px] ${
                                activeField === "non_processing_time4" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                    </div>
                </div>

                {/* 休止コード5・休止時間5（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">休止コード5</Label>
                        <select
                            id="non_processing_code5"
                            name="non_processing_code5"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value={nonProcessingCode5}>{nonProcessingCode5}</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">休止時間5（分）</Label>
                        <Input
                            type="text"
                            name="non_processing_time5"
                            value={values.non_processing_time5}
                            readOnly
                            onClick={() => setActiveField("non_processing_time5")}
                            className={`border p-2 text-xl w-full h-[48px] ${
                                activeField === "non_processing_time5" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                    </div>
                </div>


                {/* 作業者/作業組 */}
                <div className="flex gap-6">
                    <div className="flex-1">
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

                    <div className="flex-1">
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

                <Button type="submit" className="bg-blue-500 text-white text-lg px-4 py-2 w-full h-[60px] rounded">
                    更新
                </Button>
            </form>
        </div>
    );
}
