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
