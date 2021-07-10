import React from "react";
import styled from "styled-components";

// 하트 버튼은 일단 모양새만 잡아줄거예요!
const LikeBtn = (props) => {
  const heart_pink =
    "https://image.flaticon.com/icons/png/512/2107/2107845.png";
  const heart_gray =
    "https://image.flaticon.com/icons/png/512/2107/2107952.png";
  const icon_url = props.is_like ? heart_pink : heart_gray;

  return (
    <React.Fragment>
      <Heart onClick={props._onClick} icon_url={icon_url}></Heart>
    </React.Fragment>
  );
};

const Heart = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  background: url(${(props) => props.icon_url});
  background-size: cover;
  cursor: pointer;
`;

export default LikeBtn;
