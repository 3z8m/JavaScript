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
        const TEMP_1mll = await conn.execute(`
            SELECT
                作業年月日時分, 
                工程コード_ラインコード2, 
                気温
            FROM 
                HAKU.ライン作業実績_V 
            WHERE 
                作業年月日時分 = (SELECT MAX(作業年月日時分) FROM HAKU.ライン作業実績_V WHERE 工程コード_ラインコード2 = '1')
        `)

        const TEMP_2mll = await conn.execute(`
            SELECT
                作業年月日時分, 
                工程コード_ラインコード2, 
                気温
            FROM 
                HAKU.ライン作業実績_V 
            WHERE
                作業年月日時分 = (SELECT MAX(作業年月日時分) FROM HAKU.ライン作業実績_V WHERE 工程コード_ラインコード2 = '2')
        `)

        const TEMP_3bal = await conn.execute(`
            SELECT
                作業年月日時分, 
                工程コード_ラインコード2, 
                気温
            FROM 
                HAKU.ライン作業実績_V 
            WHERE
                作業年月日時分 = (SELECT MAX(作業年月日時分) FROM HAKU.ライン作業実績_V WHERE 工程コード_ラインコード2 = '6')
        `)

        let opt = {
            title: "温度",
            temp_1mill: TEMP_1mll.rows[0][2],         // 温度（1mill）
            temp_2mill: TEMP_2mll.rows[0][2],         // 温度（2mill）
            temp_3bal: TEMP_3bal.rows[0][2]           // 温度（3BAL）
        }
        console.log(opt);
        res.render('cg/babylon_mill', opt);
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