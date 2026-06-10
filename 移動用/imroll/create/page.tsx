//================================================================
// 中間ロール新規登録ページ
// - ロールIDと数値項目はテンキーで入力する仕様のため、専用の状態管理と入力処理を実装
// - 停止コード、作業者は外部JSONから取得したリストをセレクトボックスで表示
//   （作業者リストは public/data/operators.json）
// - 登録処理は createImroll アクションを呼び出す 
//================================================================


'use client'

import { useActionState, useState, useEffect } from "react";
import { createImroll } from "@/lib/imroll/actions/create";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreatePage() {

    // フォームの状態管理
    const [state, formAction] = useActionState(createImroll, {
        success: false,
        errors: {}
    });

    // 数値項目をまとめて管理
    const [values, setValues] = useState({
        imr_id: "",
        cylindricity1: "",
        cylindricity2: "",
        cylindricity3: "",
        cylindricity4: "",
        cylindricity5: "",
        pair_diff: "",
        imr_diameter_before: "",
        imr_diameter_after: "",
        grinding_amount: "",
        imr_ra: "",
        processing_time: "",
        non_processing_time1: "",
        non_processing_time2: "",
        non_processing_time3: "",
        non_processing_time4: "",
        non_processing_time5: ""
    });

    // テンキーで入力する項目
    const [activeField, setActiveField] = useState<
        "imr_id" | "cylindricity1" | "cylindricity2" | "cylindricity3" | "cylindricity4" | "cylindricity5" | "pair_diff" | "imr_diameter_before" | "imr_diameter_after" | "imr_ra" |
         "processing_time" | "non_processing_time1" | "non_processing_time2" | "non_processing_time3" | 
         "non_processing_time4" | "non_processing_time5"
    >("cylindricity1");

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


    // IMRテーパーコードの状態管理
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


    // 作業者リストの状態管理
    const [operators, setOperators] = useState<string[]>([]);

    useEffect(() => {
        const loadOperators = async () => {
            const res = await fetch("/data/operators.json");
            const data = await res.json();
            setOperators(data.operators);
        };
        loadOperators();
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
            <h1 className="text-2xl font-bold mb-4">中間ロール研削実績登録</h1>

            <form action={formAction} className="space-y-6">

                {/* ロール番号 */}
                <div>
                    <Label htmlFor="imr_id" className="text-xl">中間ロール番号</Label>
                    <Input
                        type="text"
                        value={values.imr_id}
                        readOnly
                        onClick={() => setActiveField("imr_id")}
                        className={`text-2xl h-[48px] ${activeField === "imr_id" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="imr_id" value={values.imr_id} />
                </div>

                {/* テーパーコード */}
                <div>
                    <Label htmlFor="taper_code" className="text-xl">テーパーコード</Label>
                    <select
                        id="taper_code"
                        name="taper_code"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="">選択してください</option> 
                        {imrTaperCodes.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                </div>

                {/* IMRセットコード */}
                <div>
                    <Label htmlFor="imr_set_code" className="text-xl">IMRセットコード</Label>
                    <select
                        id="imr_set_code"
                        name="imr_set_code"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="">選択してください</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                {/* 円筒度1（テンキー入力） */}
                <div>
                    <Label htmlFor="cylindricity1" className="text-xl">円筒度1</Label>
                    <Input
                        type="text"
                        value={values.cylindricity1}
                        readOnly
                        onClick={() => setActiveField("cylindricity1")}
                        className={`text-2xl h-[48px] ${activeField === "cylindricity1" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="cylindricity1" value={values.cylindricity1} />
                </div>

                {/* 円筒度2（テンキー入力） */}
                <div>
                    <Label htmlFor="cylindricity2" className="text-xl">円筒度2</Label>
                    <Input
                        type="text"
                        value={values.cylindricity2}
                        readOnly
                        onClick={() => setActiveField("cylindricity2")}
                        className={`text-2xl h-[48px] ${activeField === "cylindricity2" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="cylindricity2" value={values.cylindricity2} />
                </div>

                {/* 円筒度3（テンキー入力） */}
                <div>
                    <Label htmlFor="cylindricity3" className="text-xl">円筒度3</Label>
                    <Input
                        type="text"
                        value={values.cylindricity3}
                        readOnly
                        onClick={() => setActiveField("cylindricity3")}
                        className={`text-2xl h-[48px] ${activeField === "cylindricity3" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="cylindricity3" value={values.cylindricity3} />
                </div>

                {/* 円筒度4（テンキー入力） */}
                <div>
                    <Label htmlFor="cylindricity4" className="text-xl">円筒度4</Label>
                    <Input
                        type="text"
                        value={values.cylindricity4}
                        readOnly
                        onClick={() => setActiveField("cylindricity4")}
                        className={`text-2xl h-[48px] ${activeField === "cylindricity4" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="cylindricity4" value={values.cylindricity4} />
                </div>

                {/* 円筒度5（テンキー入力） */}
                <div>
                    <Label htmlFor="cylindricity5" className="text-xl">円筒度5</Label>
                    <Input
                        type="text"
                        value={values.cylindricity5}
                        readOnly
                        onClick={() => setActiveField("cylindricity5")}
                        className={`text-2xl h-[48px] ${activeField === "cylindricity5" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="cylindricity5" value={values.cylindricity5} />
                </div>

                {/* ペア差（テンキー入力） */}
                <div>
                    <Label htmlFor="pair_diff" className="text-xl">ペア差</Label>
                    <Input
                        type="text"
                        value={values.pair_diff}
                        readOnly
                        onClick={() => setActiveField("pair_diff")}
                        className={`text-2xl h-[48px] ${activeField === "pair_diff" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="pair_diff" value={values.pair_diff} />
                </div>

                {/* 直径（研削前）（テンキー入力） */}
                <div>
                    <Label htmlFor="imr_diameter_before" className="text-xl">直径（研削前）</Label>
                    <Input
                        type="text"
                        value={values.imr_diameter_before}
                        readOnly
                        onClick={() => setActiveField("imr_diameter_before")}
                        className={`text-2xl h-[48px] ${activeField === "imr_diameter_before" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="imr_diameter_before" value={values.imr_diameter_before} />
                </div>

                {/* 直径（研削後）（テンキー入力） */}
                <div>
                    <Label htmlFor="imr_diameter_after" className="text-xl">直径（研削後）</Label>
                    <Input
                        type="text"
                        value={values.imr_diameter_after}
                        readOnly
                        onClick={() => setActiveField("imr_diameter_after")}
                        className={`text-2xl h-[48px] ${activeField === "imr_diameter_after" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="imr_diameter_after" value={values.imr_diameter_after} />
                </div>

                {/* 研削量（自動計算） */}
                <div>
                    <Label htmlFor="grinding_amount" className="text-xl">研削量</Label>
                    <Input
                        type="text"
                        value={values.grinding_amount}
                        readOnly
                        className="text-2xl h-[48px] bg-gray-100"
                    />
                    <input type="hidden" name="grinding_amount" value={values.grinding_amount} />
                </div>

                {/* 研削種類 */}
                <div>
                    <Label htmlFor="grinding_type" className="text-xl">研削種類</Label>
                    <select
                        id="grinding_type"
                        name="grinding_type"
                        className="border p-2 text-xl flex-1"
                    >
                        <option value="">選択してください</option>
                        <option value="GC#180">GC#180</option>
                        <option value="その他">その他</option>
                    </select>
                </div>

                {/* IMR Ra（テンキー入力） */}
                <div className="flex-1">
                    <Label htmlFor="imr_ra" className="text-xl">Ra</Label>
                    <Input
                        type="text"
                        value={values.imr_ra}
                        readOnly
                        onClick={() => setActiveField("imr_ra")}
                        className={`text-2xl h-[48px] ${activeField === "imr_ra" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="imr_ra" value={values.imr_ra} />
                </div>

                {/* ▼ 共通テンキー ▼ */}
                <div className="grid grid-cols-5 gap-2 mt-3">
                    {["0","1","2","3","4","5","6","7","8","9",".","-","DEL"].map(key => (
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
                            className="bg-gray-200 py-3 rounded text-2xl font-bold"
                        >
                        {key}
                        </button>
                    ))}
                </div>

                {/* 作業日・時間 */}
                <div>
                    <Label htmlFor="operation_date" className="text-xl">作業日</Label>
                    <Input type="date" id="operation_date" name="operation_date" />
                </div>

                {/* 加工時間（テンキー入力） */}
                <div>
                    <Label htmlFor="processing_time" className="text-xl">加工時間（分）</Label>
                    <Input
                        type="text"
                        value={values.processing_time}
                        readOnly
                        onClick={() => setActiveField("processing_time")}
                        className={`text-2xl h-[48px] ${activeField === "processing_time" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="processing_time" value={values.processing_time} />
                </div>

                {/* 休止コード1・休止時間1（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="non_processing_code1" className="text-xl">休止コード1</Label>
                        <select
                            id="non_processing_code1"
                            name="non_processing_code1"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="non_processing_time1" className="text-xl">休止時間1（分）</Label>
                        <Input
                            type="text"
                            value={values.non_processing_time1}
                            readOnly
                            onClick={() => setActiveField("non_processing_time1")}
                            className={`text-2xl h-[48px] ${activeField === "non_processing_time1" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="non_processing_time1" value={values.non_processing_time1} />
                    </div>
                </div>

                {/* 休止コード2・休止時間2（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="non_processing_code2" className="text-xl">休止コード2</Label>
                        <select
                            id="non_processing_code2"
                            name="non_processing_code2"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="non_processing_time2" className="text-xl">休止時間2（分）</Label>
                        <Input
                            type="text"
                            value={values.non_processing_time2}
                            readOnly
                            onClick={() => setActiveField("non_processing_time2")}
                            className={`text-2xl h-[48px] ${activeField === "non_processing_time2" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="non_processing_time2" value={values.non_processing_time2} />
                    </div>
                </div>

                {/* 休止コード3・休止時間3（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="non_processing_code3" className="text-xl">休止コード3</Label>
                        <select
                            id="non_processing_code3"
                            name="non_processing_code3"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="non_processing_time3" className="text-xl">休止時間3（分）</Label>
                        <Input
                            type="text"
                            value={values.non_processing_time3}
                            readOnly
                            onClick={() => setActiveField("non_processing_time3")}
                            className={`text-2xl h-[48px] ${activeField === "non_processing_time3" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="non_processing_time3" value={values.non_processing_time3} />
                    </div>
                </div>

                {/* 休止コード4・休止時間4（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="non_processing_code4" className="text-xl">休止コード4</Label>
                        <select
                            id="non_processing_code4"
                            name="non_processing_code4"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="non_processing_time4" className="text-xl">休止時間4（分）</Label>
                        <Input
                            type="text"
                            value={values.non_processing_time4}
                            readOnly
                            onClick={() => setActiveField("non_processing_time4")}
                            className={`text-2xl h-[48px] ${activeField === "non_processing_time4" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="non_processing_time4" value={values.non_processing_time4} />
                    </div>
                </div>

                {/* 休止コード5・休止時間5（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="non_processing_code5" className="text-xl">休止コード5</Label>
                        <select
                            id="non_processing_code5"
                            name="non_processing_code5"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option>                        
                            {nonProcessingCodes.map((code) => (
                                <option key={code.code} value={code.code}>
                                    {code.code}：{code.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="non_processing_time5" className="text-xl">休止時間5（分）</Label>
                        <Input
                            type="text"
                            value={values.non_processing_time5}
                            readOnly
                            onClick={() => setActiveField("non_processing_time5")}
                            className={`text-2xl h-[48px] ${activeField === "non_processing_time5" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="non_processing_time5" value={values.non_processing_time5} />
                    </div>
                </div>

                {/* 作業者/作業組 */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="operator" className="text-xl">作業者</Label>
                        <select
                            id="operator"
                            name="operator"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option> 
                            {operators.map((op) => (
                                <option key={op} value={op}>
                                    {op}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="operation_group" className="text-xl">作業組</Label>
                        <select
                            id="operation_group"
                            name="operation_group"
                            className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                        >
                            <option value="">選択してください</option> 
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                </div>

                {/* 合否 */}
                <div>
                    <Label htmlFor="judgement" className="text-xl">合否</Label>
                    <select
                        id="judgement"
                        name="judgement"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="">選択してください</option>
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

                {/* ステータス */}
                <div>
                    <Label htmlFor="status" className="text-xl">ステータス</Label>
                    <select
                        id="status"
                        name="status"
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="加工済">加工済</option>
                        <option value="使用中">使用中</option>
                        <option value="使用済">使用済</option>
                        <option value="廃棄">廃棄</option>
                    </select>
                </div>

                {/* 成功・エラー表示 */}
                {state.success && <p className="text-green-600">登録完了！</p>}
                {Object.keys(state.errors).length > 0 && (
                    <p className="text-red-600">登録時にエラーが発生しました</p>
                )}

                <Button type="submit" className="bg-blue-500 text-white text-lg px-4 py-2 w-full h-[60px] rounded">
                    登録
                </Button>
            </form>
        </div>
    );
}
