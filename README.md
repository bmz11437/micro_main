<!--
 * @Author: weicong
 * @Date: 2020-07-17 09:34:12
 * @LastEditTime: 2020-07-20 16:45:47
 * @LastEditors: weicong
 * @Description:
-->

# platform 1.0

# 建设目的：优秀的前端 geeker

## 开发工具

- nodejs >= 10
- vscode（插件安装 vetur、eslint、prettier、gitlens、Hjson、koroFileHeader）
- yarn (不能用 npm 安装依赖)

## 功能

- commit 规范
- 图标管理，iconfont 和 svg
- 单元测试
- 托管 github
- 全局组件文件化

## 目录组织规范

```
├── public
│ └── config
    ├── assets--------------------------- 系统全局资源
    ├── modules-------------------------- 各个子系统配置文件
    ├── appConfig.json------------------- 系统全局配置文件
│ ├── favicon.ico
│ └── index.html
├── src
│ ├── App.vue --------------------------- Root 组件
│ ├── api ------------------------------- 接口管理
│ ├── assets ---------------------------- 静态文件，一般用来放图片
│ ├── components ------------------------ 全局组件
│ │ ├── demo ---------------------------- 全局组件 demo 示例
│ ├── svg ------------------------------- svg 管理
│ ├── icon ------------------------------ icon 管理
│ ├── register -------------------------- register 管理，注册全局组件，全局属性，全局指令和全局过滤器
│ ├── layout ---------------------------- layout 层管理
│ ├── main.js --------------------------- app 入口
│ ├── router ---------------------------  路由表管理
│ ├── store ----------------------------  vuex
│ ├── styles ---------------------------- 全局 css 和 scss 函数变量
│ ├── utils ----------------------------- 工具函数管理
│ └── views ----------------------------- 子系统页面模块
├── vue.config.js
├── babel.config.js
├── jsconfig.json
├── package.json
├── postcss.config.js
├── prettier.config.js
├── yarn.lock
```

## 原则

- 目录结构参照目前结构
- 开发的代码格式统一(本地 eslint 语法配置和插件统一掉)
- 命名优先语义化，查找英文相关单词，命名规范：动词+名称或者名称
- 全局组件采用一个通用前缀，每添加一个全局组件在 demo 中添加一个示例
- views 目录下面采用**PascalCase**命名方式
- 每个组件必须写上 name，采用**camelCase**命名方式，且这个名称最好唯一，相同会影响 debugger（讨论）
- component 中属性（方法）建议编写顺序： `mixins`->`components`->`props`->`data`->`钩子`->`computed`->`watch`->`methods`
- 组件声明周期钩子按照顺序书写： `beforeCreate -> created -> beforeMount -> mounted -beforeUpdate -> updated -> actived -> deactived -> beforeDestory -> destoryed`
- props 传递必须加上 type 和 default，不可以简写
- 样式必须加上 scoped 属性，覆写 iview 样式使用 **deep+scoped**，最好在全局样式表中统一覆写**styles/iview.scss**
- 主动触发类事件(`click`、`input`、`enter`)响应方法统一命名为`handlexxx`(讨论，收集一套动词库)
- 后台通信类方法统一按请求方式命名 `getXXX`、`postXXX`、`putXXX`、`deleteXXX`
- 无用代码不注释，全部删除，未完成任务注明 todo
- commit 提交按照功能提交，每完成一个功能 commit 一次，但不需要 push
- 避免 mixin，最好使用 export，除非必要，mixin 文件应该和当前文件放置在一起
- 复杂逻辑和怪异地方最好写上注释
- 文章统一采用 markdown 格式书写，配图和色彩采用指定网站，markdown（markdown 书写主要用于一些项目说明等）
  书写平台：https://mdnice.com/
  配图网站：https://www.behance.net/
  配色网站：https://picular.co/

## 计划

### 前端

- 系统权限控制，缓存
- SOE 优化
- 图片加载优化(压缩，cdn，图床)
- 持续集成
- 开发一个基于现有项目的脚手架
- 业务组件使用上传到 npm
- 地图组件开发
- 微前端应用
- ~~babel 插件和 loader 开发~~(看计划)
- 三维可视化框架搭建(系统外面 ui 建设)
- ~~ui 组件二次封装~~
- 日志模块封装(前端埋点做准备)
- 主题切换(第三方 ui 库？)
- 添加不同的 Layout
- 工具类封装，优先采用现有工具库 lodash，**自编工具函数**必须使用单元测试
- 引入第三方优秀插件

### 后台

- 日志模块
- token 或者 session
- history 模式
- nginx
- http 层封装
- 连接数据库层封装
- model 和 controll 层封装
- 读写库封装
- 优秀三方插件

## 解决方案总结

- 设置解决方案专题(对外屏蔽)
- 微前端
- 持续集成
- 地图组件库

## 资源网站专题

- 基础
- webpack
- babel
- gis
- 3D
- vue
- react
- nodejs
- 职业习惯
