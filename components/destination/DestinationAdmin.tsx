import Link from "next/link"

// 光版
export function DestinationAdmin(
    { id }: { id: string }
) {
    return (
        <>
        <Link href={`/destination/${id}/admin`}>
            編集
        </Link> 
        </>
    )
}


// 市川版
export function DestinationAdmin_i(
    { id }: { id: string }
) {
    return (
        <>
        <Link href={`/destination_i/${id}/admin`}>
            編集
        </Link> 
        </>
    )
}