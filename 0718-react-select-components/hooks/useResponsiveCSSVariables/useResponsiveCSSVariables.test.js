const { renderHook } = require('@testing-library/react');
const { useResponsiveCSSVariables } = require('./useResponsiveCSSVariables');

// Mock window.innerWidth
const mockInnerWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

// Mock document.documentElement
const mockDocumentElement = () => {
  const mockRoot = {
    style: {
      fontSize: '',
      setProperty: jest.fn(),
    },
  };
  
  Object.defineProperty(document, 'documentElement', {
    value: mockRoot,
    writable: true,
  });
  
  return mockRoot;
};

// Mock console.error
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('useResponsiveCSSVariables', () => {
  beforeEach(() => {
    mockInnerWidth(1920);
    mockDocumentElement();
    jest.clearAllMocks();
  });

  it('应该返回正确的初始值', () => {
    const { result } = renderHook(() => useResponsiveCSSVariables());

    expect(result.current.currentScale).toBe(1.125);
    expect(result.current.currentBreakpoint).toBe('largeDesktop');
    expect(result.current.screenWidth).toBe(1920);
    expect(result.current.isReady).toBe(true);
  });

  it('应该支持自定义配置', () => {
    const customConfig = {
      breakpoints: { mobile: 640, desktop: 1024 },
      scales: { mobile: 0.9, desktop: 1.1 },
    };

    const { result } = renderHook(() => 
      useResponsiveCSSVariables({ config: customConfig })
    );

    expect(result.current.currentScale).toBe(1.1);
    expect(result.current.currentBreakpoint).toBe('desktop');
  });

  it('应该支持回调函数', () => {
    const onScaleChange = jest.fn();

    renderHook(() => 
      useResponsiveCSSVariables({ onScaleChange })
    );

    expect(onScaleChange).toHaveBeenCalledWith(1.125, 1920);
  });

  it('应该支持禁用选项', () => {
    const onScaleChange = jest.fn();

    renderHook(() => 
      useResponsiveCSSVariables({ enabled: false, onScaleChange })
    );

    expect(onScaleChange).not.toHaveBeenCalled();
  });

  // 新增测试用例来提高覆盖率
  it('应该处理小屏幕设备', () => {
    mockInnerWidth(375); // 手机屏幕宽度

    const { result } = renderHook(() => useResponsiveCSSVariables());

    expect(result.current.currentScale).toBe(0.875);
    expect(result.current.currentBreakpoint).toBe('mobile');
    expect(result.current.screenWidth).toBe(375);
  });

  it('应该处理中等屏幕设备', () => {
    mockInnerWidth(768); // 平板屏幕宽度

    const { result } = renderHook(() => useResponsiveCSSVariables());

    expect(result.current.currentScale).toBe(0.875);
    expect(result.current.currentBreakpoint).toBe('mobile');
    expect(result.current.screenWidth).toBe(768);
  });

  it('应该处理自定义断点配置', () => {
    mockInnerWidth(500);
    const customConfig = {
      breakpoints: { small: 400, medium: 800 },
      scales: { small: 0.8, medium: 1.0 },
    };

    const { result } = renderHook(() => 
      useResponsiveCSSVariables({ config: customConfig })
    );

    expect(result.current.currentScale).toBe(0.8);
    expect(result.current.currentBreakpoint).toBe('small');
  });

  it('应该处理边界情况 - 最小屏幕', () => {
    mockInnerWidth(320); // 最小屏幕宽度

    const { result } = renderHook(() => useResponsiveCSSVariables());

    expect(result.current.currentScale).toBe(0.875);
    expect(result.current.currentBreakpoint).toBe('mobile');
  });

  it('应该处理边界情况 - 超大屏幕', () => {
    mockInnerWidth(2560); // 超大屏幕宽度

    const { result } = renderHook(() => useResponsiveCSSVariables());

    expect(result.current.currentScale).toBe(1.125);
    expect(result.current.currentBreakpoint).toBe('largeDesktop');
  });

  it('应该处理自定义基础字体大小', () => {
    const customConfig = {
      baseFontSize: 18,
    };

    const mockRoot = mockDocumentElement();
    
    renderHook(() => 
      useResponsiveCSSVariables({ config: customConfig })
    );

    expect(mockRoot.style.fontSize).toBe('20.25px'); // 18 * 1.125
  });

  it('应该处理错误情况', () => {
    // Mock document.documentElement 抛出错误
    const mockRoot = {
      style: {
        fontSize: '',
        setProperty: jest.fn().mockImplementation(() => {
          throw new Error('CSS设置失败');
        }),
      },
    };
    
    Object.defineProperty(document, 'documentElement', {
      value: mockRoot,
      writable: true,
    });

    renderHook(() => useResponsiveCSSVariables());

    expect(console.error).toHaveBeenCalledWith(
      'Failed to update CSS variables:',
      expect.any(Error)
    );
  });

  it('应该正确处理debounce配置', () => {
    const customConfig = {
      debounceMs: 200,
    };

    const { result } = renderHook(() => 
      useResponsiveCSSVariables({ config: customConfig })
    );

    expect(result.current.currentScale).toBe(1.125);
    expect(result.current.currentBreakpoint).toBe('largeDesktop');
  });
}); 