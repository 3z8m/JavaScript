/*
　箔システムデータ取得
*/


var express = require('express');
var router = express.Router();

const oracledb = require('oracledb')

const config = {
    user: "HAKU1",
    password: "HAKU1",
    connectString: "WMDBMH21:1521/MSGK"
}

// -------------------------------------------------------------------
// GET
// -------------------------------------------------------------------

router.get('/', async(req, res, next) => {

    let conn
    let steel_code = "401"

    try {
        conn = await oracledb.getConnection(config)

        // SQL実行（改行する場合はバッククォートで囲む。変数はシングルクォート）
        const result = await conn.execute(`
            SELECT
                コイル番号, 
                コイル分割番号, 
                製造仕様番号_鋼種コード, 
                置場コード,
                コイルステータス,
                レコード更新日付時刻
            FROM 
                HAKU.コイル_V 
            WHERE 
                製造仕様番号_鋼種コード = '`+ steel_code +`' AND
                コイルステータス = 'N'
            ORDER BY 
                レコード更新日付時刻
        `)

        let opt = {
            title: "コイル情報",
            data: result.rows
        }
        res.render('hakusys', opt)
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


// -------------------------------------------------------------------
// POST
// -------------------------------------------------------------------

/*
router.post('/', async(req, res, next) => {

    if (req.body.msg != undefined) {                   // POST : req.body.[フォームのname]
        msg = req.body.msg
    }

    let opt = {
        title: "コイル情報",
        msg: msg,
        data: null
    }
    
    res.render('hakusys', opt)
})
*/


module.exports = router