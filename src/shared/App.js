import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
import { actionCreators as userActions } from "../redux/modules/user";

// element
import { Grid } from "../elements";

// component
import { Header } from "../components";

// page
import { PostList, Join, Login, Upload, Detail } from "../pages";

function App() {
  const dispatch = useDispatch();

  // 이렇게 바로 적용해줘야지 permit에서 들고와서 쓰면 바로바로 적용안됨
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const yes_session = sessionStorage.getItem(_session_key);

  React.useEffect(() => {
    if (yes_session) {
      dispatch(userActions.loginCheckFB());
    }
  },[]);

  return (
    <React.Fragment>
      <Header></Header>
      <Grid maxWidth="70rem" margin="auto" padding="7rem 0 1rem 0" bg="white">
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/join" exact component={Join} />
          <Route path="/login" exact component={Login} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/upload/:id" exact component={Upload} />
          <Route path="/detail/:id" exact component={Detail} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
