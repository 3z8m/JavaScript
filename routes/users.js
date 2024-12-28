const express = require('express');
const router = express.Router();

const ps = require('@prisma/client')

const prisma = new ps.PrismaClient()

// Usersテーブルを取得
router.get('/', (req, res, next) => {
    prisma.User.findMany().then(users => {
        const data = {
            title: '登録ユーザー',
            content: users
        }
      res.render('users/index', data)
    })
})

// 追加 (Create)
router.get('/add', (req, res, next) => {
    const data = {
      title: 'アカウントの作成'
    };
    res.render('users/add', data);
});

router.post('/add', (req, res, next) => {
    prisma.User.create({
        data: {
            name: req.body.name,
            pass: req.body.pass
        }
    })
    .then(() => {
        res.redirect('/users');
    });
});

// 編集 (Update)
router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id
    prisma.User.findUnique(
        { where: { id: +id }}
    )
    .then(usr => {
        const data = {
            title: 'アカウントの編集',
            user: usr
        };
        res.render('users/edit', data);
    });
});

router.post('/edit', (req, res, next) => {
    const {id, name, pass, mail, age} = req.body
    prisma.User.update({
        where: { id: +id },
        data: {
            name: name,
            pass: pass
        }
    })
    .then(() => {
        res.redirect('/users');
    });
});

// 削除
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id
    prisma.User.findUnique(
        { where: { id: +id }}
    )
    .then( user => {
        const data = {
            title: 'アカウントの削除',
            user: user
        };
        res.render('users/delete', data);
    });
});

router.post('/delete', (req, res, next) => {
    prisma.User.delete({
        where: { id: +req.body.id }
    })
    .then(() => {
        res.redirect('/users');
    });
});


// ログイン
router.get('/login', (req, res, next) => {
    var data = {
        title: 'ログイン',
        content: '名前とパスワードを入れてください。'
    };
    res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
    prisma.User.findMany({                      // 名前とパスワードが一致するものを抽出
        where: {
            name: req.body.name,
            pass: req.body.pass,
        }
    })
    .then( usr => {                             // usr に配列として格納
        if (usr != null && usr[0] != null) {    // usr がnull以外（= 名前とパスワードが一致）
            req.session.login = usr[0]          // req.session.login に name を格納
            let back = req.session.back
            if (back == null) {
                back = '/'
            }
            res.redirect(back)
        }
        else {
            var data = {
                title: 'ログイン',
                content: '名前かパスワードに問題があります。再度入力ください。'
            }
            res.render('users/login', data)
        }
    })
})

module.exports = router;