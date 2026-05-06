import Link from "next/link"

export function WorkrollButton(
    { id, roll_id, grinding_type }: { id: string; roll_id: string; grinding_type: string }
) {
    return (
        <>
        <Link href={`/workroll/${id}/edit`} className="cursor-pointer">
            <button
                style={{
                    backgroundColor: grinding_type === "粗削" ? "lightgray" : "darkgray",
                    width: "100px",
                    height: "45px",
                    fontSize: "1.3rem",
                }}
                className="custom-size text-white"
            >
                <span style={{ fontSize: "1.5rem" }}>{roll_id}</span>
            </button>
        </Link> 
        </>
    )
}
