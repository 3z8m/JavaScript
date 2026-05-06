import { getWorkroll } from "@/lib/workroll/workroll";
import { WorkrollAdmin } from "@/components/workroll/WorkrollAdmin";

// 静的化を防ぐ
export const dynamic = "force-dynamic"

// ページ作成
export default async function WorkrollListPage() {

    const workroll = await getWorkroll()

    return (
        <div className="main flex flex-row gap-4 px-4 py-4 w-full">
            <table className="table table-sm w-full">
                <thead>
                    <tr>
                        <th className="px-4">ロール番号</th>
                        <th className="px-4">ロール種</th>
                        <th className="px-4">研削種</th>
                        <th className="px-4">研削量</th>
                        <th className="px-4">ロール径</th>
                        <th className="px-4">Ra_市川</th>
                        <th className="px-4">Ra_光</th>
                        <th className="px-4">合否</th>
                        <th className="px-4">コメント</th>
                        <th className="px-4">作業日付</th>
                        <th className="px-4">開始時間</th>
                        <th className="px-4">終了時間</th>
                        <th className="px-4">作業者</th>
                        <th className="px-4">作業組</th>
                        <th className="px-4">編集</th>
                    </tr>
                </thead>
                <tbody>
                    { workroll.map((dist) => (
                        <tr key={dist.id}>
                            <td className="border p-2 text-center">{dist.roll_id}</td>
                            <td className="border p-2 text-center">{dist.roll_type}</td>
                            <td className="border p-2 text-center">{dist.grinding_type}</td>
                            <td className="border p-2 text-center">{dist.grinding_amount}</td>
                            <td className="border p-2 text-center">{dist.diameter}</td>
                            <td className="border p-2 text-center">{dist.ra_i}</td>
                            <td className="border p-2 text-center">{dist.ra_h}</td>
                            <td className="border p-2 text-center">{dist.judgement}</td>
                            <td className="border p-2 text-center">{dist.comment}</td>
                            <td className="border p-2 text-center">{dist.operation_date}</td>
                            <td className="border p-2 text-center">{dist.start_time}</td>
                            <td className="border p-2 text-center">{dist.end_time}</td>
                            <td className="border p-2 text-center">{dist.operator}</td>
                            <td className="border p-2 text-center">{dist.operation_group}</td>
                            <td className="border p-2 text-center">
                                <WorkrollAdmin id={dist.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}