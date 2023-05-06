### 样式系统文件结构

-   styles/
    \_variables.scss(各种变量以及可配置设置)
    \_mixins.scss(全局 mixins)
    \_functions.scss(全局 functions)

components/
Button/
styles.scss(组件单独的样式)

### 色彩体系

系统色板 - 基础色板 + 中性色板
产品颜色 - 品牌色 + 功能色板

## 组件开发

### Button 组件

使用 sass，mixin 函数，减少重复代码
使用 React.ButtonHTMLAttributes，可以继承原生 button 标签中所有属性
使用 typescript，Partial，将所有属性变为可选
Omit 是 TypeScript3.5 新增的一个辅助类型，它的作用主要是：以一个类型为基础支持剔除某些属性，然后返回一个新类型。

## 单元测试

-   UI

-   Service

-   Unit

### Jest

断言库：jest
特点：0 配置

安装：@testing-library/react 库
安装 @types/jest
安装 @testing-library/jest-dom
新建 setupFiles.ts 文件

### git 如何合并两个分支

1. 首先，使用 `git log` 命令查看需要合并的两个 commit 的哈希值。

2. 然后，使用 `git rebase -i <commit3>` 这个 commit3 是需要合并的两个分支再前面一个分支，指的是不需要合并的 commit 的 hash 值

3. 编辑器中一般会展示 pick xxxx pick xxxx
   将需要合并的 commit 的行的开头的单词改为 `squash` 或 `fixup`，然后保存并关闭编辑器。

4. 如果选择 `squash`，则会将第二个 commit 的修改合并到第一个 commit 中，并将两个 commit 的描述合并为一个。如果选择 `fixup`，则会将第二个 commit 的修改合并到第一个 commit 中，但是第二个 commit 的描述会被忽略。

5. 如果需要修改合并后的 commit 的描述，可以在编辑器中修改合并后的 commit 的描述，然后保存并关闭编辑器。

6. 最后，使用 `git push --force` 命令将修改推送到远程仓库。

注意：使用 `git rebase` 命令会改变 commit 的哈希值，因此在合并 commit 之后，需要使用 `git push --force` 命令来强制推送修改到远程仓库。同时，如果其他人在此期间也对同一个分支进行了修改，可能会导致冲突，需要解决冲突后再进行推送。

## 图标解决方案 

react-fontawesome - 较通用的图标库(ant-design使用的就是这个)
- npm i --save @fortawesome/fontawesome-svg-core | 核心库-svg的实现
- npm i --save @fortawesome/free-solid-svg-icons | svg图标库 - 免费版里面的solid部分
- npm i --save @fortawesome/react-fontawesome | 用来显示svg的组件

