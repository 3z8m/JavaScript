'use client' 

import { useState, useActionState } from "react"; 
import { updateDestination } from "@/lib/destination/actions/update";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


type EditDestinationFormProps = {
    data: {
        id: string;
        name: string;
        destination: string;
        presence: string;
        lunch: string;
    }
}


const lunchRadioStyle = {
    width: "20px",
    height: "20px",
    marginRight: "4px"
};

const commonLabelStyle = {
    marginRight: "30px" // ラベル間隔を指定
};


export default function EditDestinationAdminForm({data}: EditDestinationFormProps) {
    // フォームの状態を管理
    const [destination, setDestination] = useState("");         // 行先の初期値は"無"
    const [presence, setPresence] = useState(data.presence);    // 在席の初期値は現在の登録値
    const [lunch, setLunch] = useState(data.lunch);             // 昼食の初期値は現在の登録値

    const [state, formAction] = useActionState(updateDestination, {	            // アクションの初期状態
        success: false,
        errors: {}
    })


    return (
        <div className="container mx-auto mt-10">
            <form action={formAction} className="space-y-4 text-center">

                {/* ----------------------------------------------------------------
                        並び順
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">
					<Label htmlFor="order">並び順</Label>
					<Input type="text" id="order" name="order" placeholder="例：0101" /> 
                    {state.errors.order && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.order.join(', ')}
                        </p>
                    )}
                </div>
                {/* ----------------------------------------------------------------
                        列
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">
					<Label htmlFor="row">列</Label>
					<Input type="text" id="row" name="row" placeholder="例：1" /> 
                    {state.errors.row && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.row.join(', ')}
                        </p>
                    )}
                </div>
                <br />
                <hr />
                <br />
                {/* ----------------------------------------------------------------
                        昼食管理要否
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch_default" value="0" checked={lunch === "0"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        否
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch_default" value="1" checked={lunch === "1"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        要
                    </label>
                    
                    {state.errors.lunch_default && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.lunch_default.join(', ')}
                        </p>
                    )}
                </div>
                <br />
                <br />
                <Button type="submit" className="bg-blue-500 text-white px-4 py-5 w-full rounded">
                    更新
                </Button>

                {/* フォームのフィールド */} 
                <input type="hidden" name="id" value={data.id} />
                <input type="hidden" name="name" value={data.name} />
                <input type="hidden" name="lunch" value={data.lunch} />
            </form>
        </div>
    )
}
