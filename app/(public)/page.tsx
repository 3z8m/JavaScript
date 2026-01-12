import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default async function TopPage() {
	return (
		<div className="flex flex-col min-h-screen">
		<header className="border-b bg-gray-800 text-white">
			<div className="container mx-auto px-4 py-2 flex items-center justify-between">

				<div className=" flex items-center gap-4">
					<Button className="bg-gray-800 text-white hover:bg-gray-700" asChild>
						<Link href="/" className="font-bold text-xl">Top</Link>
					</Button>
				</div>
				
			</div>
		</header>

		<main className="flex-1">
			<h1 className="text-center text-3xl font-bold mt-8">Welcome to Metal Foil Mill</h1>

			<div className="mt-8 px-5 flex flex-row gap-4">
				<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
					<Link href="/destination">行先（光）</Link>
				</Button>
				<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
					<Link href="/destination_i">行先（市川）</Link>
				</Button>
			</div>
			
			<div className="mt-8 px-5">
				<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
					<Link href="/r3f">3D</Link>
				</Button>
			</div>
			
			<div className="mt-8 px-5">
				<Button className="bg-gray-700 text-white hover:bg-gray-600 w-30" asChild>
					<Link href="/chart">Chart</Link>
				</Button>
			</div>			
		</main>

		<hr />
		<footer className="px-4 py-1 text-center">
				{/* 両サイドにロゴ画像を表示 */}
				<div className="flex justify-between items-center mb-8">
					<Image
						src="/logo/Logo1.png"
						alt="Logo1"
						width={200}
						height={80}
						priority
					/>
					<Image
						src="/logo/Logo2.png"
						alt="Logo2"
						width={250}
						height={80}
						priority
					/>
				</div>
		</footer>
		</div>
	)
}
