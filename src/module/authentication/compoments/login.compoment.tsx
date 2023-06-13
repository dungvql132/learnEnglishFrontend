import { Form, Input, Button, message } from "antd";
import { Title1, Title2, ErrorDiv } from "../../authentication/styles";
import { loginService } from "../../authentication/services/login.service";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";
import { setToken } from "@src/utils/handleToken";

const Div = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .ant-form.ant-form-vertical {
    width: 100%;
  }
`;
const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// export const LoginForm = ({ storeDatas: {}, storeActions: {} }) => {
export const LoginForm = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const [errorMessge, setErrorMessge] = React.useState("");
  return (
    <Div>
      <Title1>Welcome to Dung Website!!</Title1>
      <Title2>Please sign-in to your account. </Title2>
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
        onFinish={() => {
          loginService(form.getFieldsValue())
            .then((rs) => {
              setErrorMessge("Login success full");
              setToken(rs.data.token);
              history("/home");
            })
            .catch((error) => {
              console.log("the error: ", error);

              message.error(error.response.data.message, 3);
              setErrorMessge(error.response.data.message);
            });
        }}
      >
        <Form.Item label="Email" name={"email"}>
          <Input placeholder="input email" />
        </Form.Item>
        <Form.Item label="Password" name={"password"}>
          <Input.Password placeholder="input password" />
        </Form.Item>
        <ErrorDiv style={{ display: errorMessge == "" ? "none" : "flex" }}>
          {errorMessge}
        </ErrorDiv>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <RowDiv>
        <a
          onClick={() => {
            history("/register");
          }}
        >
          create new account
        </a>

        {/* <a
          onClick={() => {
            history.push({ pathname: "/register" });
          }}
        >
          forgot password
        </a> */}
      </RowDiv>
      <hr style={{ width: "100%" }} />
      <RowDiv></RowDiv>
    </Div>
  );
};

export default LoginForm;
