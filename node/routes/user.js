var express = require('express')
var router = express.Router()

var multiparty = require('multiparty')
var fs = require('fs')

var poster = require('../util/poster')
var tokener = require('../util/tokener')

router.all('/login', function (req, res, next) {
    poster('/user/login', req.body, function (data) {
        if (data) {
            var oData = JSON.parse(data),
                token = tokener.signToken({
                    key: oData.email
                })
            res.status(200).send({
                type: 'user',
                email: oData.email,
                name: oData.name,
                avatar: oData.avatar,
                flag: true,
                token
            })
        } else {
            res.status(400).send()
        }
    })
})

router.all('/register', function (req, res, next) {
    var body = req.body
    body.registerDate = new Date().toLocaleDateString()
    poster('/user/register', body, function (data) {
        if (data) {
            res.status(200).send()
        } else {
            res.status(400).send()
        }
    })
})

router.all('/account', function (req, res, next) {
    poster('/user/account', req.body, function (data) {
        if (data) {
            var oData = JSON.parse(data)
            res.status(200).send({
                email: oData.email,
                name: oData.name,
                avatar: oData.avatar,
                registerDate: oData.registerDate
            })
        } else {
            res.status(400).send()
        }
    })
})

module.exports = router