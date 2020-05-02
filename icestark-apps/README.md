# micro frontends - icestark-app 微前端方案，飞冰实践方案

- root-app 主应用，
- angular9-app 子应用，angular9 实现
- react15-app
- react16-app
- vue2-app


## 使用

- 启动调试服务: `npm start`
- 构建 dist: `npm run build`

## 目录结构

- 应用配置: `src/app.js`
- 路由配置: `src/routes.js`
- 布局文件: `src/layouts`
- 通用组件: `src/components`
- 页面文件: `src/pages`

## 效果图

![screenshot](https://img.alicdn.com/tfs/TB14igtaVT7gK0jSZFpXXaTkpXa-2878-1368.png)

## 问题：
1. 主应用与子应用的跨域问题 - （待实现主应用的 webpack 跨域）
2. 切换路由到子应用，子应用未启用情况下，再点击 Home，会跳到 '@/components/NotFound' 中，二次点击 Home 则正常
