# 二级选择器使用示例

## 快速体验

项目已启动在 http://localhost:3001，您可以在浏览器中查看完整的演示效果。

## 功能演示

### 默认数据展示
- 页面加载时自动显示预设的地区数据
- 包含北京、上海、广州等城市及其下属区域

### 异步数据加载
1. 点击"加载完整数据"按钮
2. 等待1.5秒的模拟网络延迟
3. 系统会自动加载更多城市数据（深圳、杭州、成都等）
4. 数据会自动与默认数据合并

### 搜索功能
- 在输入框中输入城市或区域名称
- 支持模糊搜索和精确匹配
- 实时过滤显示匹配的选项

### 级联选择
- 鼠标悬停在城市上会自动展开子菜单
- 点击选择城市和区域
- 支持选择任意级别的选项

## 代码示例

### 基础使用

```tsx
import React from 'react';
import CascaderSelector from './components/CascaderSelector';

const App: React.FC = () => {
  return (
    <div>
      <h1>二级选择器演示</h1>
      <CascaderSelector />
    </div>
  );
};
```

## 数据格式示例

```typescript
const options = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'beijing-dongcheng',
        label: '东城区',
      },
      {
        value: 'beijing-xicheng',
        label: '西城区',
      },
    ],
  },
  // ... 更多数据
];
```

## 交互说明

### 鼠标操作
- **悬停**: 自动展开子菜单
- **点击**: 选择当前选项
- **清除**: 点击输入框右侧的清除按钮

### 键盘操作
- **Tab**: 切换到选择器
- **Enter**: 确认选择
- **Escape**: 关闭下拉菜单
- **方向键**: 在选项间导航

### 触摸操作（移动端）
- **点击**: 选择选项
- **滑动**: 滚动选项列表
- **长按**: 显示上下文菜单

## 自定义配置

### 修改默认数据

```tsx
const defaultOptions: CascaderOption[] = [
  {
    value: 'your-city',
    label: '您的城市',
    children: [
      {
        value: 'your-district',
        label: '您的区域',
      },
    ],
  },
];
```

### 自定义异步加载

```tsx
const loadAsyncData = async (selectedOptions: CascaderOption[]) => {
  // 自定义异步加载逻辑
  const response = await fetch('/api/regions');
  const data = await response.json();
  // 处理数据并更新选项
};
```

### 自定义样式

```tsx
<CascaderSelector 
  style={{ 
    maxWidth: 800,
    margin: '20px auto'
  }}
/>
```

## 常见问题

### Q: 如何添加更多层级？
A: 在数据对象中添加更多的 `children` 嵌套即可支持多级选择。

### Q: 如何禁用某些选项？
A: 在选项对象中添加 `disabled: true` 属性。

### Q: 如何自定义搜索逻辑？
A: 修改 `showSearch.filter` 函数来实现自定义搜索逻辑。

### Q: 如何获取选中的值？
A: 监听 `onChange` 事件，参数即为选中的值数组。

## 性能优化建议

1. **数据懒加载**: 对于大量数据，建议使用异步加载
2. **虚拟滚动**: 当选项数量很大时，考虑使用虚拟滚动
3. **缓存机制**: 对已加载的数据进行缓存，避免重复请求
4. **防抖处理**: 对搜索输入进行防抖处理，提高性能

## 浏览器兼容性

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 技术支持

如有问题，请查看项目文档或提交Issue。 