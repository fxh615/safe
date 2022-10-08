```jsx padded
import React, { useState } from 'react';
import { Menu, Divider, Switch, Space } from '@safe/components';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const [current, setCurrent] = useState('mail');

const onClick = e => {
  console.log('click ', e);
  setCurrent(e.key);
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items2 = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];
const [theme, setTheme] = useState('dark');
const [current2, setCurrent2] = useState('1');

const changeTheme = value => {
  setTheme(value ? 'dark' : 'light');
};

const onClick2 = e => {
  console.log('click ', e);
  setCurrent2(e.key);
};

<div>
  <Space direction="vertical">
    <h4>1.Exist-some-bug-example</h4>
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  </Space>
  <Space direction="vertical">
    <h4>2.Nobug-example</h4>
    <Switch
      checked={theme === 'dark'}
      onChange={changeTheme}
      checkedChildren="Dark"
      unCheckedChildren="Light"
    />
    <Menu
      theme={theme}
      onClick={onClick2}
      style={{
        width: 256,
      }}
      defaultOpenKeys={['sub1']}
      selectedKeys={[current2]}
      mode="inline"
      items={items2}
    />
  </Space>
</div>;
```
