import { getAllWord } from "@src/utils/callAPI";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Text",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "Author",
    dataIndex: "authorName",
    key: "authorName",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  // Add more columns for other data fields
];

const ViewWord = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getAllWord().then((data) => {
      console.log("data: ", data);
      data = data.data.map((value) => {
        return {
          ...value,
          authorName: `${value.author_id.firstName} ${value.author_id.lastName}`,
        };
      });
      setDataSource(data);
    });
  }, []);

  return <Table dataSource={dataSource} columns={columns} />;
};

export default ViewWord;
