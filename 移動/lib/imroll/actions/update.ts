'use server'

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>;
};


//=================================================================
// 通常更新（バリデーションエラーがある場合はリダイレクトさせない）
//=================================================================
export async function updateImroll(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

    const id = formData.get("id") as string;
    
    const taper_code = formData.get("taper_code") as string;
    const imr_set_code = formData.get("imr_set_code") as string;
    const imr_id = formData.get("imr_id") as string;

    const cylindricity1 = Number(formData.get("cylindricity1"));
    const cylindricity2 = Number(formData.get("cylindricity2"));
    const cylindricity3 = Number(formData.get("cylindricity3"));
    const cylindricity4 = Number(formData.get("cylindricity4"));
    const cylindricity5 = Number(formData.get("cylindricity5"));
    const pair_diff = Number(formData.get("pair_diff"));
    const imr_diameter_before = Number(formData.get("imr_diameter_before"));
    const imr_diameter_after = Number(formData.get("imr_diameter_after"));
    const grinding_amount = Number((imr_diameter_before - imr_diameter_after).toFixed(3)); // 研削量は加工前径 - 加工後径で計算

    const grinding_type = formData.get("grinding_type") as string | null;
    const imr_ra = Number(formData.get("imr_ra"));

    const judgement = formData.get("judgement") as string;
    const comment = formData.get("comment") as string | null;
    const operation_date = formData.get("operation_date") as string;
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

    // DB更新
    await prisma.imroll.update({
        where: { id },
        data: {
            taper_code,
            imr_set_code,
            imr_id,
            cylindricity1,
            cylindricity2,
            cylindricity3,
            cylindricity4,
            cylindricity5,
            pair_diff,
            imr_diameter_before,
            imr_diameter_after,
            grinding_amount,
            grinding_type,
            imr_ra,
            judgement,
            comment,
            operation_date,
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

    redirect('/imroll');
}


//=================================================================
// 強制更新（エラーが出てもリダイレクトさせる）
//=================================================================
export async function forceUpdate(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {

    const id = formData.get("id") as string;

    const taper_code = formData.get("taper_code") as string;
    const imr_set_code = formData.get("imr_set_code") as string;
    const imr_id = formData.get("imr_id") as string;

    const cylindricity1 = Number(formData.get("cylindricity1"));
    const cylindricity2 = Number(formData.get("cylindricity2"));
    const cylindricity3 = Number(formData.get("cylindricity3"));
    const cylindricity4 = Number(formData.get("cylindricity4"));
    const cylindricity5 = Number(formData.get("cylindricity5"));
    const pair_diff = Number(formData.get("pair_diff"));
    const imr_diameter_before = Number(formData.get("imr_diameter_before"));
    const imr_diameter_after = Number(formData.get("imr_diameter_after"));
    const grinding_amount = Number((imr_diameter_before - imr_diameter_after).toFixed(3)); // 研削量は加工前径 - 加工後径で計算
    const grinding_type = formData.get("grinding_type") as string | null;
    const imr_ra = Number(formData.get("imr_ra"));

    const judgement = formData.get("judgement") as string;
    const comment = formData.get("comment") as string | null;
    const operation_date = formData.get("operation_date") as string;
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
    
    
    try {
        await prisma.imroll.update({
            where: { id },
            data: {
                taper_code,
                imr_set_code,
                imr_id,
                cylindricity1,
                cylindricity2,
                cylindricity3,
                cylindricity4,
                cylindricity5,
                pair_diff,
                imr_diameter_before,
                imr_diameter_after,
                grinding_amount,
                grinding_type,
                imr_ra,
                judgement,
                comment,
                operation_date,
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

        return { success: true, errors: {} };

    } catch (error) {
        console.error(error);
        return { success: false, errors: { db: ["更新に失敗しました"] } };
    }
}

