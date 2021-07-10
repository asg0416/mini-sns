import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    multiLine,
    label,
    placeholder,
    _onChange,
    type,
    value,
    accept,
    border,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && (
          <Text margin="0 0.5rem 0.5rem" size="1.6rem" bold='t'>
            {label}
          </Text>
        )}
        <ElTextarea
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          rows={10}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0 0 0.5rem 0">{label}</Text>}
        <InputTag
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          accept={accept}
          border={border}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요",
  type: "text",
  value: "",
  border: false,
  // callBack 함수
  _onChange: () => {},
};

const InputTag = styled.input`
  ${(props) => props.border? `border: 1px solid #212121`:''};
  border-radius: 5px;
  width: 100%;
  padding: 1.2rem 0.4rem;
  box-sizing: border-box;
`;

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  border-radius: 5px;
  width: 100%;
  padding: 1.2rem 0.4rem;
  box-sizing: border-box;
  resize: none;
  font-size: 1.6rem;
`;

export default Input;
