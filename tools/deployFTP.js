/**
 * ftp上传
 * 
 * Function
 * 检查git是否修改, 上传覆盖修改过的文件到FTP
 * 参数: ftp密码 ftp用户名 ftpHOST ftp端口号(21)
 * 
 * @copyright 2018 by Abyss
 * roger_ren@qq.com
 */
 var Client = require('ftp');
var Shell = require('shelljs');
var fs = require('fs');
var path = require('path');

let USER = process.argv[3]
let HOST = process.argv[4]
let PORT = process.argv[5]

/**
 * 获取差异文件进行分析
 * */
Shell.exec('git diff  HEAD HEAD^ --stat > diff.txt')

/** 
 * 修改过的文件, 动态分析后只上传修改过的文件 
 * */
var result = [];

fs.readFile('diff.txt','utf8',function (err, data) {
  if(err) console.log(err);

  var list = data.split("\n");

  list.map(i => {
    if(i.indexOf("|") >= 0) {
      let = item = i.split("|");
      var file = item[0].replace(/\s+/g,"")

      /**
       * 只关注json下的文件, 且只关注.json
       */
      if(file.indexOf("json/") == 0 && path.extname(path.join(path.resolve() + file)) == ".json") {
        result.push(file)
        // console.log("修改文件: " + file)
      }
    }
  })
});

/**
 * 连接FTP上传文件
 */
var c = new Client();
c.on('ready', function() {

  console.log("成功访问ftp目录!")

  result.map(i => {
    console.log("准备上传文件: " + i + " ==> " + i.replace("json/",""))
    c.put(i, i.replace("json/",""), function(err) {
      if (err) throw err;
      console.log("[PASS]上传成功: " + i)
      c.end();
    });
  })

  c.end();
});

/**
 * process.argv[2]: 从shell获取环境变量当中的参数
 * 环境变量获取时, 经试验发现需要做base64!!
 */
console.log(USER + "准备连接FTP服务器: " + HOST + ":" + PORT)
var pwd = new Buffer.from(process.argv[2], 'base64').toString()
c.connect({host:HOST,port:PORT,user:USER,password:pwd});