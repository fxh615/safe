import type { CSSProperties } from 'react';
import type * as H from 'history';
import type { MenuProps, MenuTheme } from '@/menu';
import type { BreadcrumbProps as AntdBreadcrumbProps } from '@/breadcrumb';
import type { SiderProps } from '../Sider';
import enUSLocal from './locales/en-US';
import itITLocal from './locales/it-IT';
import koKRLocal from './locales/ko-KR';
import zhLocal from './locales/zh-CN';
import zhTWLocal from './locales/zh-TW';

const locales: any = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enUSLocal,
  'it-IT': itITLocal,
  'ko-KR': koKRLocal,
};

export type WithFalse<T> = T | false;

type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

type ContentWidth = 'Fluid' | 'Fixed';

type LocaleType = keyof typeof locales;

type MessageDescriptor = {
  id: any;
  description?: string;
  defaultMessage?: string;
};

type PrivateSiderMenuProps = {
  matchMenuKeys: string[];
};

type GetPageTitleProps = {
  pathname?: string;
  breadcrumb?: Record<string, MenuDataItem>;
  breadcrumbMap?: Map<string, MenuDataItem>;
  menu?: ProSettings['menu'];
  title?: ProSettings['title'];
  pageName?: string;
  formatMessage?: (data: { id: any; defaultMessage?: string }) => string;
};

type LayoutBreadcrumbProps = {
  minLength?: number;
};

