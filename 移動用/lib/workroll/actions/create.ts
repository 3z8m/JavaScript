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
    const diameter_rg = Number(formData.get("diameter_rg"));
    const diameter_ml = Number(formData.get("diameter_ml"));
    const ra_i = Number(formData.get("ra_i"));
    const ra_h = Number(formData.get("ra_h"));
    const width = Number(formData.get("width"));

    const judgement = formData.get("judgement") as string;
    const comment = formData.get("comment") as string | null;

    const operation_date = formData.get("operation_date") as string;
    const grinding_number = formData.get("grinding_number") as string;
    const processing_time = Number(formData.get("processing_time"));

    const non_processing_code1 = formData.get("non_processing_code1") as string | null;
    const non_processing_time1 = Number(formData.get("non_processing_time1"));
    const non_processing_code2 = formData.get("non_processing_code2") as string | null;
    const non_processing_time2 = Number(formData.get("non_processing_time2"));
    const non_processing_code3 = formData.get("non_processing_code3") as string | null;
    const non_processing_time3 = Number(formData.get("non_processing_time3"));
    const non_processing_code4 = formData.get("non_processing_code4") as string | null;
    const non_processing_time4 = Number(formData.get("non_processing_time4"));
    const non_processing_code5 = formData.get("non_processing_code5") as string | null;
    const non_processing_time5 = Number(formData.get("non_processing_time5"));

    const operator = formData.get("operator") as string;
    const operation_group = formData.get("operation_group") as string;
    const status = formData.get("status") as string;

    // バリデーション（必要なら追加）

    // DB登録
    await prisma.workroll.create({
        data: {
            roll_id,
            roll_type,
            grinding_type,
            grinding_amount,
            diameter_rg,
            diameter_ml,
            ra_i,
            ra_h,
            width,
            judgement,
            comment,
            operation_date,
            grinding_number,
            processing_time,
            non_processing_code1,
            non_processing_time1,
            non_processing_code2,
            non_processing_time2,
            non_processing_code3,
            non_processing_time3,
            non_processing_code4,
            non_processing_time4,
            non_processing_code5,
            non_processing_time5,
            operator,
            operation_group,
            status
        }
    });

    redirect('/workroll');
}
