var express = require('express');
var router = express.Router();


// -------------------------------------------------------------------
// DB接続
// -------------------------------------------------------------------

const oracledb = require('oracledb')

const config = {
    user: "HAKU1",
    password: "HAKU1",
    connectString: "WMDBMH21:1521/MSGK"
}


router.get('/', async(req, res, next) => {

    let conn

    try {
        conn = await oracledb.getConnection(config)

        // SQL実行（改行する場合はバッククォートで囲む。変数はシングルクォート）
        const coil_401 = await conn.execute(`
            SELECT
                コイル番号, 
                コイル分割番号, 
                製造仕様番号_鋼種コード, 
                置場コード,
                コイルステータス
            FROM 
                HAKU.コイル_V 
            WHERE 
              製造仕様番号_鋼種コード = '401' AND
                コイルステータス = 'N'
            ORDER BY 
                レコード更新日付時刻
        `)

        const coil_309 = await conn.execute(`
            SELECT
                コイル番号, 
                コイル分割番号, 
                製造仕様番号_鋼種コード, 
                置場コード,
                コイルステータス
            FROM 
                HAKU.コイル_V 
            WHERE 
                製造仕様番号_鋼種コード = '309' AND
                コイルステータス = 'N'
            ORDER BY 
                レコード更新日付時刻
        `)

        const coil_600 = await conn.execute(`
            SELECT
                コイル番号, 
                コイル分割番号, 
                製造仕様番号_鋼種コード, 
                置場コード,
                コイルステータス
            FROM 
                HAKU.コイル_V 
            WHERE 
                製造仕様番号_鋼種コード = '600' AND
                コイルステータス = 'N'
            ORDER BY 
                レコード更新日付時刻
        `)

        const time_2mill = await conn.execute(`
            SELECT
                作業年月日時分
            FROM    
                (SELECT
                    作業年月日時分, 
                    工程コード_作業コード,
                    工程コード_ラインコード1, 
                    工程コード_ラインコード2, 
                    気温
                FROM 
                    HAKU.ライン作業実績_V 
                WHERE 
                    工程コード_作業コード = '1' AND
                    工程コード_ラインコード1 = '0' AND
                    工程コード_ラインコード2 = '2'
                ORDER BY 
                    作業年月日時分 DESC )
            WHERE 
                ROWNUM <= 50
            ORDER BY 
                作業年月日時分
        `)

        const temp_2mill = await conn.execute(`
            SELECT
                気温
            FROM    
                (SELECT
                    作業年月日時分, 
                    工程コード_作業コード,
                    工程コード_ラインコード1, 
                    工程コード_ラインコード2, 
                    気温
                FROM 
                    HAKU.ライン作業実績_V 
                WHERE 
                    工程コード_作業コード = '1' AND
                    工程コード_ラインコード1 = '0' AND
                    工程コード_ラインコード2 = '2'
                ORDER BY 
                    作業年月日時分 DESC )
            WHERE 
                ROWNUM <= 50
            ORDER BY 
                作業年月日時分
        `)

        const mois_2mill = await conn.execute(`
            SELECT
                湿度
            FROM    
                (SELECT
                    作業年月日時分, 
                    工程コード_作業コード,
                    工程コード_ラインコード1, 
                    工程コード_ラインコード2, 
                    湿度
                FROM 
                    HAKU.ライン作業実績_V 
                WHERE 
                    工程コード_作業コード = '1' AND
                    工程コード_ラインコード1 = '0' AND
                    工程コード_ラインコード2 = '2'
                ORDER BY 
                    作業年月日時分 DESC )
            WHERE 
                ROWNUM <= 50
            ORDER BY 
                作業年月日時分
        `)

        const time_3mill = await conn.execute(`
            SELECT
                作業年月日時分
            FROM    
                (SELECT
                    作業年月日時分, 
                    工程コード_作業コード,
                    工程コード_ラインコード1, 
                    工程コード_ラインコード2, 
                    気温
                FROM 
                    HAKU.ライン作業実績_V 
                WHERE 
                    工程コード_作業コード = '1' AND
                    工程コード_ラインコード1 = '0' AND
                    工程コード_ラインコード2 = '3'
                ORDER BY 
                    作業年月日時分 DESC )
            WHERE 
                ROWNUM <= 50
            ORDER BY 
                作業年月日時分
        `)

        const temp_3mill = await conn.execute(`
            SELECT
                気温
            FROM    
                (SELECT
                    作業年月日時分, 
                    工程コード_作業コード,
                    工程コード_ラインコード1, 
                    工程コード_ラインコード2, 
                    気温
                FROM 
                    HAKU.ライン作業実績_V 
                WHERE 
                    工程コード_作業コード = '1' AND
                    工程コード_ラインコード1 = '0' AND
                    工程コード_ラインコード2 = '3'
                ORDER BY 
                    作業年月日時分 DESC )
            WHERE 
                ROWNUM <= 50
            ORDER BY 
                作業年月日時分
        `)

        const mois_3mill = await conn.execute(`
            SELECT
                湿度
            FROM    
                (SELECT
                    作業年月日時分, 
                    工程コード_作業コード,
                    工程コード_ラインコード1, 
                    工程コード_ラインコード2, 
                    湿度
                FROM 
                    HAKU.ライン作業実績_V 
                WHERE 
                    工程コード_作業コード = '1' AND
                    工程コード_ラインコード1 = '0' AND
                    工程コード_ラインコード2 = '3'
                ORDER BY 
                    作業年月日時分 DESC )
            WHERE 
                ROWNUM <= 50
            ORDER BY 
                作業年月日時分
        `)        

        // 日付
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        let opt = {
            title: `金属箔工場 環境モニタ  (${year + '年' + month + '月' + day + '日'} )`,
            time_2mill: time_2mill.rows.reduce((newArr,elem) => {return  newArr.concat(elem)}, []),
            temp_2mill: temp_2mill.rows.reduce((newArr,elem) => {return  newArr.concat(elem)}, []),
            mois_2mill: mois_2mill.rows.reduce((newArr,elem) => {return  newArr.concat(elem)}, []),
            time_3mill: time_3mill.rows.reduce((newArr,elem) => {return  newArr.concat(elem)}, []),
            temp_3mill: temp_3mill.rows.reduce((newArr,elem) => {return  newArr.concat(elem)}, []),
            mois_3mill: mois_3mill.rows.reduce((newArr,elem) => {return  newArr.concat(elem)}, []),
            label:  ["A", "B", "C", "D", "E"],
            data_1: [100, 50, 100, 360, 200],
            data_2: [30, 150, 130, 220, 80],
            data_401: coil_401.rows.length,         // "coil_401"のレコード数
            data_309: coil_309.rows.length,         // "coil_309"のレコード数
            data_600: coil_600.rows.length          // "coil_600"のレコード数            
        }

        res.render('graph', opt);
    }

    catch (err) {
        console.log('接続に失敗しました。', err)
    }
    finally {
        if (conn) {
        await conn.close()
        }
    }
})

module.exports = router;
