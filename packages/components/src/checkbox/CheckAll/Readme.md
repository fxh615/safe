# checkbox的全选
只是两种布局， 一种是inline， 一种是block；
inline场景， 每一个option是没有children， 如：
```
export const options = [
  {
    label: '表操作',
    value: '11',
  },
  {
    label: '表管理',
    value: '5',
  },
  {
    label: '数据库管理',
    value: '2',
  },
  {
    label: '用户管理',
    value: '3',
  },
  {
    label: '服务管理',
    value: '1',
  },
  {
    label: '用户登录',
    value: '4',
  },
  {
    label: '视图管理',
    value: '6',
  },
  {
    label: '存储过程',
    value: '7',
  },
  {
    label: '函数',
    value: '8',
  },
  {
    label: '触发器',
    value: '9',
  },
  {
    label: '事件审计',
    value: '10',
  },
  {
    label: '其他审计管理',
    value: '12',
  },
  {
    label: '对象审计',
    value: '13',
  },
  {
    label: '其他',
    value: '14',
  },
]

const defaultValue = ['3', '4']
        <CheckAll
          dataSource={options}
          defaultValue={defaultValue}
          layout="inline"
        />
```
