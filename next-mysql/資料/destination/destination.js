var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./prisma/mydb.db')


// テーブルを取得
router.get('/', (req, res, next) => {
    db.serialize(() => {
        const q1 = 'SELECT * FROM Destination WHERE col_num=1 ORDER BY group_id, member_order';
        const q2 = 'SELECT * FROM Destination WHERE col_num=2 ORDER BY group_id, member_order';
        const q3 = 'SELECT * FROM Destination WHERE col_num=3 ORDER BY group_id, member_order';
        const q4 = 'SELECT * FROM Destination WHERE col_num=4 ORDER BY group_id, member_order';

        db.all(q1, (err, rows1) => {
            if (err) {
                return next(err);
            }
            db.all(q2, (err, rows2) => {
                if (err) {
                    return next(err);
                }
                db.all(q3, (err, rows3) => {
                    if (err) {
                        return next(err);
                    }
                    db.all(q4, (err, rows4) => {
                        if (err) {
                            return next(err);
                        }
                        var data = {
                            title: "行先ボード",
                            content1: rows1,
                            content2: rows2,
                            content3: rows3,
                            content4: rows4                       
                        };
                        res.render('destination/index', data);
                    });
                });
            });
        });
    });
});

// 編集 (Read)
router.get('/edit', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = 'SELECT * FROM Destination WHERE id = ?';
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: "行先ボード",
                    content: row
                }
                res.render('destination/edit', data);
            }
        });
    });
});

// 編集 (Update)
router.post('/edit', (req, res, next) => {
    
    const id = req.body.id;                         // 個人ID
    const name = req.body.name;                     // 氏名
    const present = req.body.present;               // 出社、他
    const destination = req.body.destination;       // 行先
    const lunch = req.body.lunch;                   // 弁当の種類
    const lunch_default = req.body.lunch_default;   // 弁当要否の初期設定

    // 特定の値をチェックし、ワーニング画面に遷移
    //　 弁当要否の初期設定が「1」、かつ「出社」、かつ「弁当：無」⇒ワーニング
    //   弁当要否の初期設定が「1」、かつ「在宅/出張/年休」、かつ「弁当：無以外」⇒ワーニング
    if ((lunch_default === "1" && present === "blue" && lunch === "") ||
        (lunch_default === "1" && ["green", "yellowgreen", "red"].includes(present) && lunch != "")) {
        return res.render(
            'destination/lunch_warning', 
            { 
                id: id,
                name: name,
                present: present,
                destination: destination,
                lunch: lunch,
                title: "lunch_warning"
            }
        );
    } else {
        // 何もしない
    }

    const q = 'UPDATE Destination SET name=?, present=?, destination=?, lunch=? WHERE id=?';

    db.serialize(() => {
        db.run(q, name, present, destination, lunch, id);
    });
    res.redirect('/destination');
});

// 編集の強制更新 (Update)
router.post('/force-update', (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const present = req.body.present;
    const destination = req.body.destination;
    const lunch = req.body.lunch;

    const q = 'UPDATE Destination SET name=?, present=?, destination=?, lunch=? WHERE id=?';

    db.serialize(() => {
        db.run(q, name, present, destination, lunch, id);
    });
    res.redirect('/destination');
});


// 弁当注文集計 (Read)
router.get('/lunch_num', (req, res, next) => {
    db.serialize(() => {
        const q_mu = `SELECT 
                        COUNT(CASE WHEN lunch = "G" THEN 1 END) AS lunch_G,
                        COUNT(CASE WHEN lunch = "Gm" THEN 1 END) AS lunch_Gm,
                        COUNT(CASE WHEN lunch = "T" THEN 1 END) AS lunch_T,
                        COUNT(CASE WHEN lunch = "Tm" THEN 1 END) AS lunch_Tm,
                        COUNT(CASE WHEN lunch = "To" THEN 1 END) AS lunch_To,
                        COUNT(CASE WHEN lunch = "S" THEN 1 END) AS lunch_S                   
                    FROM Destination 
                    WHERE group_id = "a" OR group_id = "b" OR group_id = "b" 
                        OR group_id = "c" OR group_id = "d" OR group_id = "e"`;
        const q_3F = `SELECT 
                        COUNT(CASE WHEN lunch = "G" THEN 1 END) AS lunch_G,
                        COUNT(CASE WHEN lunch = "Gm" THEN 1 END) AS lunch_Gm,
                        COUNT(CASE WHEN lunch = "T" THEN 1 END) AS lunch_T,
                        COUNT(CASE WHEN lunch = "Tm" THEN 1 END) AS lunch_Tm,
                        COUNT(CASE WHEN lunch = "To" THEN 1 END) AS lunch_To,
                        COUNT(CASE WHEN lunch = "S" THEN 1 END) AS lunch_S                       
                    FROM Destination 
                    WHERE group_id = "f" OR group_id = "g"`;
        db.all(q_mu, (err, row_mu) => {
            if (err) {
                return next(err);
            }
            db.all(q_3F, (err, row_3F) => {
                if (err) {
                    return next(err);
                }
                var data = {
                    title: "行先ボード",
                    lunch_mu: row_mu,
                    lunch_3F: row_3F
                }
                res.render('destination/lunch_num', data);
            });
        });
    });
});


module.exports = router;