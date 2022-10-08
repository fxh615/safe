


```jsx padded
import React from 'react';
import { ProTable, Dropdown, Menu, Popconfirm, Space } from '@safe/components';
import { DownOutlined } from '@ant-design/icons';



const RoleMap = {
  admin: {
    name: '管理员',
    desc: '仅拥有指定项目的权限',
  },
  operator: {
    name: '操作员',
    desc: '拥有所有权限',
  },
};

const tableListDataSource = [];

const realNames = ['马巴巴', '测试', '测试2', '测试3'];
const nickNames = ['巴巴', '测试', '测试2', '测试3'];
const emails = ['baba@antfin.com', 'test@antfin.com', 'test2@antfin.com', 'test3@antfin.com'];
const phones = ['12345678910', '10923456789', '109654446789', '109223346789'];
const permissions = [[], ['权限点名称1', '权限点名称4'], ['权限点名称1'], []];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    outUserNo: `${102047 + i}`,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    role: i === 0 ? 'admin' : 'operator',
    realName: realNames[i % 4],
    nickName: nickNames[i % 4],
    email: emails[i % 4],
    phone: phones[i % 4],
    permission: permissions[i % 4],
  });
}

const roleMenu = (
  <Menu
    items={[
      {
        label: '管理员',
        key: 'admin',
      },
      {
        label: '操作员',
        key: 'operator',
      },
    ]}
  />
);

const MemberList = () => {
  const renderRemoveUser = (text) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否">
      <a>{text}</a>
    </Popconfirm>
  );

  const columns = [
    {
      dataIndex: 'avatar',
      title: '成员名称',
      valueType: 'avatar',
      width: 150,
      render: (dom, record) => (
        <Space>
          <span>{dom}</span>
          {record.nickName}
        </Space>
      ),
			sorter: (a, b) => a.avatar - b.avatar,
    },
    {
      dataIndex: 'email',
      title: '账号',
			sorter: (a, b) => a.email - b.email,
    },
    {
      dataIndex: 'phone',
      title: '手机号',
			sorter: (a, b) => a.phone - b.phone,
    },
    {
      dataIndex: 'role',
      title: '角色',
      render: (_, record) => (
        <Dropdown overlay={roleMenu}>
          <span>
            {RoleMap[record.role || 'admin'].name} <DownOutlined />
          </span>
        </Dropdown>
      ),
    },
    {
      dataIndex: 'permission',
      title: '权限范围',
      render: (_, record) => {
        const { role, permission = [] } = record;
        if (role === 'admin') {
          return '所有权限';
        }
        return permission && permission.length > 0 ? permission.join('、') : '无';
      },
    },
    {
      title: '操作',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        let node = renderRemoveUser('退出');
        if (record.role === 'admin') {
          node = renderRemoveUser('移除');
        }
        return [<a key="edit">编辑</a>, node];
      },
    },
  ];

  return (
    <ProTable
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="outUserNo"
      pagination={{
        showQuickJumper: true,
      }}
      toolBarRender={false}
      search={false}
    />
  );
};

<MemberList/>

```
