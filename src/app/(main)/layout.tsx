import SideMenue from "@/components/SideMenue/SideMenue";

const MainLayout = (
    { children, }: Readonly<{ children: React.ReactNode; }>
) => {
    return (
        <div className="flex h-screen">              {/* 横並び，画面高さ全てに*/}
            <SideMenue />
            <main className="bg-slate-50 flex-1 overflow-auto">{ children }</main>   {/* 余白無し、自動でスクロール */}
        </div>
    )
};

export default MainLayout;