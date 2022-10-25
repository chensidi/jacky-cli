# jacky-cli工具

## 介绍

这是一款将commitlint，husky，eslint集成一体的脚手架工具，如果你的项目需要一定的代码要求，git提交规范，但是你又不想在繁琐的配置项中手动挣扎配置，那么这个工具就能让你轻松通过命令行实现给你的项目加上lint护盾

> 因为本人英文名叫 jacky，所以该脚手架就以此为名了😂🤣😅

## 安装

```shell
yarn add jacky-cli -g
```

## 使用方式

目前脚手架支持对项目添加整个git规范依赖，和仅添加eslint依赖，后续功能会逐步增加...，可以通过 `jacky -h` 查看相关命令

### 添加git规范

命令行： **jacky addGitRules**
在控制台执行后，脚手架会自动安装上相关git提交流程的依赖，然后会在根目录下生成对应的如，husky, .eslintrc.js, commitlint.config.js, .cz-config.js文件，当然这些文件代表什么意义，你应该是清楚的

`husky`: 是git提交过程中的关卡，里面内置了钩子，会在git commit阶段触发脚本

`.eslintrc.js`: eslint 规则文件，具体见官网
`.commitlint.config.js`: git提交日志相关配置，对每条commit做约束的
`.cz-config.js`: 安装完 jacky-cli 脚手架后，会生成这个文件，因为jacky-cli 会在你的项目中添加 cz-customizable 依赖，这个依赖是对 git 命令行的增强，你可以使用 git cz 完成一次格式非常规范的提交，而这个文件是对 git cz在提交时做出的自定义配置，具体参考 [cz-customizable的github仓库](https://github.com/leoforfree/cz-customizable)
  
### 添加eslint依赖

如果你不需要对git提交做约束，仅需要对项目添加eslint检查js代码，那么jacky也能做到

命令行：**jakcy addEslint**

在命令行执行过程中，会询问你选择某种js框架去做lint，目前仅内置了react，vue两大主流框架，比如你的项目是基于vue的，那么你就可以选择vue选项，eslint就会包含对vue框架的语法检测，同时脚手架会询问你是否会用到ts，并以ts的规范来检测你的code。

### 添加mock数据功能

命令行：***jacky addMock*

mock是干嘛的就不多说了，相信大家都是老手了，当使用这条命令行后，系统会在你的根目录下生成 mock 文件夹，里面会存放一个入口 index.js 文件，和一份dome示例的mock数据，并且脚手架会帮你自动下载好mock依赖包

在下载过程中，cli会询问你几个问题

1. mock数据存放的目录名，并根据该目录名生成一个文件夹在根目录；
2. cli会询问你使用 TS 或者 JS
3. 构建环境是属于 Vite 还是 Webpack?

你按照提示选择对应的选项即可。

使用方式很简单，在你项目的入口文件，一般都是 src/index.js 或 main.js，在入口js里导入根目录下的mock/index.js，这样你所有编写的mock数据都被成功注入了，此后你在mock文件夹里添加任意的数据文件，mock工具都能帮你全部递归注册，但是你添加的这些数据文件需要和demo.js中的导出对象格式保持一致

> 目前支持在 Vite 和 Webpack 环境下注册该功能
