import { getEachWorkroll } from "@/lib/workroll/workroll";
import { notFound } from "next/navigation";
import EditWorkrollForm from "./EditWorkrollForm";

type Params = {
    params: Promise<{ id: string }>
}

export default async function EditPage({params}: Params) {

    const {id} = await params
    const workroll = await getEachWorkroll(id)

    if (!workroll) {
        notFound()
    }

    return (
        <EditWorkrollForm data={workroll} />
    )
}
