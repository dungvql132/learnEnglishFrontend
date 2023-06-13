import { Form, Input, Button, message, InputNumber } from "antd";
import { Title1, Title2, ErrorDiv } from "../../authentication/styles";
import { registerService } from "../../authentication/services/register.service";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  padding: 0 10%;
  align-items: center;
`;

// export const RegisterForm = ({ storeDatas: {}, storeActions: {} }) => {
export const RegisterForm = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const [errorMessge, setErrorMessge] = React.useState("");
  return (
    <Div>
      <Title1>Welcome to Dung Website!!</Title1>
      <Title2>Create your account. </Title2>
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
        onFinish={() => {
          // console.log("finished ", form.getFieldsValue());
          registerService(form.getFieldsValue())
            .then((rs) => {
              setErrorMessge("Register success full");
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
        <Form.Item label="FirstName" name={"firstname"}>
          <Input placeholder="input first name" />
        </Form.Item>
        <Form.Item label="lastName" name={"lastname"}>
          <Input placeholder="input lasr name" />
        </Form.Item>
        <Form.Item label="Age" name={"age"}>
          <InputNumber placeholder="input age" />
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
            history("/login");
          }}
        >
          Allready have an account, go to Login Page
        </a>
      </RowDiv>
      <hr style={{ width: "100%" }} />
      <RowDiv></RowDiv>
    </Div>
  );
};

export default RegisterForm;
