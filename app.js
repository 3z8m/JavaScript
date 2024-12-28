var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');     // 追加

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cgRouter = require('./routes/cg');                              // CGメニュー
var graphRouter = require('./routes/graph');                        // グラフ
var threeFpsRouter = require('./routes/three_fps');                 // 金属箔工場FPS
var threeCoilRouter = require('./routes/three_coil');               // コイル移動
var threeMoveRouter = require('./routes/three_move');               // 工場見学 (2024.8.18)
var p5rollingRouter = require('./routes/p5_rolling');               // p5 圧延形状
var threeSteelcodeRouter = require('./routes/three_steelcode');     // 鋼種一覧
var threeHikariWorksRouter = require('./routes/three_hikariworks'); // 光製鉄所
var threeSteelplantRouter = require('./routes/three_steelplant');   // 製鋼工場
//var threeCubeTextures = require('./routes/three_cubetextures');   // 6面背景
var babylonMillRouter = require('./routes/babylon_mill');           // babylon 第１工場（センサー）
var hakusysRouter = require('./routes/hakusys');                    // 現有コイルリスト
var destinationRouter = require('./routes/destination');            // 行先ボード

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 追加
var session_opt = {
  secret: 'keyboard cat',             // ハッシュキー
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }  // クッキー保持時間 = 1時間
}
app.use(session(session_opt))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cg', cgRouter);                               //追加
app.use('/graph', graphRouter);                         //追加
app.use('/three_fps', threeFpsRouter);                  //追加
app.use('/three_coil', threeCoilRouter);                //追加
app.use('/three_move', threeMoveRouter);                //追加
app.use('/p5_rolling', p5rollingRouter);                //追加
app.use('/three_steelcode', threeSteelcodeRouter);      //追加
app.use('/three_hikariworks', threeHikariWorksRouter);  //追加
app.use('/three_steelplant', threeSteelplantRouter);    //追加
//app.use('/three_cubetextures', threeCubeTextures);    //追加
app.use('/babylon_mill', babylonMillRouter);            //追加
app.use('/hakusys', hakusysRouter);                     //追加
app.use('/destination', destinationRouter);             //追加

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
