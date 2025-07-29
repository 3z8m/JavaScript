import Link from "next/link"

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
