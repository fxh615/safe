> 这里是石原子前端的基础建设包

这里有: 
- 命令行工具用来创建，生成，以及部署
- request包对接口请求做统一的拦截

***
## 如何使用该工程
这是一个基于larna创建的monorepos的工程， 所有的包都在packages里，
### 准备工作
 先要保证cli可用， 可用已经全局安装的@safe/cli, 当然也可以使用本地的：
 - 首先在safe的根目录下 执行 yarn build:cli
 - cd到packages/cli下， 执行pwd， 复制路径
 - 在任何目录下， 或者是cd到packages下， 执行yarn add [前面复制的路径] -global 
 - 然后执行safe， 有反馈说明可全局使用该命令了

### 创建包
 - 然后在packages下 执行safe new [包名] --type library
 - 这样你就创建了一个工具包

### 打包
    在safe根目录下执行
    yarn build [packages下的文件夹名]， 就可以打包该包
    比如：
    yarn build request

    或者cd到包的目录下执行 yarn build

    注意cli包的打包命令是 yarn build:cli 因为需要安装依赖包， 所以单独有命令行

### 调试 
如果是项目中使用， 可以用yarn add [包的路径]

### 部署
联系夏芸吧， 这个部署就先不放开了，后续讨论出包发布的规范和流程后再放开

