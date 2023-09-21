import { styled } from "styled-components";
import { Input } from "antd";
import React from "react";

const TextFieldWrapperStyled = styled.div`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  display: flex;
  flex-direction: column;

  .ant-input[disabled] {
    background-color: transparent;
  }
  margin-bottom: 20px;

  .label-container {
    display: flex;
    margin-bottom: 10px;
    color: black;
    .label {
      opacity: 1;
      margin-right: 5px;
      font-weight: 500;
    }
  }
`;

export const ErrorLabel = styled.div<any>`
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  .error {
    color: red !important;
    font-size: 12px;
    margin-top: 2px;
    margin-left: 2px;
  }
`;

interface ITextInput {
  label?: string;
  required?: string;
  value?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  error?: string | boolean;
  name?: string;
  type?: string;
}

const TextInput: React.FC<ITextInput> = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  error,
  name,
  type,
  ...rest
}) => {
  return (
    <TextFieldWrapperStyled>
      {label && (
        <div className={"label-container"}>
          <span className={"label"}>{label}</span>
        </div>
      )}
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorLabel>
        {error ? <div className={"error"}>{error}</div> : <div />}
      </ErrorLabel>
    </TextFieldWrapperStyled>
  );
};

export { TextInput };
