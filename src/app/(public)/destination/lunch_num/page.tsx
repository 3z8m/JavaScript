import { getLunchCount } from "@/lib/destination/destination";


// 静的化を防ぐ
export const dynamic = "force-dynamic"

// ページ作成
export default async function LunchCountPage() {
    const data = await getLunchCount();

    // nullチェック + 有効なデータだけ抽出
    if (!data || !data.lunchList) {
        return <main style={{ padding: '2rem' }}><h1>データ取得に失敗しました</h1></main>;
    }
    
    // nullを含むplaceは"未設定"として扱う
    const validLunchList = data.lunchList.map(item => ({
        place: item.place ?? '未設定',
        lunch: item.lunch ?? '無',
        count: item.count,
    }))

	// 拠点ラベル変換マップ
	const placeMap: Record<string, string> = {
		mu: "μ事務所",
		f3: "3階事務所"
	}

	// 拠点を placeMap のキー順で並べ替え
	const places = Object.keys(placeMap).filter(type => validLunchList.some(item => item.place === type));
    //const places = Array.from(new Set(validLunchList.map(item => item.place)));

	// 弁当ラベル変換マップ
	const lunchMap: Record<string, string> = {
		G: "G: 銀柳",
		Gm: "Gm: 銀柳ミニ",
		T: "T: 徳山",
		Tm: "Tm: 徳山ミニ",
		To: "To: 徳山おかず",
		S: "S: その他"
	}

	// 弁当種類を lunchMap のキー順で並べ替え
	const lunchTypes = Object.keys(lunchMap).filter(type =>
		validLunchList.some(item => item.lunch === type)
	);

    // クロス集計作成
    const summary: Record<string, Record<string, number>> = {};

    for (const place of places) {
        summary[place] = {};
        for (const lunch of lunchTypes) {
            summary[place][lunch] = 0;		// 初期値0
        }
    }

    for (const row of validLunchList) {
        summary[row.place][row.lunch] += row.count;
    }

    // 表示関数
    const renderPivotTable = () => (
        <div style={{ marginBottom: '2rem' }}>
            <h1>弁当注文数</h1>
            <table className="text-center" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>拠点</th>
                        {lunchTypes.map((lunch, index) => (
                            <th key={index} style={{ border: '1px solid black', padding: '8px' }}>
								{lunchMap[lunch] || lunch}
							</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {places.map((place, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
								{placeMap[place] || place}
							</td>
                            {lunchTypes.map((lunch, i) => (
                                <td key={i} style={{ border: '1px solid black', padding: '8px' }}>
									{/* ゼロの場合は空白に変換 */}
                                    {summary[place][lunch] === 0 ? "" : summary[place][lunch]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <main style={{ padding: '2rem' }}>
            {renderPivotTable()}
        </main>
    );
}
