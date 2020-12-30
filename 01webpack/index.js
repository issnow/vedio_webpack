// 引入js资源
import $ from 'jquery'

// 引入样式资源
import './index.less'

// 图片字体等等

// 模块(通过import或require引入进来的包)-->chunk(代码块)-->bundle(输出文件)


$('#title').on('click', ()=>{
  $('body').css('backgroundColor', 'deeppink')
})