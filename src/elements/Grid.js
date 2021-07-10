import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    height,
    bg,
    children,
    center,
    _onClick,
    maxWidth,
    border,
    borderBottom,
    minWidth,
    shadow,
    minHeight,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    padding: padding,
    margin: margin,
    bg: bg,
    center: center,
    height: height,
    maxWidth: maxWidth,
    border: border,
    borderBottom: borderBottom,
    minWidth: minWidth,
    shadow: shadow,
    minHeight: minHeight,
  };

  return (
    <React.Fragment>
      {/* styles를 GridBox의 props로 넘겨주고 있는것 */}
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  maxWidth: false,
  border: false,
  borderBottom: false,
  minWidth: false,
  minHeight: false,
  shadow: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : "")}
  ${(props) => (props.minWidth ? `min-width: ${props.minWidth};` : "")}
  ${(props) => (props.minHeight ? `min-height: ${props.minHeight};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.center ? `text-align: ${props.center};` : "")}
  ${(props) => (props.borderBottom ? `border-bottom: ${props.borderBottom};` : "")}
  ${(props) =>
    props.border ? `border-radius: 5px; border: 1px solid #718093;` : ""}
  ${(props) => (props.shadow ? `box-shadow: 0.5rem 0.5rem #dcdde1;` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between`
      : ""}
`;

export default Grid;
