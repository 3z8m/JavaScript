//==============================================================
// オペレータのリストをJSONから取得する関数
//==============================================================

import fs from "fs";
import path from "path";


export function getOperators() {
    const filePath = path.join(process.cwd(), "public", "data", "operators.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    return data.operators as string[];
}
