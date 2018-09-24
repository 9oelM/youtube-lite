import React from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import ContentGrid from "../layout/contentGrid"
import GithubIcon from "../components/Icons/Github"
import FeedIcon from "../components/Icons/Feed"
import LinkedInIcon from "../components/Icons/LinkedIn"

const About = () => (
  <ContentGrid>
    <Paper className="comfort-grid" style={{ padding: "20px" }}>
      <Typography variant="headline" gutterBottom>
        About this project
      </Typography>
      {`This is a project for the people who tend to waste their time way by watching youtube videos in an uncontrolled manner.
        
        Youtube is good only when it's used with a controlled mind. When you go onto youtube, there is just too much information while, in many cases, you loaded it because you need to see some video that you've gotta see for your education or developmental purposes. Very often, you know you just end up watching videos you did not even plan to see!
        
        Even if you are watching youtube just for fun, there are tonnes of distractions: ads, comments, suggested videos... I mean, they are good, but you get to lose your time by trying to absorb all these pieces of information. 
        
        I tried to remove most of the distractions. But I cannot really stop you from searching meaningless, time wasting videos.
        
        Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity, because the days are evil. Therefore do not be foolish, but understand what the Lord’s will is. (Ephesians 5:15-17)
        
        This project was launched up by Joel Mun.
        `
        .split("\n")
        .map(
          (paragraph, i, arr) =>
            paragraph.includes(
              "Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity, because the days are evil. Therefore do not be foolish, but understand what the Lord’s will is."
            ) ? (
              <Typography
                parapgrah
                style={{ padding: "10px", fontStyle: "italic" }}
              >
                {paragraph}
              </Typography>
            ) : (
              <Typography paragraph={i != arr.length - 1}>
                {paragraph}
              </Typography>
            )
        )}
      <Grid container spacing={8}>
        {[
          { icon: <GithubIcon />, link: "https://github.com/9oelM" },
          { icon: <FeedIcon />, link: "https://9oelm.github.io" },
          {
            icon: <LinkedInIcon />,
            link: "https://www.linkedin.com/in/7oelm/",
          },
        ].map(obj => (
          <IconButton href={obj.link}>{obj.icon}</IconButton>
        ))}
      </Grid>
    </Paper>
  </ContentGrid>
)

export default About
