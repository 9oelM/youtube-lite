import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'

const searchResultCard = ({ title, author, img, description, onClick, id }) => {
  return (
    <Grid className="searchResultCardWrapper">
      <ButtonBase className="searchResultCard" id={id} onClick={onClick}>
        <Card square className="searchResultCardInner">
          <CardContent>
            <Typography align="left" variant="title">
              {title.length > 60 ? `${title.substring(0.6)}...` : title}
            </Typography>
            <Typography
              align="left"
              variant="subheading"
            >{`by ${author}`}</Typography>
          </CardContent>
          <CardMedia className="searchResultMedia" image={img} title={title} />
          <CardContent>
            <Typography align="left" variant="body1">
              {description.length > 100
                ? `${description.substring(0, 100)}...`
                : description}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  )
}

export default searchResultCard
