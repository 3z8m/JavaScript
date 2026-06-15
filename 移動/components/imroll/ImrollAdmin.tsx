//==============================================================
// 中間ロール管理
//==============================================================

import Link from "next/link"

export function ImrollAdmin(
    { id }: { id: string }
) {
    return (
        <>
        <Link
            href={`/imroll/${id}/admin`}
            className="text-blue-600 hover:text-blue-800 p-2 inline-block"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687 1.687m-2.475-2.475l-9.193 9.193a4.5 4.5 0 00-1.044 1.68l-.684 2.053a.75.75 0 00.948.948l2.053-.684a4.5 4.5 0 001.68-1.044l9.193-9.193m-2.475-2.475l2.475 2.475"
                />
            </svg>
        </Link>
        </>
    )
}