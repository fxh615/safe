组件库第一版的修改意见：
1. 将test和demo文件删除
2. 解决所有ts错误，可以用 as any先跳过
3. 组件需要加载对应文件下种的style/index.less
4. 遇到omit的代码，改成： import {omit} from 'ramda'; omit(['', ''], data);
5. 遇到merge的代码，改成：import {merge} from 'ramda';
6. 组件的示例代码都写在Readme.md中，参考button的。
7. yarn styleguide:  http://localhost:6060/

## 关于md的规范
- 一个组件，demo很多的情况下， 可以将组件示例代码放进demo文件夹， 如https://codeup.aliyun.com/6193102a4d2b371c479a9119/CloudService/frontend/safe/tree/dev-xiayun/packages/components/src/icons/demo
- 组件的md入口只能是一个， 使用@example指定是无效的， 所以可以在md中 如：https://codeup.aliyun.com/6193102a4d2b371c479a9119/CloudService/frontend/safe/blob/dev-xiayun/packages%2Fcomponents%2Fsrc%2Ficons%2Findex.md， 将demo中的js导入进去
- 以上提供demo是用js的方式， 对于demo不强求是ts还是js， 越快验证菜重要
- md之后会全部迁移到websites中， 作为未来的组件文档。
- md中如何写js/ts的代码，可以参考：https://mdxjs.com/table-of-components/ 或者 https://github.com/styleguidist/react-styleguidist/blob/master/docs/Documenting.md。 其实就是mdx的语法， 方便在md文件中使用react组件而已， 大家可以照着这思路去找方法。
- 无论是目前的styleguidist 还是马上的docusaurus， 都是要用到mdx的， 区别在于对于mdx的读取方式， styleguidist优秀在于，自动的组件接口生成，但是缺点是， 对外提供的功能不多， 所以不要直接复制antd的demos文件夹， 请参考我前面给出的demo文件夹的示例。 docusaurus的有点在于，文档交互，布局等更优秀和自由， 但是不会自动生成组件的接口， 这个也是我马上要解决的事情。
