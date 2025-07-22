import { getDestination } from "@/lib/destination/destination";
import { Destination_h } from "@/types/destination";
import { DestinationAdmin } from "@/components/destination/DestinationAdmin";

export default async function DestinationListPage() {

    const destination = await getDestination()

    return (
        <div className="main flex flex-row gap-4 px-4 py-4 w-full">
            <table className="table table-sm w-full">
                <thead>
                    <tr>
                        <th className="px-4">名前</th>
                        <th className="px-4">並び順</th>
                        <th className="px-4">列</th>
                        <th className="px-4">弁当管理要否</th>
                        <th className="px-4">操作</th>
                    </tr>
                </thead>
                <tbody>
                    { destination.map((dist) => (
                        <tr key={dist.id}>
                            <td className="border p-2 text-center">{dist.name}</td>
                            <td className="border p-2 text-center">{dist.order}</td>
                            <td className="border p-2 text-center">{dist.row}</td>
                            <td className="border p-2 text-center">{dist.lunch_default}</td>
                            <td className="border p-2 text-center">
                                <DestinationAdmin id={dist.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}