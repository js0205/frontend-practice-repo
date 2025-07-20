import { useCallback, useEffect, useMemo, useState } from "react";
import { UseResponsiveOptions,UseResponsiveResult } from "./types";
import { DEFAULT_CONFIG } from "./constant";
import { calculateScale, debounce, getCurrentBreakpoint, setCSSVariables } from "./utils";
export const useResponsiveCSSVariables = (
  options:UseResponsiveOptions = {}
):UseResponsiveResult => {
  const {config:userConfig,onScaleChange,enabled = true} = options;
  const [screenWidth,setScreenWidth] = useState(window.innerWidth);
  const [isReady,setIsReady] = useState(false);
  const config = useMemo(()=>{
    return {
        ...DEFAULT_CONFIG,
        ...userConfig,
    }
  },[userConfig]);
  const currentScale = useMemo(()=>
    calculateScale(screenWidth,config),
    [screenWidth,config]
  );
  const currentBreakpoint = useMemo(()=>
    getCurrentBreakpoint(screenWidth,config),
    [screenWidth,config]
  );

   const updateCSSVariables = useCallback(()=>{
    if(!enabled) return;
    try{
        setCSSVariables(currentScale,config);
        setIsReady(true);
        onScaleChange?.(currentScale, screenWidth);
    }catch(error){
        console.error('Failed to update CSS variables:',error);
    }
   },[currentScale,config,enabled,onScaleChange,screenWidth]);

   const debouncedUpdate = useCallback(
    debounce(updateCSSVariables,config.debounceMs ?? 100),
    [updateCSSVariables,config.debounceMs]
  );

   useEffect(()=>{
    if(!enabled) return;
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
        debouncedUpdate();
    }
    updateCSSVariables();
    window.addEventListener('resize',handleResize);
    return () => {
            window.removeEventListener('resize',handleResize);
            debouncedUpdate.cancel();
        }
   },[updateCSSVariables,debouncedUpdate,enabled]);
   return {
     currentScale,
     currentBreakpoint,
     screenWidth,
     isReady
   }
}