type GlobalHeaderProps = {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  /**
   * @name 虽然叫menuRender，但是其实是整个 SiderMenu 面板的渲染函数
   *
   * @example 收起时完成不展示菜单 menuRender={(props,defaultDom)=> props.collapsed ? null : defaultDom}
   * @example 不展示菜单 menuRender={false}
   */
  menuRender?: WithFalse<(props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode>;
  /**
   * @name 右侧顶部操作区域的渲染逻辑,一般会展示一个头像和一些操作
   *
   * @example 展示一个头像: rightRender={(props) => <Avatar shape="square" size="small" icon={<UserOutlined />} />}
   * @example 展示一些操作: rightRender={(props) => [<Button type="primary">操作</Button>,<Button type="primary">管理控制台</Button>]}
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  className?: string;
  prefixCls?: string;
  menuData?: MenuDataItem[];
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];

  /**
   * @name 顶部区域的渲染，包含内部的 menu
   *
   * @example headerContentRender={(props) => <div>管理控制台 </div>}
   */
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  collapsedButtonRender?: SiderMenuProps['collapsedButtonRender'];
  splitMenus?: boolean;
  children?: React.ReactNode;
} & Partial<PureSettings>;

type PureSettings = {
  /**
   * @name theme for nav menu
   *
   * @type  "light" | "dark" | "realDark"
   */
  navTheme?: MenuTheme | 'realDark' | undefined;

  /**
   * @name 顶部菜单的颜色，mix 模式下生效
   * @type  "light" | "dark"
   */
  headerTheme?: MenuTheme;
  /**
   * @name customize header height
   * @example 顶栏高度修改为64 headerHeight={64}
   */
  headerHeight?: number;
  /**
   * @name layout 的布局方式
   * @type  'side' | 'top' | 'mix'
   *
   * @example 顶部菜单 layout="top"
   * @example 侧边菜单 layout="side"
   * @example 混合布局 既有顶部也有侧边 layout="mix"
   */
  layout?: 'side' | 'top' | 'mix';
  /** @name layout of content: `Fluid` or `Fixed`, only works when layout is top */
  contentWidth?: ContentWidth;
  /** @name sticky header */
  fixedHeader?: boolean;
  /** @name sticky siderbar */
  fixSiderbar?: boolean;
  /**
   * @name menu 相关的一些配置，可以配置菜单的行为
   *
   * @example 关闭菜单国际化  menu={{ locale: false }}
   * @example 默认打开所有的菜单 menu={{ defaultOpenAll:true }}
   * @example 让菜单处于loading 状态 menu={{ loading: true }}
   * @example 异步加载菜单数据 menu={{params:{ pathname } request: async (params) => { return [{name:"主页",path=params.pathname}]} }}
   * @example 使用 MenuGroup 来聚合菜单 menu={{ mode: 'group' }}
   * @example 取消自动关闭菜单 menu={{ autoClose: false }}
   * @example 忽略收起时自动关闭菜单 menu={{ ignoreFlatMenu: true }}
   */
  menu?: {
    /**
     * @name 菜单国际化的配置
     */
    locale?: boolean;
    /**
     * @name 默认打开所有的菜单
     */
    defaultOpenAll?: boolean;
    /**
     * @name 是否忽略用户手动折叠过的菜单状态，如选择忽略，折叠按钮切换之后也可实现展开所有菜单
     */
    ignoreFlatMenu?: boolean;

    /**
     * @name 菜单的 loading 配置
     */
    loading?: boolean;
    /**
     * @name 菜单的 loading 发生改变
     */
    onLoadingChange?: (loading?: boolean) => void;

    /**
     * @name 菜单远程请求时用的参数，只有 params 变化才会重新触发 request
     *
     */
    params?: Record<string, any>;

    /**
     * @name 菜单远程请求的方法，只有 params 变化才会重新触发 request
     */
    request?: (
      params: Record<string, any>,
      defaultMenuData: MenuDataItem[],
    ) => Promise<MenuDataItem[]>;

    /**
     * @name 菜单聚合的模式
     */
    type?: 'sub' | 'group';
    /**
     * @name 取消自动关闭菜单
     */
    autoClose?: false;
  };
  /**
   * 设置为 false，在 layout 中只展示 pageName，而不是 pageName - title
   *
   * @name Layout 的 title，也会显示在浏览器标签上
   */
  title?: string | false;
  /**
   * Your custom iconfont Symbol script Url eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
   * 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理 Usage: https://github.com/ant-design/ant-design-pro/pull/3517
   */
  iconfontUrl?: string;
  /** @name 主色，需要配合 umi 使用 */
  primaryColor?: string;
  /** @name 全局增加滤镜 */
  colorWeak?: boolean;
  /**
   * 只在 mix 模式下生效
   *
   * @name 切割菜单
   */
  splitMenus?: boolean;
};

type RenderSetting = {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
};

export type ProSettings = PureSettings & RenderSetting;

export type BaseMenuProps = {
  className?: string;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  handleOpenChange?: (openKeys: string[]) => void;
  iconPrefixes?: string;
  menuProps?: MenuProps;
  style?: React.CSSProperties;
  theme?: MenuTheme;
  formatMessage?: (message: MessageDescriptor) => string;

  /**
   * @name 处理父级菜单的 props，可以复写菜单的点击功能，一般用于埋点
   * @see 子级的菜单要使用 menuItemRender 来处理
   *
   * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> history.push(item.path) }>{defaultDom}</a> }}
   * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
   */
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
      menuProps: BaseMenuProps,
    ) => React.ReactNode
  >;

  /**
   * @name 处理菜单的 props，可以复写菜单的点击功能，一般结合 Router 框架使用
   * @see 非子级的菜单要使用 subMenuItemRender 来处理
   *
   * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> history.push(item.path) }>{defaultDom}</a> }}
   * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <Link to={item.path}>{defaultDom}</Link> }}
   */
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
        onClick: () => void;
      },
      defaultDom: React.ReactNode,
      menuProps: BaseMenuProps & Partial<PrivateSiderMenuProps>,
    ) => React.ReactNode
  >;

  /**
   * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
   *
   * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
   */
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes<Route>> &
  Omit<MenuProps, 'openKeys' | 'onOpenChange' | 'title'> &
  Partial<PureSettings>;

