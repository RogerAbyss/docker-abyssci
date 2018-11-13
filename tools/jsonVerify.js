/**
 * ftp json校验
 * 遍历目录下 /json/*.json 并进行校验
 * @copyright 2018 by Abyss
 * roger_ren@qq.com
 */

var fs = require('fs');
var path = require('path');

console.log("json校验器启动...")
console.log("自动校验 所有后缀为.json的文件, 请确定编码为utf-8且json格式正确.")

/** 遍历json文件夹 */
fileDisplay(path.resolve('json'));

function fileDisplay(filePath){
  fs.readdir(filePath,function(err,files){
      if(err){
          console.warn(err)
      }else{
          files.forEach(function(filename){
              var filedir = path.join(filePath,filename);
              fs.stat(filedir,function(eror,stats){
                  if(eror){
                      console.warn('获取文件stats失败');
                  }else{
                    /** 如果是一个文件 */
                      var isFile = stats.isFile();
                    /** 如果是一个文件夹 */
                      var isDir = stats.isDirectory();

                      if(isFile){
                          if(path.extname(filedir) == ".json") {
                            /** json校验 */
                            fs.readFile(filedir,'utf8',function (err, data) {
                              if(err) console.log(err);
                            
                              try {
                                var tryJson=JSON.parse(data);
                                // console.log(filedir + " json校验通过");
                              } catch(err) {
                                  console.log("[ERROR]" + filedir + " json校验不通过")
                              }
  
                              var json=JSON.parse(data);
                            });
                          }
                      }
                      
                      if(isDir){
                        /** 递归 */
                          fileDisplay(filedir);
                      }
                  }
              })
          });
      }
  });
}