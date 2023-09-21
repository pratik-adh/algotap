/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import { styled } from "styled-components";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { client, index, useAlgoliaSearch } from "@/components";

const MainContainer = styled.div`
  background: #fff !important;
  height: 100vh;
  .ant-layout-header {
    display: flex;
    gap: 10px;
    background: #fff !important;
    display: flex;
    justify-content: end;
    .ant-btn {
      margin-top: 8px;
    }
  }
  .container {
    padding: 20px;
    margin-bottom: 25px;

    .form-section {
      display: flex;
      flex-direction: row;
      gap: 40px;
    }
    .btn-wrapper {
      display: flex;
      gap: 40px;
    }
  }
`;

const InputContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: black;
  width: 150px;
`;

const TableContainer = styled.div`
  margin: 20px;
  background: #fff;
  border: 1px solid #dedbd5;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
`;

const DisplayDetails = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [tableData, setTableData] = useState<any>({ data: [], count: 0 });
  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    loadMainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMainData = async () => {
    setDataLoading(true);
    const searchedData: any = await useAlgoliaSearch(values, page);
    setTableData(searchedData);
    setDataLoading(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  const router = useRouter();

  return (
    <MainContainer>
      <Header>
        <Button
          onClick={() => {
            console.log("user list");
            router.push("/user-list/edit");
          }}
        >
          {"+ Add"}
        </Button>
      </Header>
      <div className="container">
        <div className={"form-section"}>
          <div className={"left-section"}>
            <InputContainer>
              <Label>{"Name"}</Label>
              <Input
                name={"name"}
                onChange={(event) =>
                  setValues({ ...values, name: event.target.value })
                }
                width={"336px"}
                placeholder={"Enter your name"}
                value={values.name}
              />
            </InputContainer>
            <InputContainer>
              <Label>{"Age"}</Label>
              <Input
                name={"age"}
                onChange={(event) =>
                  setValues({ ...values, age: event.target.value })
                }
                width={"336px"}
                placeholder={"Enter your age"}
                value={values.age}
              />
            </InputContainer>
          </div>
          <div className={"right-section"}>
            <InputContainer>
              <Label>{"Email"}</Label>
              <Input
                name="email"
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
                width={"336px"}
                placeholder={"Enter your email"}
                value={values.email}
              />
            </InputContainer>
            <InputContainer>
              <Label>{"Address"}</Label>
              <Input
                name={"address"}
                onChange={(event) =>
                  setValues({ ...values, address: event.target.value })
                }
                width={"336px"}
                placeholder={"Enter your address"}
                value={values.address}
              />
            </InputContainer>
          </div>
        </div>
        <div className={"btn-wrapper"}>
          <Button
            htmlType={"submit"}
            onClick={async () => {
              setDataLoading(true);
              const searchedData: any = await useAlgoliaSearch(values, page);
              setTableData(searchedData);
              setDataLoading(false);
            }}
          >
            {"Submit"}
          </Button>
          <Button
            onClick={() => {
              setValues({ name: "", age: "", email: "", address: "" });
              loadMainData();
            }}
          >
            {"Reset"}
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table
          dataSource={tableData?.data}
          loading={dataLoading}
          columns={columns}
          pagination={{
            current: Number(page) || 1,
            total: tableData?.count,
            pageSize: 10,
            onChange: handlePageChange,
            showSizeChanger: false,
            showTotal: (_, range) => {
              return (
                <p>
                  {tableData?.count}
                  {" Total, "}
                  {`${range[0]} ~ ${range[1]}`} {"Items"}
                </p>
              );
            },
          }}
        />
      </TableContainer>
    </MainContainer>
  );
};

export default DisplayDetails;
