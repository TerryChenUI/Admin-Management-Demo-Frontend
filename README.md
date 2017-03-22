# react-redux-crud demo

## 配置webpack和express服务器
npm install webpack webpack-dev-middleware webpack-hot-middleware --save-dev
webpack-dev-middleware：服务器中间组件，自动刷新页面。
webpack-hot-middleware：热更新，不刷新页面实现更新功能。
webpack.dev.config.js, webpack.prod.config.js
server express 配置文件，使用webpack-dev-middleware和webpack-hot-middleware组件

style-loader: 会把原来的 CSS 代码插入页面中的一个 style 标签中
css-loader: css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们
sass-loader: 预编译sass文件
file-loader: 
```
{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
```
url-loader: 将图片转成BASE64字符串然后内联到CSS里来降低必要的请求数
```
{ test: /\.(png|jpg)$/, loader: 'url?limit=10000' } // 不大于10KB的图片要转换成BASE64 字符串
{ test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' }, // 加载字体
{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' }, // 加载字体
{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' } // 加载字体
```


## 安装babel编译相关的javascript
babel-cli: babel工具，用命令行转码
babel-core: babel核心库
babel-loader: 加载器
babel-preset-es2015: 编译ES6
babel-preset-react: 编译JSX,
babel-preset-stage-0:  ES7不同阶段语法提案的转码规则（共有4个阶段，0-3），选装一个
babel-register: babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
```
require(babel-register);
require(./index.js);
```
使用时，必须首先加载babel-register，就不需要手动对index.js转码了。
需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。
babel-polyfill：Babel默认只转换新的JavaScript句法（syntax），使用该模块可以转码新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）

babel配置文件 (.babelrc)
```
{
  presets: [],
  plugins: []
}
``

## 配置ES6 Lint (.eslintrc)
eslint: 
eslint-plugin-import: 
eslint-plugin-react: react 语法检验
eslint-watch: 

## 配置react
react: 
react-dom: 
react-router: 

## 配置react-router
匹配语法
```
<Route path="/hello/:name">         // 匹配 /hello/terry 和 /hello/james
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/terry 和 /hello/james
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
```

browserHistory 推荐使用，服务端需要配置请求指向指定文件
hashHistory
createMemoryHistory


