import RegisterForm from "../../authentication/compoments/register.compoment";
import React from "react";
import { Col, Row } from "antd";

export function RegisterPage() {
  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={6}>
          <RegisterForm />
        </Col>
      </Row>
    </>
  );
}

export default RegisterPage;
