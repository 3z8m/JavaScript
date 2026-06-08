//================================================================
// ワークロール新規登録ページ
// - ロールIDと数値項目はテンキーで入力する仕様のため、専用の状態管理と入力処理を実装
// - 停止コード、作業者は外部JSONから取得したリストをセレクトボックスで表示
//   （作業者リストは public/data/operators.json）
// - 登録処理は createWorkroll アクションを呼び出す 
//================================================================


'use client'

import { useActionState, useState, useEffect } from "react";
import { createWorkroll } from "@/lib/workroll/actions/create";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreatePage() {

    // フォームの状態管理
    const [state, formAction] = useActionState(createWorkroll, {
        success: false,
        errors: {}
    });

    // 数値項目をまとめて管理
    const [values, setValues] = useState({
        roll_id: "",
        grinding_amount: "",
        diameter_rg: "",
        diameter_ml: "",
        ra_i: "",
        ra_h: "",
        width: "",
        grinding_number: "",
        processing_time: "",
        non_processing_code1: "",
        non_processing_time1: "",
        non_processing_code2: "",
        non_processing_time2: "",
        non_processing_code3: "",
        non_processing_time3: "",
        non_processing_code4: "",
        non_processing_time4: "",
        non_processing_code5: "",
        non_processing_time5: ""
    });

    // テンキーで入力する項目
    const [activeField, setActiveField] = useState<
        "roll_id" | "grinding_amount" | "diameter_rg" | "diameter_ml" | "ra_i" | "ra_h" | "width" | "grinding_number" |
         "processing_time" | "non_processing_time1" | "non_processing_time2" | "non_processing_time3" | 
         "non_processing_time4" | "non_processing_time5"
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
            <h1 className="text-2xl font-bold mb-4">研削実績登録</h1>

            <form action={formAction} className="space-y-6">

                {/* ロール番号 */}
                <div>
                    <Label htmlFor="roll_id" className="text-xl">ロール番号</Label>
                    <Input
                        type="text"
                        value={values.roll_id}
                        readOnly
                        onClick={() => setActiveField("roll_id")}
                        className={`text-2xl h-[48px] ${activeField === "roll_id" ? "border-blue-500 border-2" : ""}`}
                    />
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
                        <option value="">選択してください</option>
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
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full"
                    >
                        <option value="">選択してください</option> 
                        {grindingTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 研削量（テンキー入力） */}
                <div>
                    <Label htmlFor="grinding_amount" className="text-xl">研削量</Label>
                    <Input
                        type="text"
                        value={values.grinding_amount}
                        readOnly
                        onClick={() => setActiveField("grinding_amount")}
                        className={`text-2xl h-[48px] ${activeField === "grinding_amount" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="grinding_amount" value={values.grinding_amount} />
                </div>

                {/* ロール径（テンキー入力） */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="diameter_rg" className="text-xl">ロール径（RG）</Label>

                        <Input
                            type="text"
                            value={values.diameter_rg}
                            readOnly
                            onClick={() => setActiveField("diameter_rg")}
                            className={`text-2xl h-[48px] ${activeField === "diameter_rg" ? "border-blue-500 border-2" : ""}`}
                        />

                        <input type="hidden" name="diameter_rg" value={values.diameter_rg} />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="diameter_ml" className="text-xl">ロール径（ML）</Label>

                        <Input
                            type="text"
                            value={values.diameter_ml}
                            readOnly
                            onClick={() => setActiveField("diameter_ml")}
                            className={`text-2xl h-[48px] ${activeField === "diameter_ml" ? "border-blue-500 border-2" : ""}`}
                        />

                        <input type="hidden" name="diameter_ml" value={values.diameter_ml} />
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex-1">
                        <Label htmlFor="ra_i" className="text-xl">Ra（市川）</Label>
                        <Input
                            type="text"
                            value={values.ra_i}
                            readOnly
                            onClick={() => setActiveField("ra_i")}
                            className={`text-2xl h-[48px] ${activeField === "ra_i" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="ra_i" value={values.ra_i} />
                    </div>

                    {/* Ra（光）（テンキー入力） */}
                    <div className="flex-1">
                        <Label htmlFor="ra_h" className="text-xl">Ra（光）</Label>
                        <Input
                            type="text"
                            value={values.ra_h}
                            readOnly
                            onClick={() => setActiveField("ra_h")}
                            className={`text-2xl h-[48px] ${activeField === "ra_h" ? "border-blue-500 border-2" : ""}`}
                        />
                        <input type="hidden" name="ra_h" value={values.ra_h} />
                    </div>
                </div>

                {/* 幅（テンキー入力） */}
                <div>
                    <Label htmlFor="width" className="text-xl">幅</Label>
                    <Input
                        type="text"
                        value={values.width}
                        readOnly
                        onClick={() => setActiveField("width")}
                        className={`text-2xl h-[48px] ${activeField === "width" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="width" value={values.width} />
                </div>

                {/* ▼ 共通テンキー ▼ */}
                <div className="grid grid-cols-5 gap-2 mt-3">
                    {["0","1","2","3","4","5","6","7","8","9",".","DEL"].map(key => (
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

                {/* 研削本数（テンキー入力） */}
                <div>
                    <Label htmlFor="grinding_number" className="text-xl">研削本数</Label>
                    <Input
                        type="text"
                        value={values.grinding_number}
                        readOnly
                        onClick={() => setActiveField("grinding_number")}
                        className={`text-2xl h-[48px] ${activeField === "grinding_number" ? "border-blue-500 border-2" : ""}`}
                    />
                    <input type="hidden" name="grinding_number" value={values.grinding_number} />
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
