/*
 * @Author: Abraham
 * @Date: 2018-09-27 01:07:14
 * @LastEditors: Abraham
 * @LastEditTime: 2018-09-27 01:30:33
 * @Description: 连接neo4j数据库
 * @Username: cj1406942109
 * @Email: 1406942109@qq.com
 * @GitHub: https://github.com/cj1406942109
 */

const config = require('config-lite')(__dirname)
const neo4j = require('neo4j-driver').v1

const dbConfig = config.db
const driver = neo4j.driver(dbConfig.uri, neo4j.auth.basic(dbConfig.user, dbConfig.password))

driver.onCompleted = () => {
    console.log('Driver created')
}

driver.onError = err => {
    console.log(err)
}

function test() {
    const session = driver.session()
    return session.run(
        'MATCH (n) RETURN n LIMIT 1'
    ).then(result => {
        session.close()
        // ... on application exit:
        driver.close()
        console.log(JSON.stringify(result.records))
    }).catch(err => {
        session.close()
        // ... on application exit:
        driver.close()
        throw err
    })
}

module.exports = {
    test
}
