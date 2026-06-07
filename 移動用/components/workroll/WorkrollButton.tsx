import Link from "next/link"

export function WorkrollButton(
    { id, roll_id, status }: { id: string; roll_id: string; status: string }
) {
    return (
        <>
        <Link href={`/workroll/${id}/edit`} className="cursor-pointer">
            <button
                className={`
                    custom-size text-white w-[120px] h-[45px] text-[1.3rem]
                    ${
                      status === "加工済" ? "bg-blue-500"
                    : status === "使用中" ? "bg-red-500"
                    : "bg-gray-500"
                    }
                `}
            >
            <span className="text-[1.5rem]">{roll_id}</span>
            </button>
        </Link> 
        </>
    )
}
