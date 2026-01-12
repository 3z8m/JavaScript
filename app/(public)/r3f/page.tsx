import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/r3f/Text"


export default async function TopPage() {
	return (
		<div className="flex flex-col min-h-screen" style={{ height: '100vh', background: '#EEEEEE' }}>

			<main className="flex-1">
				<div className="mt-8 px-5">
					<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
						<Link href="/r3f/flatness">板形状</Link>
					</Button>
				</div>
				<div className="mt-8 px-5">
					<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
						<Link href="/r3f/rolling">圧延</Link>
					</Button>
				</div>
				<div className="mt-8 px-5">
					<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
						<Link href="/r3f/ichikawa">市川</Link>
					</Button>
				</div>
				<div className="mt-8 px-5">
					<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
						<Link href="/r3f/fpc">FPC</Link>
					</Button>
				</div>
			</main>
			<Text />
		</div>
	)
}
