// 导出主要的Hook
export { useResponsiveCSSVariables } from './useResponsiveCSSVariables';

// 导出类型定义
export type { 
  UseResponsiveOptions, 
  UseResponsiveResult, 
  ResponsiveConfig 
} from './types';

// 导出常量配置
export { DEFAULT_CONFIG, CSS_VARIABLES } from './constant';

// 导出工具函数（如果需要的话）
export { 
  calculateScale, 
  getCurrentBreakpoint, 
  setCSSVariables, 
  debounce 
} from './utils';