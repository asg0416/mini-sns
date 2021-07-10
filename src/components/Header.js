import React from "react";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from '../shared/firebase'

import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

const Header = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const yes_session = sessionStorage.getItem(_session_key)? true : false;

  if (is_login && yes_session) {
    return (
      <React.Fragment>
        <Div>
          <Grid>
            <Grid
              is_flex="true"
              maxWidth="70rem"
              margin="0.4rem auto"
              padding="0.4rem 1.6rem"
            >
              <Text
                margin="0"
                size="3.5rem"
                bold="true"
                color="#00a8ff"
                cursor="t"
                _onClick={() => {
                  history.replace("/");
                }}
              >
                mini
              </Text>
              <Grid is_flex="true">
                <Text size="1.6rem" margin="0 1rem 0 0">
                  <b>{user_info.user_name}</b>님
                </Text>
                <Text
                  size="1.6rem"
                  cursor="t"
                  _onClick={() => {
                    dispatch(userActions.logoutFB());
                  }}
                  margin="0 1rem 0 0"
                >
                  Logout
                </Text>

                <Image size="3.5" src={user_info.user_profile}></Image>
              </Grid>
            </Grid>
          </Grid>

          <hr style={{ border: "1px solid #dcdde1", margin: 0 }} />
        </Div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Div>
        <Grid>
          <Grid
            is_flex="true"
            maxWidth="70rem"
            margin="0.4rem auto"
            padding="0.4rem 1.6rem"
          >
            <Text
              margin="0"
              size="3.5rem"
              bold="true"
              color="#00a8ff"
              cursor="t"
              _onClick={() => {
                history.push("/");
              }}
            >
              mini
            </Text>
            <Grid is_flex="true">
              <Text
                size="1.6rem"
                cursor="t"
                _onClick={() => {
                  history.push("/login");
                }}
                margin="0 1rem 0 0"
              >
                LOGIN
              </Text>
              <Text
                size="1.6rem"
                cursor="t"
                _onClick={() => {
                  history.push("/join");
                }}
                margin="0 1rem 0 0"
              >
                JOIN
              </Text>
              <Image
                size="3.5"
                src="https://image.flaticon.com/icons/png/512/64/64572.png"
              ></Image>
            </Grid>
          </Grid>
        </Grid>

        <hr style={{ border: "1px solid #dcdde1", margin: 0 }} />
      </Div>
    </React.Fragment>
  );
};

const Div = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 2;
`;

Header.defaultProps = {
  user_info: {
    user_name: "",
    user_profile:
      "https://cdn.9oodnews.com/news/photo/202105/6158_9122_295.jpg",
  },
};

export default Header;
