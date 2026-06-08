import { getWorkroll } from "@/lib/workroll/workroll";
import { WorkrollList } from "@/components/workroll/WorkrollList";

export const dynamic = "force-dynamic";

export default async function WorkrollListPage() {
    const workroll = await getWorkroll();

    return (
        <div className="main flex flex-row gap-4 px-4 py-4 w-full">
            <WorkrollList workroll={workroll} />
        </div>
    );
}
