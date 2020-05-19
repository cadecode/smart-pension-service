var jwt = require('jsonwebtoken')
var secret = 'smart-pension-service'

module.exports = {
    signToken: function (opt) {
        return jwt.sign(opt, secret, {
            expiresIn: '168h'
        })
    },
    verifyToken: function (token) {
        return jwt.verify(token, secret, function (err, decode) {
            if (err) {
                return 'error'
            } else {
                return decode.key
            }
        })

    }
}