type SiderMenuProps = {
  logo?: React.ReactNode;
  siderWidth?: number;
  /**
   * @name  菜单 logo 和 title 区域的渲染
   *
   * @example 不要logo : menuHeaderRender={(logo,title)=> title}
   * @example 不要title : menuHeaderRender={(logo,title)=> logo}
   * @example 展开的时候显示title,收起显示 logo： menuHeaderRender={(logo,title,props)=> props.collapsed ? logo : title}
   * @example 不要这个区域了 : menuHeaderRender={false}
   */
  menuHeaderRender?: WithFalse<
    (logo: React.ReactNode, title: React.ReactNode, props?: SiderMenuProps) => React.ReactNode
  >;
  /**
   * @name 侧边菜单底部的配置，可以增加一些底部操作
   *
   * @example 底部增加超链接 menuFooterRender={()=><a href="https://pro.ant.design">pro.ant.design</a>}
   * @example 根据收起展开配置不同的 dom  menuFooterRender={()=>collapsed? null :<a href="https://pro.ant.design">pro.ant.design</a>}
   */
  menuFooterRender?: WithFalse<(props?: SiderMenuProps) => React.ReactNode>;

  /**
   * @name  侧边菜单，菜单区域的处理,可以单独处理菜单的dom
   *
   * @example 增加菜单区域的背景颜色 menuContentRender={(props,defaultDom)=><div style={{backgroundColor:"red"}}>{defaultDom}</div>}
   * @example 某些情况下不显示菜单 menuContentRender={(props)=> return <div>不显示菜单</div>}
   */
  menuContentRender?: WithFalse<
    (props: SiderMenuProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  /**
   * @name 侧边菜单 title 和 logo 下面区域的渲染，一般会增加个搜索框
   *
   * @example  增加一个搜索框 menuExtraRender={()=>(<Search placeholder="请输入" />)}
   * @example  根据收起展开配置不同的 dom： menuExtraRender={()=>collapsed? null : <Search placeholder="请输入" />}
   */
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  /**
   * @name 自定义展开收起按钮的渲染
   *
   * @example 使用文字渲染 collapsedButtonRender={(collapsed)=>collapsed?"展开":"收起"})}
   * @example 使用icon渲染 collapsedButtonRender={(collapsed)=>collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
   * @example 不渲染按钮 collapsedButtonRender={false}
   */
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  /**
   * @name 菜单是否收起的断点，设置成false 可以禁用
   *
   * @example 禁用断点  breakpoint={false}
   * @example 最小的屏幕再收起 breakpoint={"xs"}
   */
  breakpoint?: SiderProps['breakpoint'] | false;

  /**
   * @name 菜单顶部logo 和 title 区域的点击事件
   *
   * @example 点击跳转到首页 onMenuHeaderClick={()=>{ history.push('/') }}
   */
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * @name 侧边菜单底部的一些快捷链接
   *
   * @example links={[<a href="ant.design"> 访问官网 </a>,<a href="help.ant.design"> 帮助 </a>]}
   */
  links?: React.ReactNode[];
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
  getContainer?: false;

  /**
   * @name 侧边菜单的logo的样式，可以调整下大小
   *
   * @example 设置logo的大小为 42px logoStyle={{width: '42px', height: '42px'}}
   */
  logoStyle?: CSSProperties;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
} & Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>>;

interface StaticContext {
  statusCode?: number | undefined;
}

type WaterMarkProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 水印样式 */
  markStyle?: React.CSSProperties;
  /** 水印类名 */
  markClassName?: string;
  /** 水印之间的水平间距 */
  gapX?: number;
  /** 水印之间的垂直间距 */
  gapY?: number;
  /** 追加的水印元素的z-index */
  zIndex?: number;
  /** 水印的宽度 */
  width?: number;
  /** 水印的高度 */
  height?: number;
  /** 水印在canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 offsetTop = gapY / 2 */
  offsetTop?: number; // 水印图片距离绘制 canvas 单元的顶部距离
  /** 水印在canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 offsetTop = gapX / 2 */
  offsetLeft?: number;
  /** 水印绘制时，旋转的角度，单位 ° */
  rotate?: number;
  /** ClassName 前缀 */
  prefixCls?: string;
  /** 高清印图片源, 为了高清屏幕显示，建议使用 2倍或3倍图，优先使用图片渲染水印。 */
  image?: string;
  /** 水印文字内容 */
  content?: string | string[];
  /** 文字颜色 */
  fontColor?: string;
  /** 文字样式 */
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  /** 文字族 */
  fontFamily?: string;
  /** 文字粗细 */
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  /** 文字大小 */
  fontSize?: number | string;

  children?: React.ReactNode;
};

