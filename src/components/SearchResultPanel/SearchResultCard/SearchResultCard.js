import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const searchResultCard = ({ title, author, img, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="title">{title}</Typography>
        <Typography variant="subheading">{`by ${author}`}</Typography>
      </CardContent>
      <CardMedia className="searchResultMedia" image={img} title={title} />
      <CardContent>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default searchResultCard
