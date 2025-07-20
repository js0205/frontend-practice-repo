import React, { useState } from "react";
import { Cascader, Card, Typography, Space, Button, Spin, message } from "antd";
import { ReloadOutlined, DatabaseOutlined } from "@ant-design/icons";
import { useResponsiveCSSVariables } from "../hooks/useResponsiveCSSVariables";

const { Text } = Typography;

interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}

const defaultOptions: CascaderOption[] = [
  {
    value: "beijing",
    label: "北京市",
    children: [
      {
        value: "beijing-dongcheng",
        label: "东城区",
      },
      {
        value: "beijing-xicheng",
        label: "西城区",
      },
      {
        value: "beijing-chaoyang",
        label: "朝阳区",
      },
      {
        value: "beijing-haidian",
        label: "海淀区",
      },
    ],
  },
  {
    value: "shanghai",
    label: "上海市",
    children: [
      {
        value: "shanghai-huangpu",
        label: "黄浦区",
      },
      {
        value: "shanghai-xuhui",
        label: "徐汇区",
      },
      {
        value: "shanghai-changning",
        label: "长宁区",
      },
      {
        value: "shanghai-jingan",
        label: "静安区",
      },
    ],
  },
  {
    value: "guangzhou",
    label: "广州市",
    children: [
      {
        value: "guangzhou-tianhe",
        label: "天河区",
      },
      {
        value: "guangzhou-yuexiu",
        label: "越秀区",
      },
      {
        value: "guangzhou-liwan",
        label: "荔湾区",
      },
      {
        value: "guangzhou-haizhu",
        label: "海珠区",
      },
    ],
  },
];

const CascaderSelector: React.FC = () => {
  // 使用自定义Hook
  const { currentScale, currentBreakpoint, screenWidth, isReady } = useResponsiveCSSVariables({
    onScaleChange: (scale, width) => {
      console.log(`CascaderSelector - 响应式变化: 缩放${scale}, 宽度${width}px`);
    },
  });

  // 定义获取保存数据的函数
  const getSavedOptions = ():CascaderOption[] => {
    try {
      const savedOptions = localStorage.getItem("options");
      return savedOptions ? JSON.parse(savedOptions) : defaultOptions;
    } catch {
      return defaultOptions;
    }
  }
  
  const getSavedValue = ():string[] => {
    try {
      const savedValue = localStorage.getItem("selectedValue");
      return savedValue ? JSON.parse(savedValue) : [];
    } catch {
      return [];
    }
  }

  const [options, setOptions] = useState<CascaderOption[]>(getSavedOptions);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>(getSavedValue);

  //异步拉取数据
  const getOptions = () => {
    if (loading) return;
    setLoading(true);
    setSelectedValue([]);
    // 清除之前的选择值，但保留选项数据
    localStorage.removeItem("selectedValue");
    message.loading("异步拉取数据中...");
    setTimeout(() => {
      const newOptions: CascaderOption[] = [
        {
          value: "shenzhen",
          label: "深圳市",
          children: [
            {
              value: "shenzhen-futian",
              label: "福田区",
            },
            {
              value: "shenzhen-luohu",
              label: "罗湖区",
            },
            {
              value: "shenzhen-nanshan",
              label: "南山区",
            },
            {
              value: "shenzhen-baoan",
              label: "宝安区",
            },
          ],
        },
      ];
      setOptions(newOptions);
      // 保存新的选项数据到 localStorage
      localStorage.setItem("options", JSON.stringify(newOptions));
      setLoading(false);
      message.success("数据拉取完成");
    }, 2000);
  };

  const getDefaultOptions = () => {
    if (loading) return;
    setLoading(true);
    setSelectedValue([]);
    // 清除之前的选择值，但保留选项数据
    localStorage.removeItem("selectedValue");
    message.loading("重置数据中...");
    setTimeout(() => {
      setOptions(defaultOptions);
      // 保存默认选项数据到 localStorage
      localStorage.setItem("options", JSON.stringify(defaultOptions));
      setLoading(false);
      message.success("数据重置完成");
    }, 500);
  };
   
  const onChange = (value: string[]) => {
    setSelectedValue(value);
    localStorage.setItem("selectedValue", JSON.stringify(value));
  };

  return (
    <Card
      title="级联选择器演示"
      style={{
        maxWidth: '37.5rem',
        margin: 'var(--spacing-lg) auto',
        fontSize: 'var(--font-size-md)'
      }}
      headStyle={{
        background: "#f0f2f5", 
        borderBottom: "0.125rem solid #1890ff",
        fontSize: 'var(--font-size-lg)', 
        padding: 'var(--spacing-md)'
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div style={{ textAlign: "center", marginBottom: 'var(--spacing-md)' }}>
          <Space size="middle">
            <Button
              type="primary"
              onClick={getOptions}
              loading={loading}
              icon={<DatabaseOutlined />}
              size="large"
              style={{
                minWidth: '7.5rem',
                borderRadius: 'var(--border-radius-md)', 
                boxShadow: "0 var(--spacing-xs) var(--spacing-sm) rgba(0,0,0,0.1)",
                fontSize: 'var(--font-size-md)', 
                height: '2.5rem',
              }}
            >
              {loading ? "处理中..." : "异步拉取数据"}
            </Button>
            <Button
              onClick={getDefaultOptions}
              loading={loading}
              icon={<ReloadOutlined />}
              size="large"
              style={{
                minWidth: '5rem',
                borderRadius: 'var(--border-radius-md)', 
                border: "0.0625rem solid #d9d9d9",
                boxShadow: "0 var(--spacing-xs) var(--spacing-sm) rgba(0,0,0,0.1)",
                fontSize: 'var(--font-size-md)', 
                height: '2.5rem',
              }}
            >
              {loading ? "处理中..." : "同步拉取数据"}
            </Button>
          </Space>
        </div>

        <div
          style={{
            padding: 'var(--spacing-md)', 
            background: "#fafafa",
            borderRadius: 'var(--border-radius-lg)', 
            border: "0.0625rem solid #f0f0f0",
          }}
        >
          <Text
            strong
            style={{
              fontSize: 'var(--font-size-md)', 
              color: "#262626",
              marginBottom: 'var(--spacing-sm)', 
              display: "block",
            }}
          >
            选择地区：
          </Text>
          <Cascader
            options={options}
            placeholder="请选择地区"
            style={{
              width: "100%",
              marginTop: 'var(--spacing-sm)', 
              borderRadius: 'var(--border-radius-md)', 
            }}
            disabled={loading}
            value={selectedValue}
            onChange={onChange}
          />
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: 'var(--spacing-md)' }}>
            <Spin size="large" />
            <div style={{ 
              marginTop: 'var(--spacing-sm)', 
              color: "#666",
              fontSize: 'var(--font-size-md)'
            }}>
              正在处理数据，请稍候...
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default CascaderSelector;
