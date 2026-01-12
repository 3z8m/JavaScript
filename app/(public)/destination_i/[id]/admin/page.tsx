import { getEachDestination } from "@/lib/destination_i/destination";
import { notFound } from "next/navigation";
import EditAdminForm from "./EditAdminForm";

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
        <EditAdminForm data={destination} />
    )
}
