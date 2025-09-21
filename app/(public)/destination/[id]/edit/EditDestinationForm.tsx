'use client' 

import { useState, useActionState } from "react"; 
import { updateDestination } from "@/lib/destination/actions/update";
import { Button } from "@/components/ui/button";
import { EditFormProps } from "@/types/destination";


const LargeRadioStyle = {
    width: "30px",      // 幅を指定
    height: "30px",     // 高さを指定
    marginTop: "5px"  // ボタンとラベルの間隔
};

const SmallRadioStyle = {
    width: "25px",
    height: "25px",
    marginTop: "4px"
};


export default function EditDestinationForm({data}: EditFormProps) {
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
            <h1 className="text-4xl text-center">こんにちは！{data.name}さん</h1>
            <br />
            <br />
            <form action={formAction} className="space-y-4 text-center">
                {/* ----------------------------------------------------------------
                        出社状況
                    ----------------------------------------------------------------*/}                
                <div className="flex flex-row items-center justify-center font-bold text-4xl">
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="presence" value="#0030E0" checked={presence === "#0030E0"} 
                        onChange={(e) => setPresence(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-blue-800 mt-1">出社</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="presence" value="#228822" checked={presence === "#228822"} 
                        onChange={(e) => setPresence(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-green-700 mt-1">在宅</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="presence" value="#D030D0" checked={presence === "#D030D0"} 
                        onChange={(e) => setPresence(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-purple-800 mt-1">出張</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="presence" value="#778899" checked={presence === "#778899"} 
                        onChange={(e) => setPresence(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-gray-500 mt-1">不在</span>
                    </div>
                    <div className="flex flex-col items-center px-5">
                        <input type="radio" name="presence" value="#D1001C" checked={presence === "#D1001C"} 
                        onChange={(e) => setPresence(e.target.value)} style={LargeRadioStyle} />
                        <span className="text-red-600 mt-1">年休</span>
                    </div>
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
                <div className="flex flex-row items-center justify-between font-bold text-2xl">  
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="" checked={destination === ""} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>無</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="現場朝会" checked={destination === "現場朝会"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>現場朝会</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="第1工場" checked={destination === "第1工場"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>第1工場</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="第2工場" checked={destination === "第2工場"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>第2工場</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="第1・2工場" checked={destination === "第1・2工場"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>第1・2工場</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="2F会議室" checked={destination === "2F会議室"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>2F会議室</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="3F会議室" checked={destination === "3F会議室"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>3F会議室</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="3F事務所" checked={destination === "3F事務所"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>3F事務所</span>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between font-bold text-2xl">                  
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="µ事務所" checked={destination === "µ事務所"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>µ事務所</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="µ1会議室" checked={destination === "µ1会議室"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>µ1会議室</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="µ2会議室" checked={destination === "µ2会議室"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>µ2会議室</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="JKルーム" checked={destination === "JKルーム"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>JKルーム</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="HMC" checked={destination === "HMC"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>HMC</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="外出" checked={destination === "外出"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>外出</span>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <input type="radio" name="destination" value="その他" checked={destination === "その他"} 
                        onChange={(e) => setDestination(e.target.value)} style={LargeRadioStyle} />
                        <span>その他</span>
                    </div>

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
                <div className="flex flex-row items-center justify-between font-bold text-2xl">  
                    <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="" checked={lunch === ""} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>無</span>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="G" checked={lunch === "G"} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>銀柳</span>
                    </div>                    
                    <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="Gm" checked={lunch === "Gm"} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>銀柳ミニ</span>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="T" checked={lunch === "T"} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>徳山</span>
                    </div>
                     <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="Tm" checked={lunch === "Tm"} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>徳山ミニ</span>
                    </div>
                     <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="To" checked={lunch === "To"} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>徳山おかず</span>
                    </div>
                     <div className="flex flex-col items-center px-4">
                        <input type="radio" name="lunch" value="S" checked={lunch === "S"} 
                        onChange={(e) => setLunch(e.target.value)} style={SmallRadioStyle} />
                        <span>その他</span>
                    </div>
                    
                    {state.errors.lunch && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.lunch.join(', ')}
                        </p>
                    )}
                </div>
                <br />
                <br />
                <Button type="submit" className="bg-blue-500 text-white text-xl px-4 py-5 w-full rounded">
                    更新
                </Button>

                {/* フォームの非表示フィールド */} 
                <input type="hidden" name="id" value={data.id} />
                <input type="hidden" name="name" value={data.name} />
                <input type="hidden" name="order" value={data.order} />
                <input type="hidden" name="row" value={data.row} />
                <input type="hidden" name="place" value={data.place ?? ""} />
                <input type="hidden" name="lunch_default" value={data.lunch_default} />
            </form>
        </div>
    )
}
