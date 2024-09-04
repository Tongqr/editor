import React from "react";
import { Layout, Menu, Breadcrumb, Flex } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link, matchRoutes, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { routers } from "../routers/index";

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  //   minHeight: 120,
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "transparent",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
  width: "10%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  borderRadius: 0,
  overflow: "hidden",
  width: "calc(100vw)",
  height: "calc(100vh)",
};

const LayoutComponent: React.FC = ({ children }) => {
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [isInit, setIsInit] = useState<Boolean>(false);
  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr: string[] = [];
    if (routes !== null) {
      routes.forEach((item) => {
        const path = item.route.path;
        if (path) {
          pathArr.push(path);
        }
      });
    }
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);
  }, [location.pathname]);
  if (!isInit) {
    return null;
  }

  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        {/* 根据url地址实现选中高亮 */}
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu key="/user" icon={<UserOutlined />} title="subnav 1">
            <Menu.Item key="1">
              <Link to="/home">home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/testUseEffect">测试useEffect</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/editor">编辑器</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/board">board</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={headerStyle}>Header</Header> */}
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
