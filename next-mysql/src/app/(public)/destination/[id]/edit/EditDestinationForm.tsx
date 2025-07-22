'use client' 

import { useState, useActionState } from "react"; 
import { updateDestination } from "@/lib/destination/actions/update";
import { Button } from "@/components/ui/button";


type EditDestinationFormProps = {
    data: {
        id: string;
        name: string;
        destination: string;
        presence: string;
        lunch: string;
    }
}

const presenceRadioStyle = {
    width: "30px",      // 幅を指定
    height: "30px",     // 高さを指定
    marginRight: "5px"  // ボタンとラベルの間隔
};

const presenceLabelStyle = {
    marginRight: "40px" // ラベル間隔を指定
};

const destinationRadioStyle = {
    width: "20px",
    height: "20px",
    marginRight: "4px"
};

const lunchRadioStyle = {
    width: "20px",
    height: "20px",
    marginRight: "4px"
};

const commonLabelStyle = {
    marginRight: "30px" // ラベル間隔を指定
};


export default function EditDestinationForm({data}: EditDestinationFormProps) {
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
                        出社状況
                    ----------------------------------------------------------------*/}                
                <div className="font-bold text-4xl px-2">
                    <label style={presenceLabelStyle} className="text-blue-800">
                        <input type="radio" name="presence" value="#1e90ff" checked={presence === "#1e90ff"}
                         onChange={(e) => setPresence(e.target.value)} style={presenceRadioStyle}/>
                        出社
                    </label>
                    <label style={presenceLabelStyle} className="text-green-900">
                        <input type="radio" name="presence" value="#008000" checked={presence === "#008000"}
                         onChange={(e) => setPresence(e.target.value)} style={presenceRadioStyle}/>
                        在宅
                    </label>
                    <label style={presenceLabelStyle} className="text-green-600">
                        <input type="radio" name="presence" value="#32cd32" checked={presence === "#32cd32"}
                         onChange={(e) => setPresence(e.target.value)} style={presenceRadioStyle}/>
                        出張
                    </label>                                     
                    <label style={presenceLabelStyle} className="text-gray-600">
                        <input type="radio" name="presence" value="#696969" checked={presence === "#696969"}
                         onChange={(e) => setPresence(e.target.value)} style={presenceRadioStyle}/>
                        不在
                    </label>
                    <label style={presenceLabelStyle} className="text-red-800">
                        <input type="radio" name="presence" value="#dc143c" checked={presence === "#dc143c"}
                         onChange={(e) => setPresence(e.target.value)} style={presenceRadioStyle}/>
                        年休
                    </label>
                    {state.errors.presence && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.presence.join(', ')}
                        </p>
                    )}
                </div>
                <br />
                <hr />
                <br />
                {/* ----------------------------------------------------------------
                        行先 
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="" checked={destination === ""}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        無
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="現場朝会" checked={destination === "現場朝会"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        現場朝会
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="第1工場" checked={destination === "第1工場"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        第1工場
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="第2工場" checked={destination === "第2工場"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        第2工場
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="第1・第2工場" checked={destination === "第1・第2工場"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        第1・第2工場
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="2F会議室" checked={destination === "2F会議室"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        2F会議室
                    </label>
                    <br />
                    <br />                    
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="3F会議室" checked={destination === "3F会議室"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        3F会議室
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="3F事務所" checked={destination === "3F事務所"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        3F事務所
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="µ事務所" checked={destination === "µ事務所"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        µ事務所
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="µ1会議室" checked={destination === "µ1会議室"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        µ1会議室
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="µ2会議室" checked={destination === "µ2会議室"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        µ2会議室
                    </label>
                    <br />
                    <br />   
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="JKルーム" checked={destination === "JKルーム"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        JKルーム
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="HMC" checked={destination === "HMC"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        HMC
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="外出" checked={destination === "外出"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        外出
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="destination" value="その他" checked={destination === "その他"}
                         onChange={(e) => setDestination(e.target.value)} style={destinationRadioStyle}/>
                        その他
                    </label>

                    {state.errors.destination && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.destination.join(', ')}
                        </p>
                    )}
                </div>
                <br />
                <hr />
                <br />
                {/* ----------------------------------------------------------------
                        昼食
                    ----------------------------------------------------------------*/}
                <div className="font-bold text-2xl px-2">
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="" checked={lunch === ""}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        無
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="G" checked={lunch === "G"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        銀柳
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="Gm" checked={lunch === "Gm"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        銀柳ミニ
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="T" checked={lunch === "T"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        徳山
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="Tm" checked={lunch === "Tm"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        徳山ミニ
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="To" checked={lunch === "To"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        徳山おかず
                    </label>
                    <label style={commonLabelStyle}>
                        <input type="radio" name="lunch" value="S" checked={lunch === "S"}
                         onChange={(e) => setLunch(e.target.value)} style={lunchRadioStyle}/>
                        その他
                    </label>
                    
                    {state.errors.lunch && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.lunch.join(', ')}
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
