import { getEachDestination } from "@/lib/destination/destination";
import { notFound } from "next/navigation";
import { ForceUpdate } from "./ForceUpdate";


type Params = {
    params: Promise<{ id: string }>
}

export default async function WarningPage({params}: Params) {

    const {id} = await params
    const destination = await getEachDestination(id)

    if (!destination) {
        notFound()
    }

    return (
        <ForceUpdate data={destination} />
    )
}
