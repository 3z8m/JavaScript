import PrivateHeader from "@/components/layout/PrivateHeader"


export default function PrivateLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    return (
        <>
        <PrivateHeader />
        <div className="container mx-auto px-4 py-6">
            { children }
        </div>
        </>
    )
}