import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonBase from '@material-ui/core/ButtonBase'

const searchResultCard = ({ title, author, img, description }) => {
  return (
    <ButtonBase className="searchResultCard">
      <Card square>
        <CardContent>
          <Typography align="left" variant="title">
            {title}
          </Typography>
          <Typography
            align="left"
            variant="subheading"
          >{`by ${author}`}</Typography>
        </CardContent>
        <CardMedia className="searchResultMedia" image={img} title={title} />
        <CardContent>
          <Typography align="left" variant="body1">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  )
}

export default searchResultCard
