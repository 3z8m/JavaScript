import { getImroll } from "@/lib/imroll/imroll";
import { ImrollList } from "@/components/imroll/ImrollList";

export const dynamic = "force-dynamic";

export default async function ImrollListPage() {
    const imroll = await getImroll();

    return (
        <div className="main flex flex-row gap-4 px-4 py-4 w-full">
            <ImrollList imroll={imroll} />
        </div>
    );
}
