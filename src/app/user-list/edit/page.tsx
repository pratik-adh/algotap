"use client";

import { styled } from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextEditor, TextInput, addItemsToAlgolia } from "@/components";
import { Button } from "antd";
import { uuidv4 } from "@/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IUserManagement {
  name: string;
  email: string;
  age: string;
  address: string;
  description: string;
}

const MainContainer = styled.div`
  background: #fff !important;
  height: 100vh;
  padding: 40px;
  .ant-btn {
    margin-top: 20px;
  }
`;

const EditUserDetails = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    address: yup.string().required("Please enter your address"),
    email: yup
      .string()
      .email("Email address format is incorrect")
      .required("Please enter your email address"),
  });

  const initialValues: IUserManagement = {
    name: "",
    email: "",
    age: "",
    address: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const newValues = { ...values, objectID: uuidv4() };
      await addItemsToAlgolia({ ...newValues, objectID: uuidv4() });
      setLoading(false);
      router.back();
    },
  });

  return (
    <MainContainer>
      <TextInput
        label={"Name"}
        placeholder={"Enter your name"}
        {...formik.getFieldProps("name")}
        error={formik.touched.name && formik.errors.name}
      />
      <TextInput
        label={"Email"}
        placeholder={"Enter your email address"}
        {...formik.getFieldProps("email")}
        error={formik.touched.email && formik.errors.email}
      />
      <TextInput
        label={"Age"}
        placeholder={"Enter your age"}
        {...formik.getFieldProps("age")}
        error={formik.touched.age && formik.errors.age}
      />
      <TextInput
        label={"Address"}
        placeholder={"Enter your address"}
        {...formik.getFieldProps("address")}
        error={formik.touched.address && formik.errors.address}
      />
      <TextEditor
        label="Description"
        data={formik.values.description}
        handleData={(value: any) => {
          formik.setFieldValue("description", value);
        }}
      />
      <Button loading={loading} onClick={() => formik.handleSubmit()}>
        {"Submit"}
      </Button>
    </MainContainer>
  );
};

export default EditUserDetails;
