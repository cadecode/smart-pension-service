var http = require('http')

module.exports = function (path, data, callback) {
    var opt = {
        host: 'localhost',
        port: '8080',
        method: 'post',
        path: path,
        headers: {
            "Content-Type": 'application/json'
        }
    }
    http.request(opt, function (res) {
        var resData = ''
        res.on('data', function (data) {
            resData += data
        }).on("end", function () {
            callback(resData)
        })
    }).on('error', function (err) {
        callback()
    }).end(JSON.stringify(data))
}