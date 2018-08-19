import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from './SearchResultCard.js'
import shortid from 'shortid'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
class SearchResultPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      anchor: null,
      cards: [],
      maxCardNum: 0,
    }
  }

  componentDidMount() {
    this.setState({
      cards: document.getElementsByClassName('searchResultCard'),
    })
  }

  handleClick = (event, index) => {
    let clickedCard = this.findClickedCard(event, this.state.cards)
    console.log(`left: ${clickedCard.offsetLeft + clickedCard.clientWidth / 2}
    top: ${clickedCard.offsetTop + clickedCard.clientHeight / 2}
    `)

    this.setState({
      anchor: {
        left: clickedCard.offsetLeft + clickedCard.clientWidth / 2,
        top: clickedCard.offsetTop + clickedCard.clientHeight / 2,
      },
    })
  }

  handleClose = () => {
    this.setState({
      anchor: null,
    })
  }

  findClickedCard = (event, cards) => {
    for (let i = 0; i < cards.length; i++) {
      if (event.currentTarget.id == cards[i].id) return cards[i]
    }
  }

  render() {
    const { searchResults } = this.props
    const { anchor } = this.state
    let open = Boolean(anchor)
    console.log('A: ' + this.state.anchor)
    return (
      <Grid style={{ padding: 16 }}>
        <Grid spacing={16} container justify="center">
          {searchResults.map((item, i) => {
            return (
              <Card
                key={shortid.generate()}
                title={item.title}
                author={item.channelTitle}
                description={item.description}
                img={item.thumbnails.medium.url}
                id={`card-${i}`}
                vId={item.id}
                onClick={e => this.handleClick(e, i)}
              />
            )
          })}
          <Popover
            id="simple-popper"
            open={open}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            anchorReference="anchorPosition"
            anchorPosition={anchor}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <VideoPlayer />
          </Popover>
        </Grid>
      </Grid>
    )
  }
}

export default SearchResultPanel
