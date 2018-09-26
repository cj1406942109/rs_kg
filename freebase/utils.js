/*
 * @Author: Abraham
 * @Date: 2018-09-26 21:24:51
 * @LastEditors: Abraham
 * @LastEditTime: 2018-09-27 00:19:51
 * @Description: freebase related util file
 * @Username: cj1406942109
 * @Email: 1406942109@qq.com
 * @GitHub: https://github.com/cj1406942109
 */

const fs = require('fs')
const readline = require('readline')

/*
fs.open(basePath + freebasePath, 'r', (err, fd) => {
    // fd，文件描述符可用于读取数据、写入数据、或查看文件信息
    if (err) {
        throw err
    }

    // 文件处理逻辑代码
    // ... 

    // 必须关闭文件描述符！
    fs.close(fd, (err) => {
        if (err) {
            throw err
        }
    })
})
*/

/**
 * 打印文件前row行的内容
 * @param {string} path (文件路径)
 * @param {int} row (要打印的行数，默认为5)
 */
function printFile (path, row=5) {
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
    })
    
    let lineCount = 0
    console.log('readline start... ')
    rl.on('line', (line) => {
        lineCount++
        if (lineCount > row) {
            rl.close()
        } else {
            console.log(`文件的第${lineCount}行内容：${line}`);
        }
    })
    
    rl.on('close', () => {
        console.log('readline stop... ')
    })
}

// 模块导出
module.exports = {
    printFile
}
