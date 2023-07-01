
const path = require('path');
const scpClient = require('scp2') // 引入scp2
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('正在发布到服务器...')
const fsPromises = require('fs').promises;
const Client = require('ssh2').Client


const conn = new Client()
const SCP_UPLOAD_PATH = path.resolve(__dirname, './.vitepress/dist');
let PATH = "";
let server = {};
PATH = "/usr/local/nginx/html";
server = {
  host: '149.28.23.136', // 服务器的IP地址
  port: '', // 服务器端口
  username: 'root', // 用户名
  password: '', // 密码
  path: PATH, // 项目部署的服务器目标位置
  command: `rm -rf ${PATH}` // 删除命令
}
const fsRm = (filePath) => {
  return fsPromises.rm(filePath, {
    force: true,
    recursive: true
  })
}
conn.on('ready', () => {
  conn.exec(server.command, (err, stream) => {
    if (err) { throw err }
    stream.on('close', () => {
      spinner.start()
      scpClient.scp(
        SCP_UPLOAD_PATH, // 本地打包文件的位置
        {
          host: server.host,
          port: server.port,
          username: server.username,
          password: server.password,
          path: server.path
        },
        async (err) => {
          if (err) {
            console.log(chalk.red('发布失败!'))
            throw err
          } else {
            await fsRm(SCP_UPLOAD_PATH);
            console.log(chalk.green('项目发布成功!'))
          }
          spinner.stop()
        }
      )
      conn.end()
    }).on('data', (data) => {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data)
    })
  })
}).connect({
  host: server.host,
  port: server.port,
  username: server.username,
  password: server.password
})

