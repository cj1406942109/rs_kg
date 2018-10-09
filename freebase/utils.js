/*
 * @Author: Abraham
 * @Date: 2018-09-26 21:24:51
 * @LastEditors: Abraham
 * @LastEditTime: 2018-09-29 10:49:42
 * @Description: freebase related util file
 * @Username: cj1406942109
 * @Email: 1406942109@qq.com
 * @GitHub: https://github.com/cj1406942109
 */

const fs = require('fs')
const readline = require('readline')

const N3 = require('n3')

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
function printFile(path, row = 5) {
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

/**
 * 根据三元组MID获取文件中的三元组
 * @param {string} path （文件路径）
 * @param {string} MID （三元组MID）
 */
function getTriple(path, MID) {
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
    })

    let lineCount = 0
    console.log('start finding triple... ')
    rl.on('line', (line) => {
        lineCount++
        let [subject, predicates, object] = line.split('\t')
        // console.log(predicates)
        if (subject.indexOf(MID) >= 0) {
            rl.close()
            console.log(line)
            return line
        } else {
            console.log(`正在查找文件的第${lineCount}行...`);
        }
    })

    rl.on('close', () => {
        console.log(`the triple with MID:${MID} found... `)
    })
}

function splitFile(path, fileLength = 10000) {
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
    })
    let lineCount = 0
    rl.on('line', (line) => {
        lineCount++
        if (lineCount <= fileLength) {
            lineCount % 100 == 0 ? console.log(`正在读取原文件的第${lineCount}行...`) : ''
            // return line
            try {
                fs.appendFileSync('./data/dataset', line + '\n', 'utf8')
            } catch (err) {
                throw err
            }
        } else {
            rl.close()
        }
    })

    rl.on('close', () => {
        console.log(`文件分割完毕，新文件有${fileLength}行`)
    })
}

function parseNTriple() {
    const parser = new N3.Parser({ format: 'N-Triples' })
    parser.parse(
        `<http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.object.type>	<http://rdf.freebase.com/ns/type.property>	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.object.name>	"footballdb ID"@en	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.property.unique>	"true"	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.property.expected_type>	<http://rdf.freebase.com/ns/type.enumeration>	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/2000/01/rdf-schema#label>	"footballdb ID"@en	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://rdf.freebase.com/ns/type.property.schema>	<http://rdf.freebase.com/ns/american_football.football_player>	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#FunctionalProperty>	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/2000/01/rdf-schema#domain>	<http://rdf.freebase.com/ns/american_football.football_player>	.
    <http://rdf.freebase.com/ns/american_football.football_player.footballdb_id>	<http://www.w3.org/2000/01/rdf-schema#range>	<http://rdf.freebase.com/ns/type.enumeration>	.`,
        (error, quad, prefixes) => {
            if (quad) {
                console.log(quad);
            } else {
                console.log("# That's all, folks!", prefixes);
            }
        });
}

function parseNTripleFromStream() {
    const streamParser = new N3.StreamParser({ format: 'N-Triples' })
    rdfStream = fs.createReadStream('./data/dataset');
    rdfStream.pipe(streamParser);
    streamParser.pipe(new SlowConsumer());

    function SlowConsumer() {
        const writer = new require('stream').Writable({ objectMode: true });
        writer._write = (quad, encoding, done) => {
            console.log(quad);
            setTimeout(done, 1000);
        };
        return writer;
    }
}

// 模块导出
module.exports = {
    printFile,
    getTriple,
    splitFile,
    parseNTriple,
    parseNTripleFromStream
}
