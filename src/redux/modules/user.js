// 스토어 사용 없음, 단순 파이어베이스 인증 함수 이용 및 로컬 리덕스 활용
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import firebase from "firebase";

// Action
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";

// Action Creator
const setUser = createAction(SET_USER, (user_info) => ({ user_info }));
const logOut = createAction(LOGOUT, () => {});
const getUser = createAction(GET_USER, (user) => ({ user }));

// initial State
const initialState = {
  user: null,
  is_login: false,
};

// middleware
const signUpFB = (id, pw, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pw)
      .then((user) => {
        console.log(user);
        
        auth.currentUser
          .updateProfile({ displayName: user_name })
          .then(() => {
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile:
                  "https://image.flaticon.com/icons/png/512/1177/1177568.png",
                uid: user.user.uid,
              })
            );
            window.alert("회원가입에 성공했습니다");
            dispatch(loginFB(id, pw));
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };
};

const loginFB = (id, pw) => {
  return function (dispatch, getState, { history }) {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((response) => {
        auth
          .signInWithEmailAndPassword(id, pw)
          // 여기서 user가 res 속에 있는 user
          .then((user) => {
            console.log(user);
            dispatch(
              setUser({
                user_name: user.user.displayName,
                id: id,
                user_profile:
                  "https://image.flaticon.com/icons/png/512/1177/1177568.png",
                uid: user.user.uid,
              })
            );
            history.replace('/');
            window.location.reload('/');
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
            window.alert('아이디 비밀번호를 확인해주세요')
          });
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.email,
            user_profile:
              "https://image.flaticon.com/icons/png/512/1177/1177568.png",
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      window.location.reload('/');
    });
  };
};

// Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user_info;
        draft.is_login = true;
        console.log(draft.user);
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  logOut,
  getUser,
  signUpFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
