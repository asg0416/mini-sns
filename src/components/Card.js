import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid, Text, Image, LongMenu, Button } from "../elements";
import { Layout } from "../components";
import LikeBtn from "./LikeBtn";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";


// PostList에서 넘어온 PostItem 딕셔너리 내용물을 props로 사용가능
const Card = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Grid
        margin="0.4rem auto 2rem"
        border="true"
        maxWidth="60rem"
        minWidth="2.5rem"
        shadow="t"
      >
        <Grid
          is_flex="true"
          maxWidth="60rem"
          margin="auto"
          padding="0 1.6rem"
          borderBottom="1px solid #718093"
        >
          <Grid is_flex="t">
            <Image size="2.5" src={props.user_info.user_profile}></Image>
            <Text margin="0 0 0 0.5rem" size="1.5rem" bold="true">
              {props.user_info.user_name}
            </Text>
          </Grid>

          <Grid is_flex>
            <Text>{props.insert_dt}</Text>
            {props.is_me ? (
                <LongMenu
                  card_info={props}
                  options={["상세보기", "수정", "삭제"]}
                  icon={{ icon: <MoreVertIcon fontSize="large" /> }}
                />
            ) : (
              <LongMenu
                card_info={props}
                options={["상세보기"]}
                icon={{ icon: <MoreVertIcon fontSize="large" /> }}
              />
            )}
          </Grid>
        </Grid>

        <Grid borderBottom="1px solid #718093">
          <Layout
            shape={props.shape}
            src={props.image_url}
            contents={props.contents}
          ></Layout>
        </Grid>

        <Grid padding="0 1.6rem" is_flex>
          <Text margin="1.4rem 0">좋아요 {props.like_cnt}개</Text>
          <LikeBtn
          _onClick={(e) => {
            //  이벤트 캡쳐링과 버블링을 막아요!
            // 이벤트 캡쳐링, 버블링이 뭔지 검색해보기! :)
            e.preventDefault();
            e.stopPropagation();
            dispatch(postActions.toggleLikeFB(props.post_id, props.is_like));
            
          }}
          is_like={props.is_like}
          ></LikeBtn>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Card.defaultProps = {
  user_info: {
    user_name: "song",
    user_profile: "",
  },
  image_url: "",
  contents: "개안이란 이런것",
  insert_dt: "2021-07-02 09:00:00",
  is_me: false,
  shape: "top",
  like_cnt: 0,
  is_like: false,
};

export default Card;
