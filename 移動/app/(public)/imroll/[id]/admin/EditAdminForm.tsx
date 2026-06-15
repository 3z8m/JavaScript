//================================================================
// 編集フォーム
// - 数値項目はテンキーで入力する仕様のため、専用の状態管理と入力処理を実装
// - 作業者は外部JSONから取得したリストをセレクトボックスで表示
//   （作業者リストは public/data/operators.json）
//================================================================


'use client'

import { useState, useEffect, useActionState } from "react";
import { forceUpdate } from "@/lib/imroll/actions/update";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { EditImrollFormProps } from "@/types/imroll";
import { Keypad } from "@/components/Keypad";


type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export default function EditAdminForm({ data, operators }: EditImrollFormProps & { operators: string[] }) {

    const router = useRouter();

    // 各フィールドの初期値（選択項目）
    const [taperCode, setTaperCode] = useState(data.taper_code);
    const [imrSetCode, setImrSetCode] = useState(data.imr_set_code);

    const [grindingType, setGrindingType] = useState(data.grinding_type);
    const [judgement, setJudgement] = useState(data.judgement);
    const [comment, setComment] = useState(data.comment ?? "");

    const [operationDate, setOperationDate] = useState(data.operation_date ?? "");
    const [nonProcessingCode1, setNonProcessingCode1] = useState(data.non_processing_code1 ?? "");
    const [nonProcessingCode2, setNonProcessingCode2] = useState(data.non_processing_code2 ?? "");
    const [nonProcessingCode3, setNonProcessingCode3] = useState(data.non_processing_code3 ?? "");
    const [nonProcessingCode4, setNonProcessingCode4] = useState(data.non_processing_code4 ?? "");
    const [nonProcessingCode5, setNonProcessingCode5] = useState(data.non_processing_code5 ?? "");

    const [operator, setOperator] = useState(data.operator);
    const [operationGroup, setOperationGroup] = useState(data.operation_group);
    const [status, setStatus] = useState(data.status);

    // フォーム送信処理
    const [state, formAction] = useActionState(
        async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
            const result = await forceUpdate(prevState, formData);
            if (result.success) {
                router.push('/imroll/list');
            }
            return result;
        },
        { success: false, errors: {} }
    );

    // テンキー項目はすべて values に統合
    const [values, setValues] = useState({
        imr_id: String(data.imr_id ?? ""),
        cylindricity1: String(data.cylindricity1 ?? ""),
        cylindricity2: String(data.cylindricity2 ?? ""),
        cylindricity3: String(data.cylindricity3 ?? ""),
        cylindricity4: String(data.cylindricity4 ?? ""),
        cylindricity5: String(data.cylindricity5 ?? ""),
        pair_diff: String(data.pair_diff ?? ""),
        imr_diameter_before: String(data.imr_diameter_before ?? ""),
        imr_diameter_after: String(data.imr_diameter_after ?? ""),
        grinding_amount: String(data.grinding_amount ?? ""),
        imr_ra: String(data.imr_ra ?? ""),
        processing_time: String(data.processing_time ?? ""),
        non_processing_time1: String(data.non_processing_time1 ?? ""),
        non_processing_time2: String(data.non_processing_time2 ?? ""),
        non_processing_time3: String(data.non_processing_time3 ?? ""),
        non_processing_time4: String(data.non_processing_time4 ?? ""),
        non_processing_time5: String(data.non_processing_time5 ?? ""),
    });

    // テンキーで入力する欄と項目
    const [activeField, setActiveField] = useState<
        "imr_id" |"cylindricity1" | "cylindricity2" | "cylindricity3" | "cylindricity4" | "cylindricity5" 
        | "pair_diff" | "imr_diameter_before" | "imr_diameter_after" | "grinding_amount" | "imr_ra" 
        | "processing_time" | "non_processing_time1" | "non_processing_time2" | "non_processing_time3" | "non_processing_time4" | "non_processing_time5"
    >("grinding_amount");

    // テンキー押下処理
    /*
    const handleKeyPress = (key: string) => {
        setValues(prev => {
            const current = prev[activeField];

            if (key === "DEL") {
                return { ...prev, [activeField]: current.slice(0, -1) };
            }
            return { ...prev, [activeField]: current + key };
        });
    };
    */

    // テンキー押下処理（研削量は加工前径 - 加工後径で自動計算するため、updateValue関数内で処理）
    const handleKeyPress = (key: string) => {
        const current = values[activeField];

        if (key === "DEL") {
            const newValue = current.slice(0, -1);
            updateValue(activeField, newValue);
            return;
        }

        const newValue = current + key;
        updateValue(activeField, newValue);
    };

    
    // テーパーコードの状態管理
    const [imrTaperCodes, setImrTaperCodes] = useState<string[]>([]);

    useEffect(() => {
        const loadImrTaperCodes = async () => {
            const res = await fetch("/data/imr_taper_code.json");
            const data = await res.json();
            setImrTaperCodes(data.imr_taper_codes);
        };
        loadImrTaperCodes();
    }, []);


    // 研削量(grinding_amount)の入力変更ハンドラ
    const updateValue = (field: string, value: string) => {
        setValues(prev => {
            const updated = { ...prev, [field]: value };

            const before = Number(updated.imr_diameter_before);
            const after = Number(updated.imr_diameter_after);

            if (!isNaN(before) && !isNaN(after)) {
                const raw = before - after;
                updated.grinding_amount = Number(raw.toFixed(3)).toString();
            }

            return updated;
        });
    };


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
            <h1 className="text-2xl font-bold mb-4">管理者編集：{data.imr_id}</h1>

            <form action={formAction} className="space-y-6 text-center">

                {/* ロール番号 */}
                <div>
                    <Label htmlFor="imr_id" className="text-xl">IMR番号</Label>

                    {/* 表示用（直接入力不可） */}
                    <Input
                        type="text"
                        value={values.imr_id}
                        readOnly
                        onClick={() => setActiveField("imr_id")}
                        className={`text-xl h-[48px] ${
                            activeField === "imr_id" ? "border-blue-500 border-2" : ""
                        }`}
                    />

                    {/* フォーム送信用 */}
                    <input type="hidden" name="imr_id" value={values.imr_id} />
                </div>

                {/* テーパーコード */}
                <div>
                    <Label htmlFor="taper_code" className="text-xl">テーパーコード</Label>
                    <select
                        id="taper_code"
                        name="taper_code"
                        value={taperCode}
                        onChange={(e) => setTaperCode(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value={taperCode}>{taperCode}</option>                        
                        {imrTaperCodes.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                </div>

                {/* IMRセット番号 */}
                <div>
                    <Label htmlFor="imr_set_code" className="text-xl">IMRセット番号</Label>
                    <select
                        id="imr_set_code"
                        name="imr_set_code"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value={imrSetCode}>{imrSetCode}</option>
                        <option value="">-----</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="未定">未定</option>
                    </select>
                </div>

                {/* 円筒度 */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">円筒度1</Label>

                        {/* 表示用（直接入力不可） */}
                        <Input
                            type="text"
                            value={values.cylindricity1}
                            readOnly
                            onClick={() => setActiveField("cylindricity1")}
                            className={`text-xl h-[48px] ${
                                activeField === "cylindricity1" ? "border-blue-500 border-2" : ""
                            }`}
                        />

                        {/* フォーム送信用 */}
                        <input type="hidden" name="cylindricity1" value={values.cylindricity1} />
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">円筒度2</Label>
                        <Input
                            type="text"
                            value={values.cylindricity2}
                            readOnly
                            onClick={() => setActiveField("cylindricity2")}
                            className={`text-2xl h-[48px] ${
                                activeField === "cylindricity2" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                        <input type="hidden" name="cylindricity2" value={values.cylindricity2} />
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">円筒度3</Label>
                        <Input
                            type="text"
                            value={values.cylindricity3}
                            readOnly
                            onClick={() => setActiveField("cylindricity3")}
                            className={`text-2xl h-[48px] ${
                                activeField === "cylindricity3" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                        <input type="hidden" name="cylindricity3" value={values.cylindricity3} />
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">円筒度4</Label>
                        <Input
                            type="text"
                            value={values.cylindricity4}
                            readOnly
                            onClick={() => setActiveField("cylindricity4")}
                            className={`text-2xl h-[48px] ${
                                activeField === "cylindricity4" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                        <input type="hidden" name="cylindricity4" value={values.cylindricity4} />
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">円筒度5</Label>
                        <Input
                            type="text"
                            value={values.cylindricity5}
                            readOnly
                            onClick={() => setActiveField("cylindricity5")}
                            className={`text-2xl h-[48px] ${
                                activeField === "cylindricity5" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                        <input type="hidden" name="cylindricity5" value={values.cylindricity5} />
                    </div>
                </div>

                {/* ペア差 */}
                <div>
                    <Label className="text-xl">ペア差</Label>

                    {/* 表示用（直接入力不可） */}
                    <Input
                        type="text"
                        value={values.pair_diff}
                        readOnly
                        onClick={() => setActiveField("pair_diff")}
                        className={`text-2xl h-[48px] ${
                            activeField === "pair_diff" ? "border-blue-500 border-2" : ""
                        }`}
                    />

                    {/* フォーム送信用 */}
                    <input type="hidden" name="pair_diff" value={values.pair_diff} />
                </div>

                {/* 直径（研削前・研削後） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">直径（研削前）</Label>

                        {/* 表示用（直接入力不可） */}
                        <Input
                            type="text"
                            value={values.imr_diameter_before}
                            readOnly
                            onClick={() => setActiveField("imr_diameter_before")}
                            className={`text-2xl h-[48px] ${
                                activeField === "imr_diameter_before" ? "border-blue-500 border-2" : ""
                            }`}
                        />

                        {/* フォーム送信用 */}
                        <input type="hidden" name="imr_diameter_before" value={values.imr_diameter_before} />
                    </div>

                    <div className="flex-1">
                        <Label className="text-xl">直径（研削後）</Label>
                        <Input
                            type="text"
                            value={values.imr_diameter_after}
                            readOnly
                            onClick={() => setActiveField("imr_diameter_after")}
                            className={`text-2xl h-[48px] ${
                                activeField === "imr_diameter_after" ? "border-blue-500 border-2" : ""
                            }`}
                        />
                        <input type="hidden" name="imr_diameter_after" value={values.imr_diameter_after} />
                    </div>

                    {/* 研削量（自動計算） */}
                    <div className="flex-1">
                        <Label className="text-xl">研削量</Label>
                        <Input
                            type="text"
                            value={values.grinding_amount}
                            readOnly
                            className="text-2xl h-[48px] bg-gray-100"
                        />
                        <input type="hidden" name="grinding_amount" value={values.grinding_amount} />
                    </div>
                </div>


                {/* IMR Ra（テンキー入力） */}
                <div>
                    <Label className="text-xl">IMR Ra</Label>
                    <Input
                        type="text"
                        value={values.imr_ra}
                        readOnly
                        onClick={() => setActiveField("imr_ra")}
                        className={`text-2xl h-[48px] ${
                            activeField === "imr_ra" ? "border-blue-500 border-2" : ""
                        }`}
                    />
                    <input type="hidden" name="imr_ra" value={values.imr_ra} />
                </div>


                {/* ▼ 共通テンキー ▼ */}
                <Keypad onPress={handleKeyPress} />

                {/* 作業日 */}
                <div>
                    <Label className="text-xl">作業日</Label>
                    <Input
                        type="date"
                        name="operation_date"
                        value={operationDate}
                        onChange={(e) => setOperationDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full h-[48px]"
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
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full h-[48px]"
                    />
                </div>

                {/* 休止コード1・休止時間1（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label className="text-xl">休止コード1</Label>
                        <select
                            id="non_processing_code1"
                            name="non_processing_code1"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full h-[48px]"
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
