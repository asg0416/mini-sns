import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { bg, padding, color, margin, text, _onClick, is_float, children, width } = props;

  const styles = {
    bg: bg,
    color: color,
    margin: margin,
    is_float: is_float,
    width: width,
    padding: padding,
  };

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  bg: "#00a8ff",
  color: "white",
  margin: false,
  width: '100%',
  is_float: false,
  children: null,
  padding: '1.2rem 0',
  _onClick: () => {},
};

const ElButton = styled.button`
  cursor: pointer;
  width: ${(props) => props.width};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
`;

const FloatButton = styled.button`
  width: 5rem;
  height: 5rem;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 3.6rem;
  font-weight: 800;
  position: fixed;
  bottom: 5rem;
  right: 1.6rem;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 2;
`;
export default Button;
