# React 二级选择器组件

这是一个基于 React 19 + TypeScript + Webpack + Ant Design 的二级选择器组件演示项目。

## 功能特性

### 🎯 核心功能
- **默认数据展示**: 预设的地区数据，包含北京、上海等城市及其下属区域
- **异步数据加载**: 使用 `setTimeout` 模拟网络请求，支持动态加载数据
- **数据拼接**: 支持将默认数据与异步获取的数据进行合并
- **搜索功能**: 支持模糊搜索和精确匹配
- **级联选择**: 支持二级级联选择，鼠标悬停展开
- **美观的UI**: 现代化的界面设计，包含渐变背景和阴影效果

## 项目结构

```
src/
├── components/
│   └── CascaderSelector.tsx          # 二级选择器组件
├── App.tsx                           # 主应用组件
└── index.tsx                         # 应用入口
```

## 技术栈

- **React 19**: 最新的React版本
- **TypeScript**: 类型安全的JavaScript
- **Ant Design 5**: 企业级UI组件库
- **Webpack 5**: 模块打包工具
- **Less**: CSS预处理器

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
# 或者
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 使用说明

### 功能演示
1. **默认数据**: 页面加载时显示预设的地区数据
2. **异步加载**: 点击"加载完整数据"按钮获取更多数据
3. **搜索**: 在输入框中输入关键词进行搜索
4. **重置**: 点击"重置"按钮恢复到默认状态

## 组件API

### CascaderSelector 组件

#### Props
- 无外部props，所有状态内部管理

#### 状态
- `options`: 选择器选项数据
- `loading`: 加载状态
- `selectedValue`: 当前选中的值

#### 方法
- `loadFullData()`: 加载完整数据
- `resetData()`: 重置数据
- `loadAsyncData()`: 异步加载子级数据

## 数据格式

```typescript
interface CascaderOption {
  value: string;           // 选项值
  label: string;           // 显示标签
  children?: CascaderOption[]; // 子选项
  isLeaf?: boolean;        // 是否为叶子节点
  loading?: boolean;       // 加载状态
  disabled?: boolean;      // 是否禁用
}
```

## 样式特性

- **现代化设计**: 使用卡片布局和阴影效果
- **渐变背景**: 选择结果区域使用渐变背景
- **响应式**: 支持移动端和桌面端
- **动画效果**: 加载状态和交互反馈
- **主题色彩**: 使用Ant Design的主题色彩系统

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 开发说明

### 添加新的数据源
1. 在组件中定义新的数据数组
2. 在 `loadFullData` 方法中添加数据合并逻辑
3. 更新相关的类型定义

### 自定义样式
1. 修改组件内的 `style` 属性
2. 或创建独立的样式文件
3. 使用Ant Design的主题定制功能

### 扩展功能
1. 添加新的状态管理
2. 实现新的交互逻辑
3. 集成外部API数据源

## 许可证

MIT License 