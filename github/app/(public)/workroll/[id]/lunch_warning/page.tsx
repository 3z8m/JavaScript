import { getEachWorkroll } from "@/lib/workroll/workroll";
import { notFound } from "next/navigation";
import { ForceUpdate } from "./ForceUpdate";


type Params = {
    params: Promise<{ id: string }>
}

export default async function WarningPage({params}: Params) {

    const {id} = await params
    const workroll = await getEachWorkroll(id)

    if (!workroll) {
        notFound()
    }

    return (
        <ForceUpdate data={workroll} />
    )
}
