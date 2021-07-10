import React from "react";
import { Grid, Text, Image } from "../elements";
import { Layout } from "../components";

const Detail = (props) => {
  const card_info = props.location.state.props;
  console.log(card_info);

  return (
    <React.Fragment>
      <Grid
        margin="0.4rem auto 2rem"
        border="true"
        maxWidth="70rem"
        minWidth="2.5rem"
        shadow="t"
      >
        <Grid
          is_flex="true"
          maxWidth="70rem"
          margin="auto"
          padding="0 1.6rem"
          borderBottom="1px solid #718093"
        >
          <Grid is_flex="t">
            <Image size="2.5" src={card_info.user_info.user_profile}></Image>
            <Text margin="1.4rem 0.5rem" size="1.5rem" bold="true">
              {card_info.user_info.user_name}
            </Text>
          </Grid>
        </Grid>

        <Grid borderBottom="1px solid #718093">
          <Layout
            shape={card_info.shape}
            src={card_info.image_url}
            contents={card_info.contents}
          ></Layout>
        </Grid>

        <Grid padding="0 1.6rem">
          <Text margin="1.4rem 0">좋아요 {card_info.like_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
