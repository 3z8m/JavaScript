import Link from "next/link"

export function DestinationButton(
    { id, presence, name }: { id: string; presence: string; name: string }
) {
    return (
        <>
        <Link href={`/destination_i/${id}/edit`} className="cursor-pointer">
            <button
                style={{
                    backgroundColor: presence,
                    width: "100px",
                    height: "45px",
                    fontSize: "1.3rem",
                }}
                className="custom-size text-white"
            >
                <span style={{ fontSize: "1.5rem" }}>{name}</span>
            </button>
        </Link> 
        </>
    )
}
