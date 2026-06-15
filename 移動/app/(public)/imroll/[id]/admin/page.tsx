import { getEachImroll } from "@/lib/imroll/imroll";
import { getOperators } from "@/lib/imroll/getOperators";
import { notFound } from "next/navigation";
import EditAdminForm from "./EditAdminForm";

type Params = {
    params: Promise<{ id: string }>
}

export default async function EditPage({params}: Params) {

    const {id} = await params
    const imroll = await getEachImroll(id)
    const operators = getOperators(); 

    if (!imroll) {
        notFound()
    }

    return (
        <EditAdminForm data={imroll} operators={operators} />
    )
}
