import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";

import "moment";
import moment from "moment";

const postDB = firestore.collection("post");

// Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";
const LIKE_TOGGLE = "LIKETOGGLE";

// Action Create
// 여기서 post 는 포스트 리스트의 각각의  포스트 한개
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post_item) => ({ post_item }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const likeToggle = createAction(LIKE_TOGGLE, (post_id, is_like = null) => ({
  post_id,
  is_like,
}));

// initial state
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPostItem = {
  // post_id: doc.id,
  //   user_info: {
  //     id: id
  //     uid: "test_uid",
  //     user_name: "jjang-gu",
  //     user_profile: "https://image.flaticon.com/icons/png/512/64/64572.png",
  //   },
  image_url:
    "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile28.uf.tistory.com%2Fimage%2F990A25335A1D681D321BDB",
  contents: "기본 글 내용",
  like_cnt: 0,
  insert_dt: "2021-04-16 10:00:00",
  shape: "left",
  is_like: false,
};

// middleware
const addPostFB = (contents = "", layout = "top") => {
  return function (dispatch, getState, { history }) {
    const user_module = getState().user.user;
    const layout_shape = getState().image.shape;

    const user_info = {
      user_name: user_module.user_name,
      user_profile: user_module.user_profile,
      user_id: user_module.uid,
    };

    const post_info = {
      ...initialPostItem,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      shape: layout_shape,
    };
    console.log(post_info);

    // 이미지 업로드
    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        })
        .then((url) => {
          postDB
            .add({ user_info, ...post_info, image_url: url })
            .then((doc) => {
              console.log(doc);
              let post = {
                user_info,
                ...post_info,
                post_id: doc.id,
                image_url: url,
              };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("포스트 작성에 에러가 났어요");
              console.log("포스트 스토어 저장, 포스트 리스트에 추가 실패", err);
            });
        })
        .catch((error) => {
          window.alert("이미지 업로드 에러가 났어요");
          console.log("FB 스토리지 이미지 업로드 에러", error);
        });
    });
  };
};

// 파이어베이스에 저장된 게시글 및 사용자 정보 가져와서
// 로컬 리덕스에 setPost 시키는 과정
const getPostFB = (start = null, size = 4) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    const _post = getState().post.list;
    const num = _post.length;
    
    if (_paging.start && !_paging.next) {
      window.alert("다음 내용이 없습니다");
      return;
    }

    dispatch(loading(true));

    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = { post_id: doc.id, ...doc.data() };
          post_list.push(_post);
        });
        if (paging.next) {
          post_list.pop();
        }

        //   이게 post의 state 값이 됨
        if (getState().user.user) {
          dispatch(setIsLike(post_list, paging));
        } else {
          dispatch(setPost(post_list, paging));
        }
      });
  };
};

// 게시글 수정
const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없습니다.");
      return;
    }
    const edit_image = getState().image.preview;
    const layout_shape = getState().image.shape;

    const old_post_idx = getState().post.list.findIndex(
      (p) => p.post_id === post_id
    );
    const old_post = getState().post.list[old_post_idx];

    console.log(old_post);

    if (edit_image === old_post.image_url) {
      postDB
        .doc(post_id)
        .update({ ...post, shape: layout_shape })
        .then((doc) => {
          dispatch(editPost(post_id, { ...post, shape: layout_shape }));
          history.replace("/");
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const edit_upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(edit_image, "data_url");

      edit_upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url, shape: layout_shape })
              .then((doc) => {
                dispatch(
                  editPost(post_id, {
                    ...post,
                    image_url: url,
                    shape: layout_shape,
                  })
                );
                history.replace("/");
              })
              .catch((err) => {
                window.alert("포스트 작성에 에러가 났어요");
                console.log(
                  "포스트 스토어 저장, 포스트 리스트에 추가 실패",
                  err
                );
              });
          })
          .catch((error) => {
            window.alert("이미지 업로드 에러가 났어요");
            console.log("FB 스토리지 이미지 업로드 에러", error);
          });
      });
    }
  };
};

const toggleLikeFB = (post_id, is_like = false) => {
  return function (dispatch, getState, { history }) {
    // 유저 정보가 없으면 실행하지 않기!
    if (!getState().user.user) {
      window.alert("로그인 이후 이용할 수 있습니다.");
      return;
    }

    const likeDB = firestore.collection("like");

    const want_like_idx = getState().post.list.findIndex(
      (p) => p.post_id === post_id
    );
    const want_like_post = getState().post.list[want_like_idx];
    const user_id = getState().user.user.uid;

    //  이미 좋아요 상태일때
    if (want_like_post.is_like) {
      likeDB
        .where("post_id", "==", want_like_post.post_id)
        .where("user_id", "==", user_id)
        .get()
        .then((docs) => {
          let batch = firestore.batch();

          docs.forEach((doc) => {
            batch.delete(likeDB.doc(doc.id));
          });

          batch.update(postDB.doc(post_id), {
            like_cnt:
              want_like_post.like_cnt - 1 < 0
                ? want_like_post.like_cnt
                : want_like_post.like_cnt - 1,
          });

          batch.commit().then(() => {
            // 이제 리덕스 데이터를 바꿔줘요!
            dispatch(likeToggle(post_id, !want_like_post.is_like));
            window.location.reload("/");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likeDB.add({ post_id: post_id, user_id: user_id }).then((doc) => {
        postDB
          .doc(post_id)
          .update({ like_cnt: want_like_post.like_cnt + 1 })
          .then((doc) => {
            // 이제 리덕스 데이터를 바꿔줘요!
            dispatch(likeToggle(post_id, !want_like_post.is_like));
            window.location.reload("/");
          });
      });
    }
  };
};

const setIsLike = (_post_list, paging) => {
  return function (dispatch, getState, { history }) {
    // 로그인하지 않았을 땐 리턴!
    if (!getState().user.is_login) {
      return;
    }

    const likeDB = firestore.collection("like");

    const post_ids = _post_list.map((p) => p.post_id);
    console.log(post_ids);
    
    if (post_ids.length !== 0) {
      let like_query = likeDB.where("post_id", "in", post_ids);

      like_query.get().then((like_docs) => {
        console.log(like_docs.docs);

        if(like_docs.docs){
          let like_list = {};
        like_docs.forEach((doc) => {
          if (like_list[doc.data().post_id]) {
            like_list[doc.data().post_id] = [
              ...like_list[doc.data().post_id],
              doc.data().user_id,
            ];
          } else {
            like_list[doc.data().post_id] = [doc.data().user_id];
          }
        });
        const user_id = getState().user.user.uid;
        let post_list = _post_list.map((p) => {
          if (
            like_list[p.post_id] &&
            like_list[p.post_id].indexOf(user_id) !== -1
          ) {
            return { ...p, is_like: true };
          }

          return p;
        });

        dispatch(setPost(post_list, paging));
        };
        
      });
    } else {
      return;
    }
  };
};

const deletePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    postDB
      .doc(post_id)
      .delete()
      .then((docRef) => {
        window.location.reload();
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        window.alert("삭제 실패했습니다.");
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);


        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post_item);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.post_id);
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

    [LIKE_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        // 배열에서 몇 번째에 있는 지 찾은 다음, is_like를 action에서 가져온 값으로 바꾸기!
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id
        );

        draft.list[idx].is_like = action.payload.is_like;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
  toggleLikeFB,
};

export { actionCreators };
