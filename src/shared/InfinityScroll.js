import React from "react";
import _ from "lodash";
import Spinner from "../elements/Spinner";
import { useSelector } from "react-redux";

const InfinityScroll = (props) => {
  const post_list = useSelector((state) => state.post.list)
  const limit_num = post_list.length
  const { children, callNext, is_next, loading } = props;

  const _handleScroll = _.throttle(() => {
    
    if (loading) {
      return;
    }

    
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (limit_num < 4) {
      return;
    }

    if (is_next) {
      // 스크롤 이벤트 구독 후 함수 실행
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    // useEffect에서 리턴하면 이벤트 구독을 클린업한다고 함
    // willUnMount 랑 같은 역할
    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {props.children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
};

export default InfinityScroll;

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
