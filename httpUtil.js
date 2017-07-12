/**
 * Created by xueyingchen.
 */
const request = require('superagent')

/**
 * 底层xhr函数，返回可加error-handle和url参数的函数
 * @param {Function} errHandler
 * @return {Function} errXhrWrapper
 */
const baseXhr = (errHandler) => ({url, method = 'GET', body = null}) =>
    new Promise((resolve, reject) =>
        request(method, url)
            .send(body)
            .end((err, res) => {
                if (res.statusCode === 200) {
                    if (res.body.code === 200) {


                        console.log(res.body.result)
                        resolve(res.body.result)


                    } else {
                        reject(res.body.message)
                    }
                } else {
                    reject(res.body.message)
                }
            })
    ).catch(errHandler)

/**
 * error-handler是直接更改位于root的toast的状态
 * @param {String} msg
 * @return void
 */
const errHandler = (msg) => {
    throw new Error(msg)
}

/**
 * 具体方法的抽象函数，已经有了默认的错误处理函数
 * @type {Function}
 */
const errorXhr = baseXhr(errHandler)

/**
 * get函数
 * @param {String} url
 * @return {Promise}
 */
module.exports = {
    httpGet: (url) => errorXhr({url}),
    httpPost: (url, body) => errorXhr({url, method: 'POST', body}),
    httpPut: (url, body) => errorXhr({url, method: 'PUT', body}),
    httpDel: (url, body) => errorXhr({url, method: 'DELETE', body}),
    baseURL: '123.207.222.112:5001/api/'
}

