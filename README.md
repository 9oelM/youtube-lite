## Youtube Lite. 
No ads, no distractions. No recommendations. Just find the straight way to what you've gotta watch on youtube and quit youtube. Don't fall into temptations to watch more of more irrelevant, time-wasting videos!

## To be completed 
- [ ] Calculate videos and total time watched
- [ ] Connect above data with `BottomNav` and `Home` components
- [ ] Make redux containers for "Add to Playlist" button inside `VideoPlaylists.js`
- [ ] Mark `Channels` page as under construction
- [ ] Improve the autocomplete search bar (change to a new component with new logic)
- [ ] Error handling on all errors
- [ ] Implement loops and shuffles in playlists
- [ ] Black & White Theming

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