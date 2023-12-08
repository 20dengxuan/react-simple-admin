export {};

declare module 'react-router-dom' {
  interface MetaProps {
    keepAlive?: boolean;
    ignoreAuth?: boolean;
    hideMenu?: boolean;
    hideChildrenInMenu?: boolean;
    orderNo?: number;
    activeMenu?: string;
    icon?: string;
    replacePath?: string;
  }

  interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path: string;
    meta?: MetaProps;
    isLink?: string;
    title: string;
  }
}
