# i

> i: 永远在线的个人主页 Your homepage always online

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

[![Build Status](https://travis-ci.org/jeff-tian/i.svg?branch=master)](https://travis-ci.org/jeff-tian/i)

### 解构此库：

- **打包工具 webpack**: webpack 是一个代码打包工具，它甚至可以把项目所有的依赖放进一个 `.js` 文件里
- **开发语言 typescript**: 微软开发的强类型语言，它是 `javascript` 的一个超集。本项目的 webpack 里使用了 `ts-loader` 把它转译成 `javascript`
- **部署在 `Github pages`**：这是一个静态站点托管提供者。
- **前端框架 React**: React 是一个组件化的前端框架，大大提高了可重用性，让页面的开发就像搭积木一样。
- **UI 框架 ant design**: Ant Design 是一个优秀的样式库。

### 本地开发：

```shell
npm run server
```

### 创建 secure token

**注意**: 如果你把 token 明文写在 `.travis` 文件中，一旦提交代码，这个 token 将被自动删除，因此会在 travis deploy 过程中碰到 token 无效的错误。

步骤请参考：https://docs.travis-ci.com/user/environment-variables#defining-encrypted-variables-in-travisyml

```shell
gem install travis
travis login
# 输入 github 用户名密码
# 登录成功
travis encrypt github_token=<token> --add env.matrix
```
