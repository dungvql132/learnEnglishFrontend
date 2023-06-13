import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import { socket } from "../services/connectSocket";

import { io } from "socket.io-client";
import axios from "axios";
const { TextArea } = Input;

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

// export const LoginForm = ({ storeDatas: {}, storeActions: {} }) => {
export const ChatBox = () => {
  const socket = io("http://localhost:1302", {
    transports: ["websocket"],
    auth: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bmd2cTEyM3hAZ21haWwuY29tIiwibmFtZSI6bnVsbCwiaWF0IjoxNjg2NTQzMzIxfQ.hQ-Nc5Quisnk0uIe6zHGU075ih9YZ0nUC0X3J9YgsYU",
    },
    query: {
      group: "group1",
    },
  });

  const [inputValue, setInputValue] = useState("");
  const [inputFile, setInputFile] = useState({
    type: "",
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("connect_error", (err) => {
    console.log("Cannot Connected to server");
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
  });

  socket.on("message", (data) => {
    writeText(data);
  });

  function writeText(text) {
    setInputValue(`${inputValue} \n ${text}`);
  }
  const [form] = Form.useForm();
  return (
    <Div>
      <TextArea value={inputValue} rows={4} />
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
        onFinish={async () => {
          console.log("finished ", form.getFieldsValue().chat_message);
          console.log("file: ", inputFile);

          socket.emit("message", form.getFieldsValue().chat_message);

          const uploadConfig = await axios.get(
            `http://localhost:1302/routes/upload/`,
            {
              params: {
                contentType: inputFile.type,
              },
            }
          );
          console.log("the upload config: ", uploadConfig);

          const rs = await axios.put(uploadConfig.data.url, inputFile, {
            headers: {
              "Content-Type": inputFile.type,
            },
          });

          console.log("result: ", rs);
        }}
      >
        <Form.Item label="Message" name={"chat_message"}>
          <Input placeholder="chat message" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
      <hr style={{ width: "100%" }} />
      <RowDiv></RowDiv>
      <h5>Add an image</h5>
      <input
        onChange={(event) => {
          const inputElement = event.target as any;
          const selectedFiles = inputElement.files[0];
          console.log("selectedFiles: ", selectedFiles);

          setInputFile(inputElement.files[0]);
        }}
        type="file"
        accept="image/*"
      ></input>
    </Div>
  );
};

export default ChatBox;
