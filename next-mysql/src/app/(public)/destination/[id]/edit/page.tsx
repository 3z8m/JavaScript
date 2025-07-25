import { getEachDestination } from "@/lib/destination/destination";
import { notFound } from "next/navigation";
import EditDestinationForm from "./EditDestinationForm";

type Params = {
    params: Promise<{ id: string }>
}

export default async function EditPage({params}: Params) {

    const {id} = await params
    const destination = await getEachDestination(id)

    if (!destination) {
        notFound()
    }

    return (
        <EditDestinationForm data={destination} />
    )
}
