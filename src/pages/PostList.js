import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

// elements
import { Grid, Image } from "../elements";

// components
import { Card } from "../components";
import Permit from "../shared/Permit";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((post_item, idx) => {
          if (post_item.user_info.user_id === user_info?.uid) {
            return <Card key={post_item.post_id} {...post_item} is_me="true" />;
          } else {
            return <Card key={post_item.post_id} {...post_item} />;
          }
        })}

        {/* 게시글 업로드 버튼 */}
        <Permit>
          <Div>
            <Grid maxWidth="80rem" margin="auto" is_flex="t">
              <p></p>
              <Image
                size="5.5"
                shape="circle"
                src="https://image.flaticon.com/icons/png/512/1828/1828817.png"
                _onClick={() => {
                  history.push("/upload");
                }}
              ></Image>
            </Grid>
          </Div>
        </Permit>
      </InfinityScroll>
    </React.Fragment>
  );
};

const Div = styled.div`
  position: fixed;
  margin: auto;
  bottom: 1.5rem;
  right: 0;
  width: 100%;
  z-index: 2;
`;

export default PostList;
