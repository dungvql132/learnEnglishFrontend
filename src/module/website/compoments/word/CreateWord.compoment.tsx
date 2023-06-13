import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllWordType, getCurrentUser, postWord } from "@src/utils/callAPI";

const { Option } = Select;

const MyForm = () => {
  const [form] = Form.useForm();
  const [wordDetails, setWordDetails] = useState<
    Partial<{
      meaning: string;
      wordType: string;
      word_example_ids: { example: string }[];
    }>[]
  >([]);
  const [dataSource, setDataSource] = useState<
    Partial<{ id: number; type: string }>[]
  >([]);

  useEffect(() => {
    getAllWordType().then((data) => {
      setDataSource(data.data);
    });
  }, []);

  const handleAddWordDetail = () => {
    setWordDetails((prevWordDetails) => [
      ...prevWordDetails,
      { meaning: "", wordType: "", word_example_ids: [] },
    ]);
  };

  const handleRemoveWordDetail = (index) => {
    const newWordDetails = [...wordDetails];
    newWordDetails.splice(index, 1);
    setWordDetails(newWordDetails);
  };

  const onFinish = async (values) => {
    values.word_detail_ids = values.word_detail_ids.map((value) => {
      return {
        ...value,
        wordType: {
          id: value.wordType,
        },
      };
    });

    const userResponse = await getCurrentUser();
    values.author_id = {
      id: userResponse.data.id,
    };

    console.log("values: ", values);

    const resultNewWord = await postWord({
      data: [values],
    });

    console.log("resultNewWord: ", resultNewWord.data);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please enter text" }]}
      >
        <Input />
      </Form.Item>

      {wordDetails.map((wordDetail, index) => (
        <div key={index}>
          <Form.Item
            label="Meaning"
            name={["word_detail_ids", index, "meaning"]}
            rules={[{ required: true, message: "Please enter meaning" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Word Type"
            name={["word_detail_ids", index, "wordType"]}
          >
            <Select>
              {dataSource.map((value, index) => (
                <Option key={index} value={value.id}>
                  {value.type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.List name={["word_detail_ids", index, "word_example_ids"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, fieldIndex) => (
                  <div key={field.key}>
                    <Form.Item
                      {...field}
                      label={`Word Example ${fieldIndex + 1}`}
                      name={[field.name, "example"]}
                    >
                      <Input />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button onClick={() => remove(field.name)}>
                        Remove Example
                      </Button>
                    )}
                  </div>
                ))}
                <Form.Item>
                  <Button onClick={() => add()}>Add Word Example</Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {wordDetails.length > 1 && (
            <Button onClick={() => handleRemoveWordDetail(index)}>
              Remove Detail
            </Button>
          )}
        </div>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={handleAddWordDetail}
          icon={<PlusOutlined />}
        >
          Add Word Detail
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
