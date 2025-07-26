import Link from "next/link"

export function DestinationAdmin(
    { id }: { id: string }
) {
    return (
        <>
        <Link href={`/destination/${id}/admin`} className="cursor-pointer">
            編集
        </Link> 
        </>
    )
}