interface BasicRouteProps<
  Params extends { [K in keyof Params]?: string } = Record<string, any>,
  C extends StaticContext = StaticContext,
  S = H.LocationState,
  > {
  history: H.History<S>;
  location: H.Location<S>;
  match: match<Params>;
  staticContext?: C | undefined;
}

interface match<Params extends { [K in keyof Params]?: string } = Record<string, any>> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

export type MenuDataItem = {
  /** @name 子菜单 */
  children?: MenuDataItem[];
  /** @name 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** @name 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean;
  /** @name 菜单的icon */
  icon?: React.ReactNode;
  /** @name 自定义菜单的国际化 key */
  locale?: string | false;
  /** @name 菜单的名字 */
  name?: string;
  /** @name 用于标定选中的值，默认是 path */
  key?: string;
  /** @name disable 菜单选项 */
  disabled?: boolean;
  /** @name 路径,可以设定为网页链接 */
  path?: string;
  /**
   * 当此节点被选中的时候也会选中 parentKeys 的节点
   *
   * @name 自定义父节点
   */
  parentKeys?: string[];
  /** @name 隐藏自己，并且将子节点提升到与自己平级 */
  flatMenu?: boolean;
  /** @name 指定外链打开形式，同a标签 */
  target?: string;
  [key: string]: any;
};

type Route = {
  routes?: Route[];
} & MenuDataItem;

type RouterTypes<P extends {}> = {
  computedMatch?: match<P>;
  route?: Route;
  location: BasicRouteProps['location'] | { pathname?: string };
} & Omit<BasicRouteProps, 'location'>;

type GlobalTypes = Omit<
  Partial<RouterTypes<Route>> & SiderMenuProps & HeaderViewProps,
  'collapsed'
>;

type HeaderViewProps = GlobalHeaderProps & {
  isMobile?: boolean;
  logo?: React.ReactNode;
  headerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  headerTitleRender?: WithFalse<
    (logo: React.ReactNode, title: React.ReactNode, props: HeaderViewProps) => React.ReactNode
  >;
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  siderWidth?: number;
  hasSiderMenu?: boolean;
};


