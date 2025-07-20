import React, { useState } from "react";
import { Cascader, Card, Typography, Space, Button, Spin, message } from "antd";
import { ReloadOutlined, DatabaseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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
      style={{ maxWidth: 600, margin: "20px auto" }}
      headStyle={{ background: "#f0f2f5", borderBottom: "2px solid #1890ff" }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Space size="middle">
            <Button
              type="primary"
              onClick={getOptions}
              loading={loading}
              icon={<DatabaseOutlined />}
              size="large"
              style={{
                minWidth: 120,
                borderRadius: 6,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                minWidth: 80,
                borderRadius: 6,
                border: "1px solid #d9d9d9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {loading ? "处理中..." : "同步拉取数据"}
            </Button>
          </Space>
        </div>

        <div
          style={{
            padding: "16px",
            background: "#fafafa",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
          }}
        >
          <Text
            strong
            style={{
              fontSize: 16,
              color: "#262626",
              marginBottom: 8,
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
              marginTop: 8,
              borderRadius: 6,
            }}
            disabled={loading}
            value={selectedValue}
            onChange={onChange}
          />
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <Spin size="large" />
            <div style={{ marginTop: 8, color: "#666" }}>
              正在处理数据，请稍候...
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default CascaderSelector;
