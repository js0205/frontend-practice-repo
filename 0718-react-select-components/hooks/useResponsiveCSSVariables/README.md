# useResponsiveCSSVariables Hook

一个用于响应式CSS变量管理的自定义React Hook。

## 功能特性

- 🎯 **响应式设计**: 根据屏幕宽度自动调整CSS变量
- ⚡ **性能优化**: 内置防抖机制，避免频繁更新
- 🎨 **灵活配置**: 支持自定义断点和缩放比例
- 🔧 **类型安全**: 完整的TypeScript类型支持
- 📱 **多设备支持**: 支持移动端、平板、桌面端

## 安装和使用

### 1. 导入Hook

```typescript
import { useResponsiveCSSVariables } from './hooks/useResponsiveCSSVariables';
```

### 2. 基础使用

```typescript
import React from 'react';
import { useResponsiveCSSVariables } from './hooks/useResponsiveCSSVariables';

const MyComponent = () => {
  const { currentScale, currentBreakpoint, screenWidth, isReady } = useResponsiveCSSVariables();

  return (
    <div>
      <p>当前缩放比例: {currentScale}</p>
      <p>当前断点: {currentBreakpoint}</p>
      <p>屏幕宽度: {screenWidth}px</p>
      <p>是否准备就绪: {isReady ? '是' : '否'}</p>
    </div>
  );
};
```

### 3. 自定义配置

```typescript
import React from 'react';
import { useResponsiveCSSVariables } from './hooks/useResponsiveCSSVariables';

const MyComponent = () => {
  const { currentScale, currentBreakpoint } = useResponsiveCSSVariables({
    config: {
      breakpoints: {
        mobile: 640,
        tablet: 1024,
        desktop: 1440,
      },
      scales: {
        mobile: 0.9,
        tablet: 1.0,
        desktop: 1.1,
      },
      baseFontSize: 18,
      debounceMs: 200,
    },
    onScaleChange: (scale, width) => {
      console.log(`缩放比例变化: ${scale}, 屏幕宽度: ${width}`);
    },
    enabled: true,
  });

  return (
    <div>
      <p>自定义缩放比例: {currentScale}</p>
      <p>自定义断点: {currentBreakpoint}</p>
    </div>
  );
};
```

### 4. 禁用功能

```typescript
const MyComponent = () => {
  const { currentScale } = useResponsiveCSSVariables({
    enabled: false, // 禁用响应式功能
  });

  return <div>禁用状态下的缩放比例: {currentScale}</div>;
};
```

## API 参考

### Hook 参数

```typescript
interface UseResponsiveOptions {
  config?: ResponsiveConfig;     // 自定义配置
  onScaleChange?: (scale: number, width: number) => void;  // 缩放变化回调
  enabled?: boolean;             // 是否启用（默认: true）
}
```

### Hook 返回值

```typescript
interface UseResponsiveResult {
  currentScale: number;          // 当前缩放比例
  currentBreakpoint: string;     // 当前断点名称
  screenWidth: number;           // 当前屏幕宽度
  isReady: boolean;              // 是否准备就绪
}
```

### 配置接口

```typescript
interface ResponsiveConfig {
  breakpoints: Record<string, number>;  // 断点配置
  scales: Record<string, number>;       // 缩放比例配置
  baseFontSize?: number;                // 基础字体大小（默认: 16）
  debounceMs?: number;                  // 防抖时间（默认: 100ms）
}
```

## 默认配置

```typescript
const DEFAULT_CONFIG = {
  breakpoints: {
    mobile: 768,
    tablet: 1200,
    desktop: 1440,
    largeDesktop: 1920,
  },
  scales: {
    mobile: 0.875,
    tablet: 1,
    desktop: 1.0625,
    largeDesktop: 1.125,
    xl: 1.25,
  },
  baseFontSize: 16,
  debounceMs: 100,
};
```

## CSS 变量

Hook会自动设置以下CSS变量：

### 间距变量
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
```

### 圆角变量
```css
--border-radius-sm: 0.25rem;
--border-radius-md: 0.375rem;
--border-radius-lg: 0.5rem;
```

### 字体大小变量
```css
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
```

## 使用示例

### 在CSS中使用变量

```css
.my-component {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-lg);
}
```

### 在组件中监听变化

```typescript
const MyComponent = () => {
  const { currentScale, currentBreakpoint } = useResponsiveCSSVariables({
    onScaleChange: (scale, width) => {
      // 当缩放比例变化时执行
      console.log(`屏幕宽度: ${width}px, 缩放比例: ${scale}`);
      
      // 可以在这里执行其他逻辑
      if (scale > 1.1) {
        // 大屏幕逻辑
      } else if (scale < 0.9) {
        // 小屏幕逻辑
      }
    },
  });

  return (
    <div className={`component ${currentBreakpoint}`}>
      <p>当前断点: {currentBreakpoint}</p>
      <p>缩放比例: {currentScale}</p>
    </div>
  );
};
```

## 注意事项

1. **服务端渲染**: 在SSR环境中，`window`对象可能不存在，Hook会自动处理这种情况
2. **性能考虑**: 使用防抖机制避免频繁更新，默认100ms延迟
3. **CSS变量**: 确保在CSS中使用`var()`函数来引用这些变量
4. **类型安全**: 建议使用TypeScript以获得更好的开发体验

## 测试

Hook包含完整的测试覆盖：

```bash
npm test
npm run test:coverage
```

测试覆盖率：91%+ 🎉 