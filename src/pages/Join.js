import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/Common";

// elements
import { Grid, Text, Input, Button } from "../elements";

const Join = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pw_check, setPwCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    if(id === ''|| pw === ''|| pw_check === ''|| user_name === ''){
      window.alert('빈칸을 입력해 주세요');
      return;
    }
    if(!emailCheck(id)) {
      window.alert('이메일 형식이 아닙니다.');
      return;
    }
    if(pw !== pw_check){
      window.alert('비밀번호를 확인해주세요.');
      return;
    }

    dispatch(userActions.signUpFB(id, pw, user_name));
  };

  return (
    <React.Fragment>
      <Grid
        margin="0.4rem auto 2rem"
        border="true"
        maxWidth="60rem"
        padding="0 1.6rem"
        shadow="t"
      >
        <Grid>
          <Text size="2.5rem" bold="t">
            회원가입
          </Text>
        </Grid>

        <Grid margin="0 auto 2rem 0">
          <Input label="아이디" border="t" _onChange={(e) => {
            setId(e.target.value);
          }}></Input>
        </Grid>

        <Grid margin="0 auto 2rem 0">
          <Input label="닉네임" border="t" _onChange={(e) => {
            setUserName(e.target.value);
          }}></Input>
        </Grid>

        <Grid margin="0 auto 2rem 0">
          <Input
            label="비밀번호"
            type="password"
            border="t"
            _onChange={(e) => {
              setPw(e.target.value)
            }}
          ></Input>
        </Grid>

        <Grid margin="0 auto 2rem 0">
          <Input
            label="비밀번호 확인"
            type="password"
            border="t"
            _onChange={(e) => {
              setPwCheck(e.target.value)
            }}
          ></Input>
        </Grid>

        <Button margin="3rem auto 3rem 0" _onClick={() => {signup()}}>
          <Text color="white" margin="0" bold="t" size="1.6rem">
            회원가입
          </Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Join;
