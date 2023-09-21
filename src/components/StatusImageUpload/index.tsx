import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  .button-title {
    font-weight: 400;
    font-size: 14px;
  }
`;

const Error = styled.div<any>`
  margin-left: 2em;
  color: red;
  font-size: 12px;
`;

interface ImageFile {
  imageFile: string;
  imagePreviewUrl: string;
}
interface Props {
  handleChange: (imageFile: ImageFile) => void;
}

const StatusImageUpload: React.FC<Props> = ({ handleChange }: Props) => {
  const [loading, setLoading] = useState(false);

  const [showImageError, setShowImageError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | any>("");

  const onRemove = async () => {
    const imageFile = {
      imageFile: "",
      imagePreviewUrl: "",
    };
    handleChange(imageFile);
  };

  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    try {
      onSuccess?.("ok");
    } catch (err: any) {
      onError?.(err);
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <UploadWrapper>
      <Upload
        accept={"image/*"}
        customRequest={handleUpload}
        className={"upload-image"}
        onRemove={onRemove}
        showUploadList={false}
      >
        <button type={"button"}>
          <span
            title={"Add Image"}
            style={{ position: "relative", marginTop: loading ? -3 : 0 }}
          >
            {loading ? (
              <LoadingOutlined />
            ) : (
              <img src={"/assets/MenuBarIcons/add-picture.svg"} />
            )}
          </span>
        </button>
      </Upload>
    </UploadWrapper>
  );
};

export { StatusImageUpload };
