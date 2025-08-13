import Link from 'next/link'

export default function Home() {
	return (
		<div>
			<h1>Hello!</h1>
			<br />
			<button className='text-xl border-2 border-black rounded-lg px-2'>
				<Link href="/box">box</Link>
			</button>
			<button className='text-xl border-2 border-black rounded-lg px-2 ml-2'>
				<Link href="/wave">wave</Link>
			</button>
			<button className='text-xl border-2 border-black rounded-lg px-2 ml-2'>
				<Link href="/flatness">flatness</Link>
			</button>
			<button className='text-xl border-2 border-black rounded-lg px-2 ml-2'>
				<Link href="/rolling">rolling</Link>
			</button>
		</div>
	);
}
