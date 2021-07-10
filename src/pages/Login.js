import React from "react";
import { actionCreators as userActions } from '../redux/modules/user'
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/Common";

// elements
import { Grid, Text, Input, Button } from "../elements";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");

  const login = () => {
    if(id === '' || pw === ''){
      window.alert('빈칸을 입력해주세요');
      return;
    }
    if(!emailCheck(id)){
      window.alert("이메일 형식이 아닙니다.");
      return;
    }
    dispatch(userActions.loginFB(id, pw));
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
            로그인
          </Text>
        </Grid>

        <Grid margin="0 auto 2rem 0">
          <Input
            label="아이디"
            border="t"
            value={id}
            _onChange={(e) => {
              setId(e.target.value);
            }}
          ></Input>
        </Grid>

        <Grid margin="0 auto 2rem 0">
          <Input
            label="비밀번호"
            type="password"
            border="t"
            value={pw}
            _onChange={(e) => {
              setPw(e.target.value);
            }}
          ></Input>
        </Grid>

        <Button
          margin="3rem auto 3rem 0"
          _onClick={() => {
            console.log("로그인 연결");
            login();
          }}
        >
          <Text color="white" margin="0" bold="t" size="1.6rem">
            로그인
          </Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
