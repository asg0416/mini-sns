import React from "react";
import { Grid, Text, Image } from "../elements";

const Layout = (props) => {
  const { shape, src, contents } = props;

  if (shape === "top") {
    return (
      <React.Fragment>
        <Grid margin="0 auto" maxWidth="70rem">
          <Grid padding="0 1.6rem">
            <Text size="1.6rem">{contents}</Text>
          </Grid>

          <Image shape="rectangle" src={src}></Image>
        </Grid>
      </React.Fragment>
    );
  }

  if (shape === "right") {
    return (
      <React.Fragment>
        <Grid is_flex="t" margin="0 auto" maxWidth="70rem">
          <Image shape="rectangle" src={src}></Image>

          <Grid maxWidth="15rem" padding="2rem 0">
            <Text size="1.6rem" margin="0 2rem">
              {contents}
            </Text>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  if (shape === "left") {
    return (
      <React.Fragment>
        <Grid is_flex="t" margin="0 auto" maxWidth="70rem">
          <Grid maxWidth="15rem" padding="2rem 0">
            <Text size="1.6rem" margin="0 2rem">
              {contents}
            </Text>
          </Grid>

          <Image shape="rectangle" src={src}></Image>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid>
        <Image shape="rectangle" src={src}></Image>
        <Grid padding="0 1.6rem">
          <Text size="1.6rem">{contents}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Layout.defaultProps = {
  shape: "top",
  src: "https://cdn.9oodnews.com/news/photo/202105/6158_9122_295.jpg",
  contents: "샘플 텍스트입니다.",
};

export default Layout;
