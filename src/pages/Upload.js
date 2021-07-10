import React from "react";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

// elements
import { Grid, Text, Input, Button, LongMenu } from "../elements";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// components
import { Layout } from "../components";

const Upload = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const is_login = useSelector((state) => state.user.is_login);
  const _shape = useSelector((state) => state.image.shape);

  // 이미지 가져오기
  const preview = useSelector((state) => state.image.preview);
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  // 수정 판별
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  let _post = is_edit ? post_list.find((p) => p.post_id === post_id) : null;

  React.useEffect(() => {
    console.log(_post);
    if (is_edit && !_post) {
      console.log("포스트 정보 없음");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    } else {
      dispatch(imageActions.setPreview(null));
    }
  }, []);

  // 선택한 파일 정보
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(imageActions.setPreview(reader.result));
      };
    }
  };

  // 텍스트 가져오기
  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  // 새 게시글
  const addPost = () => {
    const file = fileInput.current.files[0];
    if (!file){
      window.alert('이미지를 선택해주세요');
      return;
    }
    dispatch(postActions.addPostFB(contents));
  };

  // 수정 게시글
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, {contents: contents}));
  };

  if (!is_login) {
    return (
      <Grid
        margin="0.4rem auto 2rem"
        border="true"
        maxWidth="60rem"
        padding="0 1.6rem 1rem"
        shadow="t"
      >
        <Text size="2.5rem" bold="t" margin="3rem 0.5rem 5rem">
          앗 - 잠깐!
        </Text>
        <Text size="1.6rem" bold="t" margin="3rem 0.5rem 3rem">
          로그인 후에만 글을 쓸 수 있어요!
        </Text>
        <Text size="1.6rem" bold="t" margin="3rem 0.5rem 3rem">
          로그인 후 오른쪽 하단의 플러스 버튼을 눌러주세요!
        </Text>
        <Button
          margin="3rem auto 3rem 0"
          _onClick={() => {
            history.replace("/login");
          }}
        >
          <Text color="white" margin="0" bold="t" size="1.6rem">
            로그인하러 가기
          </Text>
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid
        margin="0.4rem auto 2rem"
        border="true"
        maxWidth="60rem"
        padding="0 1.6rem 1rem"
        shadow="t"
      >
        <Text size="2.5rem" bold="t" margin="3rem 0.5rem 3rem">
          {is_edit ? "게시글 수정" : "새 게시물"}
        </Text>

        <Text bold="t" size="1.6rem" margin="0 0.5rem">
          이미지
        </Text>
        <Grid is_flex margin="0 1.6px">
          <input
            type="file"
            onChange={selectFile}
            ref={fileInput}
            disabled={uploading}
          ></input>
          <LongMenu
            options={["top", "left", "right"]}
            icon={{
              _name: "Layout",
              icon: <ArrowDropDownIcon fontSize="large" />,
            }}
          ></LongMenu>
        </Grid>

        <Text bold="t" size="1.6rem" margin="2rem 0.5rem 1rem">
          Preview
        </Text>
        <Grid border="t" margin="1rem 0 3rem 0">
          <Layout
            shape={_shape}
            src={
              preview
                ? preview
                : "https://cdn.pixabay.com/photo/2016/11/30/18/14/download-1873539_1280.png"
            }
          ></Layout>
        </Grid>

        <Input
          value={contents}
          _onChange={changeContents}
          label="문구 작성"
          placeholder="게시글 내용"
          multiLine="true"
        ></Input>

        {is_edit ? (
          <Button margin="3rem auto 3rem 0" _onClick={editPost}>
            <Text color="white" margin="0" bold="t" size="1.6rem">
              수정하기
            </Text>
          </Button>
        ) : (
          <Button margin="3rem auto 3rem 0" _onClick={addPost}>
            <Text color="white" margin="0" bold="t" size="1.6rem">
              업로드
            </Text>
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Upload;
