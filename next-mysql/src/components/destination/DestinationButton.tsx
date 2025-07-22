'use client'

import Link from "next/link"


export function DestinationButton(
    { id, presence, name }: { id: string; presence: string; name: string }
) {
    return (
        <>
        <Link href={`/destination/${id}/edit`} className="cursor-pointer">
            <button
                style={{
                    backgroundColor: presence,
                    width: "100px",
                    height: "40px",
                    fontSize: "1.2rem",
                }}
                className="custom-size text-white"
            >
                <span style={{ fontSize: "1.25rem" }}>{name}</span>
            </button>
        </Link> 
        </>
    )
}
