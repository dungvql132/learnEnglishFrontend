import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const SideMenu = ({ CustomMenu }) => {
  try {
    return (
      <Sider width={200} className="site-layout-background">
        {CustomMenu}
      </Sider>
    );
  } catch (error) {
    return (
      <Sider width={200} className="site-layout-background">
        {<CustomMenu />}
      </Sider>
    );
  }
};

const MainContent = ({ CustomContent }) => {
  try {
    return (
      <Content
        style={{ marginLeft: "1%", padding: "24px", minHeight: "100vh" }}
      >
        {CustomContent}
      </Content>
    );
  } catch (error) {
    return (
      <Content
        style={{ marginLeft: "1%", padding: "24px", minHeight: "100vh" }}
      >
        {<CustomContent />}
      </Content>
    );
  }
};

const TwoColumnLayout = ({ CustomMenu, CustomContent }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu CustomMenu={CustomMenu} />
      <MainContent CustomContent={CustomContent} />
    </Layout>
  );
};

export default TwoColumnLayout;
