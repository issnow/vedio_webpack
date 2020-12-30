/**
 * index.js:webpack入口文件
 * 1.运行指令,生产环境会将代码压缩
 * 开发环境:webpack -o build --mode=development    找src下的index.js文件输出到build目录下的main.js
 * 生产环境:webpack -o build --mode=production    找src下的index.js文件输出到build目录下的main.js
 * 2.结论
 *  webpack能处理js资源和json资源,不能处理css/img等其他资源
 *  生产环境会将代码压缩,
 *  将es6模块化编译成浏览器能识别的模块化
 *  
 */
import data from './data.json'
import './index.css'
console.log(data)
function add(x,y) {
  return x+y
}
console.log(add(1,2))

class F {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log(this.name)
  }
}

let f = new F('cg', 29)
f.say()