/*
 * @Author: Abraham
 * @Date: 2018-09-27 00:06:01
 * @LastEditors: Abraham
 * @LastEditTime: 2018-09-29 10:51:04
 * @Description: 测试文件
 * @Username: cj1406942109
 * @Email: 1406942109@qq.com
 * @GitHub: https://github.com/cj1406942109
 */

const utils = require('./utils')

const basePath = 'H:/KG/'
const freebasePath = 'freebase-rdf-latest/freebase-rdf-latest'
const freebaseGzPath = 'G:/freebase-rdf-latest.gz'

// utils.printFile(basePath + freebasePath)
// utils.getTriple(basePath + freebasePath, 'm.03cm0hv')
// utils.splitFile(basePath + freebasePath)
// utils.parseNTriple()
utils.parseNTripleFromStream()
