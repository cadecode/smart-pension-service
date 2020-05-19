var express = require('express')
var router = express.Router()

var multiparty = require('multiparty')
var fs = require('fs')

var poster = require('../util/poster')
var tokener = require('../util/tokener')

router.all('/login/group', function (req, res, next) {
    poster('/group/login', req.body, function (data) {
        if (data) {
            var oData = JSON.parse(data),
                token = tokener.signToken({
                    key: oData.email
                })
            res.status(200).send({
                type: 'group',
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

router.all('/login/shop', function (req, res, next) {

})

router.all('/register/group', function (req, res, next) {
    var body = req.body
    body.registerDate = new Date().toLocaleDateString()
    body.image = '/default/default.png'
    poster('/group/register/', body, function (data) {
        if (data) {
            res.status(200).send()
        } else {
            res.status(400).send()
        }
    })
})

router.all('/register/shop', function (req, res, next) {

})

router.all('/account/group', function (req, res, next) {
    poster('/group/account', req.body, function (data) {
        if (data) {
            var oData = JSON.parse(data)
            res.status(200).send({
                avatar: oData.avatar,
                name: oData.name,
                address: oData.address,
                email: oData.email,
                image: oData.image,
                principalName: oData.principalName,
                contactTel: oData.contactTel,
                price: oData.price,
                corporateName: oData.corporateName,
                corporateId: oData.corporateId,
                creditCode: oData.creditCode,
                foundDate: oData.foundDate,
                registerDate: oData.registerDate
            })
        } else {
            res.status(400).send()
        }
    })
})

router.all('/account/shop', function (req, res, next) {

})

router.all('/recommend/group', function (req, res, next) {
    poster('/group/recommend', req.body, function (data) {
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(400).send()
        }
    })
})

router.all('/recommend/service', function (req, res, next) {

})

router.all('/info/group', function (req, res, next) {
    poster('/group/info', req.body, function (data) {
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(400).send()
        }
    })
})

router.all('/info/service', function (req, res, next) {

})

router.all('/groups', function (req, res, next) {
    poster('/groups', req.body, function (data) {
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(400).send()
        }
    })
})
module.exports = router