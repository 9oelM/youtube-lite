[![Build status](https://travis-ci.org/9oelM/youtube-lite.svg?branch=master)](https://travis-ci.org/9oelM/youtube-lite)
[![Coverage Status](https://coveralls.io/repos/github/9oelM/Youtube-Lite/badge.svg?branch=master)](https://coveralls.io/github/9oelM/Youtube-Lite?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/4556af7c8e91ab9c3f37/maintainability)](https://codeclimate.com/github/9oelM/Youtube-Lite/maintainability)

# Youtube :tv: Lite: Youtube that _doesn't_ scale. 
![youtubel lite logo](./public/youtube-lite-logo-256.png)
**No ads, no distractions. No recommendations.** Just find the straight way to what you've gotta watch on youtube and quit youtube. Don't fall into temptations to watch more of more irrelevant, time-wasting videos!

## Features

### Light :balloon:
It's really light. It's designed to only bring the core functionalities of youtube. You don't need to login to get your playlist. It remembers your settings and playlist on localStorage. It's going to be there always unless you clear it intendedly.

### Clear :crystal_ball:
You don't see recommendations :books:. You don't see ads. Thus no distractions. Just go straight to hop into the video you want to watch. You are going to be less tempted to watch useless videos. Yay!

### Timer :hourglass:
It will automatically calculate the number of videos and the duration of time you spent watching them and display it to you. The more you watch, the more you are going to feel serious!

### Customizable :surfer:
You could add your own API key in case pre-inserted API key is running out of requests limited per day. You could also hide the stats bar if you are feeling  bothered by that. Lots of more options are coming in next updates.

## Development
youtube-lite uses [`react-app-rewired`](https://github.com/timarney/react-app-rewired). It's a tweaked version of `create-react-app` that would allow you to change webpack configs, so you could play around with it. 

The structure of the project follows a general concensus among react development communities. You will see components and redux codes in `src` folder. 

### Start development server and automatically lint and restart server on change
```
gulp
```

### eslint --fix
Install things globally:
```
npm install -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint^5
```
Then you can do
```
eslint --fix
```
otherwise you get an error.

## Contributing 
For now, there is no `CONTRIBUTING.md` guideline. Feel free to submit PRs and issues! There are lots of functionalities that are planned to be added to this project. 

## Thanks to the contributors who made these tools
* [material-ui](https://github.com/mui-org/material-ui)
* [react-youtube](https://github.com/troybetz/react-youtube)
* [redux](https://github.com/reduxjs/redux)
* [redux-persist](https://github.com/rt2zz/redux-persist)
* [react](https://github.com/facebook/react)
* [react-app-rewired](https://github.com/timarney/react-app-rewired)
* [enzyme](https://github.com/airbnb/enzyme)
* [jest](https://github.com/facebook/jest)
* [sass](https://github.com/sass/sass)
* [gulp](https://github.com/gulpjs/gulp)
* [react-youtube](https://github.com/troybetz/react-youtube)
* [youtube-search](https://github.com/MaxGfeller/youtube-search)

## To be completed 
- [x] Calculate videos and total time watched
- [x] Connect above data with `BottomNav` and `Home` components
- [x] Mark `Channels` page as under construction
- [x] Sync data with localStorage (do not sync `timer` as it does not get stringified)
- [x] Add clear localStorage option in settings
- [x] Black & White Theming
- [x] Fix close & open states for `PlaylistDialog` and add snackbar to confirm action
- [ ] Make redux containers for "Add to Playlist" button inside `VideoPlaylists.js`
- [ ] Improve the autocomplete search bar (change to a new component with new logic)
- [ ] Error handling on edge cases:
    - [ ] On add playlist action, a name that already exists is entered. 
    - [ ] Youtube search result gives an error due to some error (network, API Key, ...)
    - [ ] Wrong API key is entered in `settings`.
- [ ] Implement loops and shuffles in playlists
    - [ ] Delay component render until the video currently playing finishes
- [ ] Enable dragging on songs in playlist to change the queue or delete them
- [ ] Mobile optimization
    - [ ] Fix buggy top & bottom nav bars in mobile view  
- [ ] Add tests with Jest and fix components that cause buggy tests
- [ ] Make desktop version with electron

## Expected point of completion of core product :calendar:
Late January
