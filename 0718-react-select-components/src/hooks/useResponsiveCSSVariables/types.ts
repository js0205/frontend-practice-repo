export interface ResponsiveConfig{
    breakpoints: Record<string, number>;
    scales: Record<string, number>;
    baseFontSize?: number;
    debounceMs?: number;
}

export interface UseResponsiveResult{
    currentScale: number;
    currentBreakpoint: string;
    screenWidth: number;
    isReady: boolean;
}

export interface UseResponsiveOptions {
    config?: Partial<ResponsiveConfig>;
    onScaleChange?: (scale: number,width:number) => void;
    enabled?:boolean;
}
