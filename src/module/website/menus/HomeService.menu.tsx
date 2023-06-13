import React from "react";
import { Layout, Menu } from "antd";
import { BookOutlined } from "@ant-design/icons";

const HomeServiceMenu = ({ handleChangeMenu }) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
      onClick={handleChangeMenu}
    >
      <Menu.SubMenu key="word" icon={<BookOutlined />} title="Word">
        <Menu.Item key="view_word">View Word</Menu.Item>
        <Menu.Item key="create_word">Create Word</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default HomeServiceMenu;
