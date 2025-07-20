import {ResponsiveConfig} from './types';
import { CSS_VARIABLES } from './constant';

// 计算缩放比例
export const calculateScale = (width: number, config: ResponsiveConfig):number => {
   const {breakpoints, scales} = config;
   const sortedBreakpoints = Object.entries(breakpoints).sort(([,a],[,b])=>b-a);
   for(const [name,breakpointWidth] of sortedBreakpoints){
    if(width >= breakpointWidth){
        return scales[name] || 1;
    }
   }
   return scales.mobile || 1;
}

// 获取当前断点名称
export const getCurrentBreakpoint = (width:number,config:ResponsiveConfig):string => {
    const {breakpoints} = config;
    const sortedBreakpoints = Object.entries(breakpoints).sort(([,a],[,b])=>b-a);
    for(const [name,breakpointWidth] of sortedBreakpoints){
        if(width >= breakpointWidth){
            return name;
        }
    }
    return 'mobile';
}

// 设置CSS变量
export const setCSSVariables = (scale: number,config:ResponsiveConfig):void => {
  const root = document.documentElement;
  const {baseFontSize = 16} = config;
  root.style.fontSize = `${baseFontSize * scale}px`;
  Object.entries(CSS_VARIABLES.spacing).forEach(([key,value])=>{
    root.style.setProperty(key,`${value * scale}rem`);
  });
  Object.entries(CSS_VARIABLES.borderRadius).forEach(([key,value])=>{
    root.style.setProperty(key,`${value * scale}rem`);
  });
  Object.entries(CSS_VARIABLES.fontSize).forEach(([key,value])=>{
    root.style.setProperty(key,`${value * scale}rem`);
  });
}

export const debounce = <T extends (...args:any[]) => any>(
  func:T,
  wait:number
) => {
   let timeout: NodeJS.Timeout;
   const debounced = (...args: Parameters<T>) => {
     clearTimeout(timeout);
     timeout = setTimeout(()=>func(...args),wait);
   }
   debounced.cancel = () => clearTimeout(timeout);
   return debounced;
}
