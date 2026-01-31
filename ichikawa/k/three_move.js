var express = require('express');
var router = express.Router();
const fs = require('fs');

//----------------------------------------------------------
// CSVファイルを読み込む関数
//----------------------------------------------------------

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('エラーが発生しました:', err);
                reject(err);
                return;
            }

            // CSVデータを行ごとに分割
            const rows = data.split('\n');
            const result = [];

            // 2行目以降を処理
            for (let i = 1; i < rows.length; i++) {
                // 1列目をハイフンで区切り、3列に分割
                const columns = rows[i].split(',');
                if (columns.length >= 7) {
                    const splitFirstColumn = columns[0].split('-');
                    const secondColumn = columns[1].trim();
                    const seventhColumn = columns[6].trim();

                    // 4列目の値に応じて色を設定
                    let content;
                    if (/^\d/.test(secondColumn)) {     // 先頭(/^)が数値(\d)。.test()：文字列がその正規表現に合致する場合はTrue
                        content = 'coil';
                    } else if (/^N/.test(secondColumn)) {
                        content = 'palette';
                    } else {
                        content = 'other';
                    }

                    // 結果に追加
                    result.push([
                        splitFirstColumn[0],
                        splitFirstColumn[1],
                        splitFirstColumn[2],
                        secondColumn,
                        seventhColumn,
                        content
                    ]);
                }
            }
            resolve(result);
        });
    });
}


//----------------------------------------------------------
// JSONファイルを読み込む関数
//----------------------------------------------------------

function readJSON(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('エラーが発生しました:', err);
                reject(err);
                return;
            }
            //resolve(JSON.parse(data));
            resolve(data)
        });
    })
}


//==========================================================
// ルーター
//==========================================================

router.get('/', async function(req, res, next) {
    try {
        // 読み込みファイルのパス
        const filePath1 = './public/datafiles/TZAISD.csv';  // 立体倉庫データ (CSV)
        const filePath2 = './public/datafiles/coil.json';   // 第1工場コイル位置 (JSON)

        // 非同期でCSVデータを取得
        const dataCsv = await readCSV(filePath1);
        const dataJson = await readJSON(filePath2);

        // データをテンプレートに渡して描画
        res.render('cg/three_move', { 
            title: '金属箔工場',
            dataCsv: dataCsv,
            dataJson: dataJson
        });
    } catch (error) {
        console.error('エラーが発生しました:', error);
        res.status(500).send('データ取得中にエラーが発生しました。');
    }
});

module.exports = router;