//============================================================
// チャート用データをOracleDBから取得するAPI
//============================================================

import { NextResponse } from 'next/server';
import oracledb from 'oracledb';


export async function GET() {
    try {
        // OracleDBへの接続キー（.env から読み込み）
        const conn = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_CONNECT_STRING
        })

        // 2ミル気温データ（一週間以内のレコードを抽出）
        const sgkTemp2 = await conn.execute(`
            SELECT
                作業年月日時分, 
                気温
            FROM (
                SELECT 作業年月日時分, 工程コード_作業コード, 工程コード_ラインコード1, 工程コード_ラインコード2, 気温
                FROM HAKU.ライン作業実績_V
                WHERE 工程コード_作業コード = '1'
                    AND 工程コード_ラインコード1 = '0'
                    AND 工程コード_ラインコード2 = '2'
                    AND 気温 <> 0
                    AND TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI') > TRUNC(SYSDATE - 7)
            )
            ORDER BY 作業年月日時分
        `);

        // 工程別作業後重量データ
        const sgkProcessWeight = await conn.execute(`
            SELECT
                TO_CHAR(TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI'), 'YYYY-MM-DD') AS 作業日,
                工程コード_作業コード,
                SUM(作業後重量) AS 合計作業後重量
            FROM (
                SELECT
                    作業年月日時分, 工程コード_作業コード, 工程コード_ラインコード1,
                    工程コード_ラインコード2, 工程コード_処理種別, 作業後重量, 前面出し区分
                FROM HAKU.ライン作業実績_V
                WHERE 
                    工程コード_作業コード IN ('1', '2', '3')
                    AND 工程コード_ラインコード1 = '0'
                    AND 前面出し区分 = '0'
                    AND 作業年月日時分 IS NOT NULL
                    AND TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI') > TRUNC(SYSDATE - 7)
            )
            GROUP BY 
                TO_CHAR(TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI'), 'YYYY-MM-DD'),
                工程コード_作業コード
            ORDER BY 
                作業日 ASC, 工程コード_作業コード
        `);

        // ライン別作業後重量データ
        const sgkLine = await conn.execute(`
            SELECT
                TO_CHAR(TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI'), 'YYYY-MM-DD') AS 作業日,
                工程コード_ラインコード2 AS ラインコード,
                SUM(作業後重量) AS 合計作業後重量,
                SUM(通板時間) AS 合計通板時間
            FROM (
                SELECT
                    作業年月日時分, 工程コード_作業コード, 工程コード_ラインコード1,
                    工程コード_ラインコード2, 工程コード_処理種別, 作業後重量, 通板時間, 前面出し区分
                FROM HAKU.ライン作業実績_V
                WHERE 
                    工程コード_作業コード IN ('1', '2', '3')
                    AND 工程コード_ラインコード1 = '0'
                    AND 前面出し区分 = '0'
                    AND 作業年月日時分 IS NOT NULL
                    AND TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI') > TRUNC(SYSDATE - 7)
            )
            GROUP BY 
                TO_CHAR(TO_DATE(TRIM(作業年月日時分), 'YYYYMMDDHH24MI'), 'YYYY-MM-DD'),
                工程コード_ラインコード2
            ORDER BY 
                作業日 ASC, 工程コード_ラインコード2
        `);


        // 鋼種別作業後重量データ（HAKU_コイル_V）
        const sgkSteelWeight = await conn.execute(`
            SELECT
                製造仕様番号_鋼種コード AS 鋼種コード,
                保留区分,
                SUM(現重量) AS 合計重量
            FROM (
                SELECT
                    製造仕様番号_鋼種コード, 現重量, 保留区分, コイルステータス
                FROM HAKU.コイル_V
                WHERE 
                    製造仕様番号_鋼種コード IS NOT NULL
                    AND 工程コード_作業コード IN ('1', '2', '3', '4', '5')
                    AND コイルステータス = 'N'
            )
            GROUP BY
                製造仕様番号_鋼種コード,
                保留区分
            ORDER BY 
                製造仕様番号_鋼種コード
        `);



        // DB接続を閉じる
        await conn.close();

        
        const today = new Date();
        const title = `工場 環境モニタ (${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日)`;

        // 2ミル気温
        const rows_temp2 = sgkTemp2.rows as [Date, number][];     // 列数分の型指定が必要
        const temp2_time = rows_temp2.map(row => row[0]);
        const temp2_temp = rows_temp2.map(row => row[1]);

        // 工程別作業後重量
        const rowsProcessWeight = sgkProcessWeight.rows as [Date, string, number][];
        const processWeight_time = rowsProcessWeight.map(row => row[0]);
        const processWeight_opecode = rowsProcessWeight.map(row => row[1]);
        const processWeight_weight = rowsProcessWeight.map(row => row[2]);

        // ライン別作業後重量
        const rowsLine = sgkLine.rows as [Date, string, number, number][];
        const lineTime = rowsLine.map(row => row[0]);
        const lineCode = rowsLine.map(row => row[1]);
        const lineWeight = rowsLine.map(row => row[2]);
        const lineUptime = rowsLine.map(row => row[3]);

        // 鋼種別作業後重量
        const rowsSteelWeight = sgkSteelWeight.rows as [string, string, number][];
        const steelWeight_steelcode = rowsSteelWeight.map(row => row[0]);
        const steelWeight_hold = rowsSteelWeight.map(row => row[1]);
        const steelWeight_weight = rowsSteelWeight.map(row => row[2]);


        return NextResponse.json({
            title,
            temp2_time,
            temp2_temp,
            processWeight_time,
            processWeight_opecode,
            processWeight_weight,
            lineTime,
            lineCode,
            lineWeight,
            lineUptime,
            steelWeight_steelcode,
            steelWeight_hold,
            steelWeight_weight
        });

    } catch (err) {
        console.error('DB接続エラー:', err);
        return NextResponse.json({ error: 'DB接続に失敗しました。' }, { status: 500 });
    }
}