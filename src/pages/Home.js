import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card'
import {CardContent, Grid} from '@material-ui/core';
const Home = ({ isEng = true }) => {
  const captionEng = `No more wasting time on watching random, irrelevant videos on youtube. Feel guilty by looking at the statistics you generate.
  Use the upper search bar to begin.`;
  const captionKor = `유투브에서 아무 비디오나 보다가 시간 낭비하는 건 이제 그만. 여러분이 직접 만들어내는 통계를 보고 죄책감을 느끼세요.
  상단의 동영상 검색을 통해 시작해보세요.`;

  const caption = isEng ? captionEng : captionKor;
  return (
    <React.Fragment>
      <Grid style = {{
        padding: '8px'
      }}>
      <Card>
        <CardContent>
          <Typography variant="headline">Youtube Lite</Typography>
          <Typography variant="subheading">{caption}</Typography>
        </CardContent>
      </Card>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
