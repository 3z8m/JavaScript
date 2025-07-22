import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"

export default function Setting({session}:{session: Session}) {
    const handleLogout = async () => {
        'use server'
        await signOut()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                    {session.user?.name}    {/* セッション状態のユーザー名 */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel onClick={handleLogout} className="cursol-pointer">
                    ログアウト
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
