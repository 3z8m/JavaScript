import { getEachImroll } from "@/lib/imroll/imroll";
import { notFound } from "next/navigation";
import EditImrollForm from "./EditImrollForm";

type Params = {
    params: Promise<{ id: string }>
}

export default async function EditPage({params}: Params) {

    const {id} = await params
    const imroll = await getEachImroll(id)

    if (!imroll) {
        notFound()
    }

    return (
        <EditImrollForm data={imroll} />
    )
}
