// postcss的配置文件,使用js来转换样式的工具
// postcss是基于node.js运行的一个出来CSS的工具，所以它的配置文件也运行在node.js中

// 配置文件需要导出一个对象
module.exports = {
  // 需要配置的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    // vuecli默认配置了autoprefixer，再配置会有警告
    // autoprefixer: {
    //   // browsers用来配置兼容到的系统或者浏览器环境
    //   // 配置没问题，但写在这里会有控制台警告
    //   // 为什么？因为Vuecli是通过项目中的.browserslistrc文件来配置要兼容的环境信息
    //   // 写到.browserslistrc中
    //   browsers: ['Android>=4.0', 'ios>=8']
    // },
    // 把px 转换为rem
    'postcss-pxtorem': {
      // 转换的根元素基准值
      // 正常情况下按照设计稿来
      // 750宽的设计稿，写75
      // 375宽，37.5
      // vant组件库是基于375写的
      // 移动端一般是基于iphone6/7/8为原型设计的
      // vant组件库是基于逻辑像素375写的
      // 设计稿是物理像素750
      // 所以如果要设置成75，那么我们就可以在设计稿中测量多少就写多少，但是Vant的样式会变小
      // 所以我们必须设置成37.5
      // 所以需要测量单位除以2
      rootValue: 37.5,
      // 配置需要转换的CSS的属性，*就是全部
      propList: ['*']
    }
  }
}
