import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Text from "./Text";

import { history } from "../redux/configStore";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(props.card_info);
  };

  const handleClose = (option) => {
    setAnchorEl("");
    
    // 클릭하면 해당 수정, 삭제, 상세보기 나옴
    if (option.target.firstChild !== null) {
      let target = option.target.firstChild.innerHTML || option.target.innerHTML || option.target.firstChild.data;
      console.log(target);

      if (target === "상세보기") {
        history.push({
          pathname: `/detail/${props.card_info.post_id}`,
          state: { props: props.card_info },
        });
        console.log(props)
      }
      if (target === "수정") {
        history.push(`/upload/${props.card_info.post_id}`);
      }
      if (target === "삭제") {
        if (window.confirm("해당 게시물을 삭제할까요?")) {
          dispatch(postActions.deletePostFB(props.card_info.post_id));
          console.log("삭제성공");
        }
      }
      if (target === 'top' || target === 'left' || target === 'right'){
        // 여기에 layout 정보 리덕스에 저장할 액션함수 달기
        dispatch(imageActions.setShape(target));
      }
      return;
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.icon._name}
        {props.icon.icon}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <Text size="1.6rem" margin="0">
              {option}
            </Text>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

LongMenu.defaultProps = {
  card_info: {},
  options: ["수정", "삭제", "상세보기"],
  icon: {
    _name: "",
    icon: <MoreVertIcon fontSize="large" />,
  },
  post_id: "0",
};
