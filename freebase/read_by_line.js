const fs = require('fs')
const readline = require('readline')

const basePath = 'H:/KG/'
const freebasePath = 'freebase-rdf-latest/freebase-rdf-latest'
const freebaseGzPath = 'freebase-rdf-latest.gz'

/*
fs.open(basePath + freebasePath, 'r', (err, fd) => {
    // fd，文件描述符可用于读取数据、写入数据、或查看文件信息
    if (err) {
        throw err
    }

    // 文件处理逻辑代码


    // 必须关闭文件描述符！
    fs.close(fd, (err) => {
        if (err) {
            throw err
        }
    })
})
*/

const rl = readline.createInterface({
    input: fs.createReadStream(basePath + freebasePath),
    crlfDelay: Infinity
})

let lineCount = 0

rl.on('line', (line) => {
    lineCount++
    if (lineCount > 10) {
        rl.close()
    } else {
        console.log(`文件的第${lineCount}行内容：${line}`);
    }
})

rl.on('close', () => {
    console.log('readline close... ')
})
