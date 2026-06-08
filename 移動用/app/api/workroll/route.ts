//=====================================================================
// /api/workroll にアクセスすると、この関数が動き、データがJSONで返される
//=====================================================================

import { getWorkroll } from "@/lib/workroll/workroll";
import { NextResponse } from "next/server";

export async function GET() {
	const data = await getWorkroll();
	return NextResponse.json(data);
}
