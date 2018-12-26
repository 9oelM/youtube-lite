![build status](https://travis-ci.org/9oelM/Youtube-Lite.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/9oelM/Youtube-Lite/badge.svg?branch=master)](https://coveralls.io/github/9oelM/Youtube-Lite?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/4556af7c8e91ab9c3f37/maintainability)](https://codeclimate.com/github/9oelM/Youtube-Lite/maintainability)

## Youtube Lite: Youtube that _doesn't_ scale. 
No ads, no distractions. No recommendations. Just find the straight way to what you've gotta watch on youtube and quit youtube. Don't fall into temptations to watch more of more irrelevant, time-wasting videos!

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

## Expected point of completion
Perhaps late January?

## Development

### Start and watch
```
gulp
```

### Linting
running `gulp` on command line will automatically lint and prettier the code. But if you only wanna lint and prettier other than launching the server & etc:
```
gulp watch
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

## What is used
* [material-ui](https://github.com/mui-org/material-ui)
* [new-material-react-youtube-autocomplete](https://github.com/9oelM/new-material-react-youtube-autocomplete)
* [react-youtube](https://github.com/troybetz/react-youtube)
* [redux](https://github.com/reduxjs/redux)
* [react](https://github.com/facebook/react)
* sass
* [gulp](https://github.com/gulpjs/gulp)
