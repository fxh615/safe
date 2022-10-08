import { DownOutlined } from '@ant-design/icons';
import Dropdown from '@/dropdown';
import Menu from '@/menu';
import Space from '@/space';
import Tabs from '@/tabs';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React from 'react';
import './index.less';

export type ListToolBarMenuItem = {
  key: React.Key;
  label: React.ReactNode;
  disabled?: boolean;
};

export type ListToolBarHeaderMenuProps = {
  type?: 'inline' | 'dropdown' | 'tab';
  activeKey?: React.Key;
  items?: ListToolBarMenuItem[];
  onChange?: (activeKey?: React.Key) => void;
  prefixCls?: string;
};

const HeaderMenu: React.FC<ListToolBarHeaderMenuProps> = (props) => {
  const { items = [], type = 'inline', prefixCls, activeKey: propActiveKey } = props;

  const [activeKey, setActiveKey] = useMergedState<React.Key>(propActiveKey as React.Key, {
    value: propActiveKey,
    onChange: props.onChange,
  });

  if (items.length < 1) {
    return null;
  }

  const activeItem =
    items.find((item) => {
      return item.key === activeKey;
    }) || items[0];

  if (type === 'inline') {
    return (
      <div className={classNames(`${prefixCls}-menu`, `${prefixCls}-inline-menu`)}>
        {items.map((item, index) => (
          <div
            key={item.key || index}
            onClick={() => {
              setActiveKey(item.key);
            }}
            className={classNames(
              `${prefixCls}-inline-menu-item`,
              activeItem.key === item.key ? `${prefixCls}-inline-menu-item-active` : undefined,
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'tab') {
    return (
      <Tabs activeKey={activeItem.key as string} onTabClick={(key) => setActiveKey(key)}>
        {items.map(({ label, key, ...rest }, index) => {
          return <Tabs.TabPane tab={label} key={key || index} {...rest} />;
        })}
      </Tabs>
    );
  }

  return (
    <div className={classNames(`${prefixCls}-menu`, `${prefixCls}-dropdownmenu`)}>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu
            selectedKeys={[activeItem.key as string]}
            onClick={(item) => {
              setActiveKey(item.key);
            }}
            items={items.map((item, index) => ({
              key: item.key || index,
              disabled: item.disabled,
              label: item.label,
            }))}
          />
        }
      >
        <Space className={`${prefixCls}-dropdownmenu-label`}>
          {activeItem.label}
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default HeaderMenu;
