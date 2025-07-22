'use client' 

import { useActionState } from "react"; 
import { createDestination } from "@/lib/destination/actions/create";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export default function CreatePage() {
    // フォームの状態を管理
    const [state, formAction] = useActionState(createDestination, {	// アクションの初期状態
        success: false,
        errors: {}
    })

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">【行先ボード】新規ユーザー登録</h1>
            <form action={formAction} className="space-y-4">
				<div>
					<Label htmlFor="name">名前</Label>
					<Input type="text" id="name" name="name" placeholder="表示名" /> 
				</div>
                <div>
					<Label htmlFor="order">並び順</Label>
					<Input type="text" id="order" name="order" placeholder="例：0101" /> 
				</div>
                <div>
                    <Label htmlFor="row">行</Label>
                    <Input type="text" id="row" name="row" placeholder="例：1" />
                </div>
                <div>
                    <Label htmlFor="presence">在席</Label>
                    <Input type="text" id="presence" name="presence" defaultValue="#1e90ff" />
                </div>
                <div>
                    <Label htmlFor="detination">行先</Label>
                    <Input type="text" id="detination" name="detination" defaultValue="" />
                </div>
                <div>
                    <Label htmlFor="lunch">昼食</Label>
                    <Input type="text" id="lunch" name="lunch" defaultValue="" />
                </div>
                <div>
                    <Label htmlFor="lunch_default">昼食デフォルト</Label>
                    <Input type="text" id="lunch_default" name="lunch_default"  defaultValue="0" />
                </div>

                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    登録
                </Button>
            </form>
        </div>
    )
}
