
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Setting from "@/components/layout/Setting"
import { auth } from '@/auth'


export default async function PrivateLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    // セッション（ログインしていなければ例外を投げる）
    const session = await auth()
    if(!session?.user?.email) throw new Error("不正なリクエストです")

    return (
        <>
        <header className="border-b bg-gray-800 text-white">
			<div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <Button className="bg-gray-800 text-white hover:bg-gray-700" asChild>
                    <Link href="/dashboard" className="font-bold text-xl">
                    管理ページ
                    </Link>
                </Button>
				<Setting session={session} />
			</div>
		</header>
        <div className="container mx-auto px-4 py-6">
            { children }
        </div>
        </>
    )
}