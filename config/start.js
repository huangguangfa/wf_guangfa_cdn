/**
*  auth: guangfa
*  读取文件夹并运行服务
*/

const fs = require('fs');
const path = require('path');
const util = require('util');
const sub_app_ath = path.resolve();
const sub_apps = fs.readdirSync(sub_app_ath).filter(i => /^sub|main/.test(i));

console.log('\033[42;30m 启动中 \033[40;32m 即将进入所有模块并启动服务：' + JSON.stringify(sub_apps) + 'ing...\033[0m')

const exec = util.promisify( require('child_process').exec );

async function start() {
  sub_apps.forEach( async i => {
    const { stdout, stderr } = await exec('npm run start', { cwd: path.resolve(i)});
  });
};
start();

setTimeout( () =>{
  console.log('\033[42;30m 访问 \033[40;32m http://localhost:6001 \033[0m')
},5000)
