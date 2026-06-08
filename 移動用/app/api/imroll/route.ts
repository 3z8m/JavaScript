//=====================================================================
// /api/imroll にアクセスすると、この関数が動き、データがJSONで返される
//=====================================================================

import { getImroll } from "@/lib/imroll/imroll";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getImroll();
    return NextResponse.json(data);
}
