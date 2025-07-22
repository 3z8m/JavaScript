import { writeFile } from 'fs/promises';
import path from 'path';

export async function saveImage(file: File): Promise<string | null> {
	const buffer = Buffer.from(await file.arrayBuffer());			// ファイルをバッファに変換
	const fileName = `${Date.now()}_${file.name}`;				// タイムスタンプを付けて一意のファイル名を生
	// スペースをアンダースコアに置換し、タイムスタンプを付けてて一意のファイル名を生成
	// const fileName = `${Date.now()}_${encodeURIComponent(file.name.replace(/\s/g, '_'))}`;	
	const uploadDir = path.join(process.cwd(), 'public/images');	// 画像の保存先ディレクトリを指定

	try {
		const filePath = path.join(uploadDir, fileName);	// 保存先のフルパスを生成
		await writeFile(filePath, buffer);					// バッファをファイルに書き込む	
		return `/images/${fileName}`						// 画像のURLを返す
	} catch (error) {
		console.error('画像の保存に失敗:', error)			 // エラーログを出力
		return null; 										// エラーが発生した場合はnullを返す
	}
}
