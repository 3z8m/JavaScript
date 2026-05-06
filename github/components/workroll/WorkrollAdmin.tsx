//==============================================================
// ワークロール管理
//==============================================================

import Link from "next/link"

export function WorkrollAdmin(
    { id }: { id: string }
) {
    return (
        <>
        <Link href={`/workroll/${id}/admin`}>
            編集
        </Link> 
        </>
    )
}