export type BasicLayoutProps = GlobalTypes & {
  /**
   * @name 简约模式，设置了之后不渲染的任何 layout 的东西，但是会有 context，可以获取到当前菜单。
   *
   * @example pure={true}
   */
  pure?: boolean;
  /**
   * @name logo 的配置，可以配置url，React 组件 和 false
   *
   * @example 设置 logo 为网络地址  logo="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
   * @example 设置 logo 为组件  logo={<img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/>}
   * @example 设置 logo 为 false 不显示 logo  logo={false}
   * @example 设置 logo 为 方法  logo={()=> <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/> }
   * */
  logo?: React.ReactNode | JSX.Element | WithFalse<() => React.ReactNode | JSX.Element>;

  /**
   * @name 页面切换的时候触发
   *
   * @example 获取切换的页面地址 onPageChange={(location) => { console.log("切换到："+location.pathname) }}
   *
   * */
  onPageChange?: (location?: RouterTypes<Route>['location']) => void;

  /**
   * @name layout 的 loading 效果，设置完成之后只展示一个 loading
   *
   * @example loading={true}
   */
  loading?: boolean;

  /**
   * @name layout
   *
   * @description "zh-CN" | "zh-TW" | "en-US" | "it-IT" | "ko-KR"
   * @example 中文 layout="zh-CN"
   * @example 英文 layout="en-US"
   */
  locale?: LocaleType;

  /**
   * @name 是否收起 layout 是严格受控的，可以 设置为 true，一直收起
   *
   * @example collapsed={true}
   */
  collapsed?: boolean;

  /**
   * @name 收起和展开的时候触发事件
   *
   * @example onCollapse=(collapsed)=>{ setCollapsed(collapsed) };
   */
  onCollapse?: (collapsed: boolean) => void;

  /**
   * @name 页脚的配置
   *
   * @example 不展示dom footerRender={false}
   * @example 使用 layout 的  DefaultFooter   footerRender={() => (<DefaultFooter copyright="这是一条测试文案"/>}
   */
  footerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;

  /**
   * @name 设置 PageHeader 的面包屑，只能处理数据
   *
   * @example 手动设置 breadcrumbRender={(routers = []) => [ { path: '/', breadcrumbName: '主页'} ]
   * @example 增加一项 breadcrumbRender={(routers = []) => { return [{ path: '/', breadcrumbName: '主页'} ,...routers ]}
   * @example 删除首页 breadcrumbRender={(routers = []) => { return routers.filter(item => item.path !== '/')}
   * @example 不显示面包屑 breadcrumbRender={false}
   */
  breadcrumbRender?: WithFalse<
    (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
  >;

  /**
   * @name 设置页面的标题
   * @example 根据页面的路由设置标题 pageTitleRender={(props) => { return props.location.pathname }}
   * @example 不显示标题 pageTitleRender={false}
   * @example 根据默认的标题设置 pageTitleRender={(props,defaultPageTitle) => { return defaultPageTitle + '这是一个测试标题' }}
   * @example 根据 info 来自己组合标题 pageTitleRender={(props,defaultPageTitle,info) => { return info.title + "-" + info.pageName }
   */
  pageTitleRender?: WithFalse<
    (
      props: GetPageTitleProps,
      defaultPageTitle?: string,
      info?: {
        // 页面标题
        title: string;
        // locale 的 title
        id: string;
        // 页面标题不带默认的 title
        pageName: string;
      },
    ) => string
  >;
  /**
   * @name 处理 menuData 的数据，可以动态的控制数据
   * @see 尽量不要用异步数据来处理，否则可能造成更新不及时，如果异步数据推荐使用 menu.request 和 params。
   *
   * @example 删除一些菜单 menuDataRender=((menuData) => { return menuData.filter(item => item.name !== 'test') })
   * @example 增加一些菜单 menuDataRender={(menuData) => { return menuData.concat({ path: '/test', name: '测试', icon: 'smile' }) }}
   * @example 修改菜单 menuDataRender={(menuData) => { return menuData.map(item => { if (item.name === 'test') { item.name = '测试' } return item }) }}
   * @example 打平数据 menuDataRender={(menuData) => { return menuData.reduce((pre, item) => { return pre.concat(item.children || []) }, []) }}
   */
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];

  /**
   * @name 处理每个面包屑的配置，需要直接返回 dom
   * @description (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode
   *
   * @example 设置 disabled： itemRender={(route, params, routes, paths) => { return <Button disabled>{route.breadcrumbName}</Button> }}
   * @example 拼接 path： itemRender={(route, params, routes, paths) => { return <a href={paths.join('/')}>{route.breadcrumbName}</Button> }}
   */
  itemRender?: AntdBreadcrumbProps['itemRender'];

  formatMessage?: (message: MessageDescriptor) => string;
  /** @name 是否禁用移动端模式
   *
   * @see 有的管理系统不需要移动端模式，此属性设置为true即可
   * @example disableMobile={true}
   *  */
  disableMobile?: boolean;

  /**
   * content 的样式
   *
   * @example 背景颜色为红色 contentStyle={{ backgroundColor: 'red '}}
   */
  contentStyle?: CSSProperties;

  className?: string;

  /**
   * @name 取消 content的 margin
   *
   * @example 取消内容的 margin  disableContentMargin={true}
   * */
  disableContentMargin?: boolean;

  /** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
  breadcrumbProps?: AntdBreadcrumbProps & LayoutBreadcrumbProps;

  /** @name 水印的相关配置 */
  waterMarkProps?: WaterMarkProps;

  /**
   * @name 操作菜单重新刷新
   *
   * @example  重新获取菜单 actionRef.current.reload();
   * */
  actionRef?: React.MutableRefObject<
    | {
      reload: () => void;
    }
    | undefined
  >;

  /**
   * @name 错误处理组件
   *
   * @example ErrorBoundary={<MyErrorBoundary/>}
   */
  ErrorBoundary?: any;

  isChildrenLayout?: boolean;
};
