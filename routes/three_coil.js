var express = require('express');
var router = express.Router();

// DB接続無し
/*
router.get('/', function(req, res, next) {
    res.render('cg/three_coil', { title: '第１工場 コイル' });
});
*/


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

        let opt = {
            title: "第１工場 コイル",
            data_401: coil_401.rows.length,         // "coil_401"のレコード数
            data_309: coil_309.rows.length          // "coil_309"のレコード数
        }
        res.render('cg/three_coil', opt)

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


module.exports = router