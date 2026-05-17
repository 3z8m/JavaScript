'use client'

import { useState, useActionState } from "react";
import { updateWorkroll } from "@/lib/workroll/actions/update";
import { Button } from "@/components/ui/button";
import { EditFormProps } from "@/types/workroll";


const LargeRadioStyle = {
    width: "30px",      // 幅を指定
    height: "30px",     // 高さを指定
    marginTop: "5px"    // ボタンとラベルの間隔
};


export default function EditWorkrollForm({ data }: EditFormProps) {

    const [status, setStatus] = useState(data.status ?? "未加工");

    const [state, formAction] = useActionState(updateWorkroll, {
        success: false,
        errors: {}
    });

    // 数値項目をまとめて管理
    const [values, setValues] = useState({
        grinding_amount: "",
        diameter: "",
        ra_i: "",
        ra_h: ""
    });

    // テンキーで入力する項目
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
            <h1 className="text-2xl font-bold mb-4">ワークロール編集</h1>

            <form action={formAction} className="space-y-6 text-center">

                {/* ---------------------------------------------------------
                    ステータス
                --------------------------------------------------------- */}
                <div className="flex flex-row items-center justify-center font-bold text-4xl">
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="status" value="加工済" checked={status === "加工済"} 
                        onChange={(e) => setStatus(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-blue-500 mt-1">加工済</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="status" value="使用中" checked={status === "使用中"} 
                        onChange={(e) => setStatus(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-red-400 mt-1">使用中</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="status" value="使用済" checked={status === "使用済"} 
                        onChange={(e) => setStatus(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-slate-500 mt-1">使用済</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="status" value="廃棄" checked={status === "廃棄"} 
                        onChange={(e) => setStatus(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-gray-300 mt-1">廃棄</span>
                    </div>

                    {state.errors.presence && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.presence.join(', ')}
                        </p>
                    )}
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

                <div>
                    <p className="text-2xl text-gray-500">Ra(市川)：{data.ra_i}</p>
                </div>

                {/* ---------------------------------------------------------
                    更新ボタン
                --------------------------------------------------------- */}
                <Button type="submit" className="bg-blue-500 text-white text-2xl px-4 py-5 w-full h-[90px] rounded">
                    更新
                </Button>

                {/* ---------------------------------------------------------
                    hidden fields
                --------------------------------------------------------- */}
                <input type="hidden" name="id" value={data.id} />
                 <input type="hidden" name="roll_id" value={data.roll_id} />               
                <input type="hidden" name="roll_type" value={data.roll_type} />
                <input type="hidden" name="grinding_type" value={data.grinding_type} /> 
                <input type="hidden" name="grinding_amount" value={data.grinding_amount} />
                <input type="hidden" name="diameter" value={data.diameter} />
                <input type="hidden" name="ra_i" value={data.ra_i ?? ""} />
                <input type="hidden" name="ra_h" value={data.ra_h ?? ""} />           
                <input type="hidden" name="judgement" value={data.judgement} />
                <input type="hidden" name="operation_date" value={data.operation_date} />
                <input type="hidden" name="start_time" value={data.start_time} /> 
                <input type="hidden" name="end_time" value={data.end_time} /> 
                <input type="hidden" name="operator" value={data.operator} />
                <input type="hidden" name="operation_group" value={data.operation_group} />
            </form>
        </div>
    );
}