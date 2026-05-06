'use server'

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>;
};

export async function createWorkroll(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

    // フォームから取得
    const roll_id = formData.get("roll_id") as string;
    const roll_type = formData.get("roll_type") as string;
    const grinding_type = formData.get("grinding_type") as string;

    const grinding_amount = Number(formData.get("grinding_amount"));
    const diameter = Number(formData.get("diameter"));
    const ra_i = Number(formData.get("ra_i"));
    const ra_h = Number(formData.get("ra_h"));

    const judgement = formData.get("judgement") as string;
    const comment = formData.get("comment") as string | null;

    const operation_date = formData.get("operation_date") as string;
    const start_time = formData.get("start_time") as string;
    const end_time = formData.get("end_time") as string;

    const operator = formData.get("operator") as string;
    const operation_group = formData.get("operation_group") as string;

    // バリデーション（必要なら追加）

    // DB登録
    await prisma.workroll.create({
        data: {
            roll_id,
            roll_type,
            grinding_type,
            grinding_amount,
            diameter,
            ra_i,
            ra_h,
            judgement,
            comment,
            operation_date,
            start_time,
            end_time,
            operator,
            operation_group
        }
    });

    redirect('/workroll');
}
