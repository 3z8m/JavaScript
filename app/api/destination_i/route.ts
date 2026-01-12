//=====================================================================
// /api/destination にアクセスすると、この関数が動き、データがJSONで返される
//=====================================================================

import { getDestination } from "@/lib/destination_i/destination";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getDestination();
    return NextResponse.json(data);
}
