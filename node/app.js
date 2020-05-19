var express = require('express')
var path = require('path')

var app = express()

// post body 解析
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

// 静态资源目录
app.use(express.static(path.join(__dirname, 'public')))

// 接口跨域
app.use('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost")
  res.header('Access-Control-Allow-Headers', 'Content-type,Authorization')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
  req.method.toLowerCase() == 'options' ? res.status(200).send() : next()
})

// // token 验证
var tokener = require('./util/tokener')
app.use('/*/account', function (req, res, next) {
  var token = req.header('Authorization'),
    key = tokener.verifyToken(token),
    email = req.body.email
  if (key === email) {
    next()
  } else {
    res.status(401).send()
  }
})

// 设置路由中间件
var indexRouter = require('./routes/index'),
  userRouter = require('./routes/user'),
  merchartRouter = require('./routes/merchart')
// app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/merchart', merchartRouter)

module.exports = app