import React from 'react';
import CascaderSelector from './components/CascaderSelector';
import { useResponsiveCSSVariables } from '../hooks';

function App() {
  // 使用自定义Hook
  const { currentScale, currentBreakpoint, screenWidth, isReady } = useResponsiveCSSVariables({
    onScaleChange: (scale, width) => {
      console.log(`App - 响应式变化: 缩放${scale}, 宽度${width}px`);
    },
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <header style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h1>React 19 + TypeScript + Webpack + Ant Design</h1>
      </header>
      <main style={{
          flex: '1',
          padding: '40px 20px'
      }}>
          <CascaderSelector />
      </main>
    </div>
  );
}

export default App; 