import { getDestination } from "@/lib/destination/destination";
import { Destination_h } from "@/types/destination";
import { DestinationButton } from "@/components/destination/DestinationButton";


export default async function DestinationPage() {

    const destination = await getDestination()

    const renderTable = (content: Destination_h[]) => (
        <table className="table table-sm w-full">
            <thead>
                <tr>
                    <th className="px-4"></th>
                    <th className="px-4">行先</th>
                    <th className="px-4">弁当</th>
                </tr>
            </thead>
            <tbody>
                {content.map((obj) => (
                    <tr key={obj.id} style={{ borderBottom: "8px solid transparent" }}>
                        <td className="px-2">
                            {/* 名前と在席状態を表すボタン */}
                            <DestinationButton id={obj.id} presence={obj.presence} name={obj.name}/>
                        </td>
                        <td className="px-2">
                            <span style={{ fontSize: "1.1rem" }}>{obj.destination}</span>
                        </td>
                        <td className="px-2">
                            <span style={{ fontSize: "1.1rem" }}>{obj.lunch}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="main flex flex-row gap-4 px-4 py-4 w-full">
            {["1", "2", "3", "4"].map(row =>
                <div key={row} className={`row-${row} flex-1`}>
                    {renderTable(destination.filter(obj => obj.row === row))}
                </div>
            )}
        </div>
    );
}