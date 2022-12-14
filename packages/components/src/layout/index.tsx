import InternalLayout, { Content, Footer, Header } from './layout';
import Sider from './Sider';
import './style/index.less';
export { BasicProps as LayoutProps } from './layout';
export { SiderProps } from './Sider';
export * from './basicLayout/interfaces';

type InternalLayoutType = typeof InternalLayout;

interface LayoutType extends InternalLayoutType {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
