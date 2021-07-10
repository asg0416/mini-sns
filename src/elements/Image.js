import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, _onClick, cursor } = props;

  const styles = {
    src: src,
    size: size,
    cursor,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles} onClick={_onClick}/>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://image.flaticon.com/icons/png/512/64/64572.png",
  size: 3.6,
  _onClick: () => {},
  cursor: '',
};

const ImageDefault = styled.div`
  z-index: 1;
  --size: ${(props) => props.size}rem;
  width: var(--size);
  min-width: var(--size);
  height: var(--size);
  min-width: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
  z-index: 0;
  width: 100%;
  min-width: 2.5rem;
`;

const AspectInner = styled.div`
  z-index: 1;
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: cover;
`;

const ImageCircle = styled.div`
  z-index: 1;
  --size: ${(props) => props.size}rem;
  width: var(--size);
  min-width: var(--size);
  height: var(--size);
  min-width: var(--size);
  border-radius: 50%;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 0.4rem;
  ${(props) => (props.cursor? `cursor: pointer;`: '')};
`;

export default Image;
