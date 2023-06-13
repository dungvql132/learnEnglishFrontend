import LoginForm from "../../authentication/compoments/login.compoment";
import React from "react";
import { Col, Row } from "antd";

export function LoginPage() {
  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={6}>
          <LoginForm />
        </Col>
      </Row>
    </>
  );
}

export default LoginPage;
