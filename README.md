# Aurora

Aurora is a Soundcloud clone that gives creators a platform to upload their tracks and share it with the community. Creators will be able to interact with other creators by liking and commenting on their work. Creators will be able to listen to, create, edit, and delete tracks. Additionally, they will also be able to create, read, edit and delete their comments under a specific track. The like feature gives creators another opportunity to express their thoughts on a track as they will be able to like, see likes, and revoke their existing like under a specific track. Enjoy the [Aurora](https://aa-aurora.herokuapp.com/) experience!

<p align="center">
  <img src='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Screen+Shot+2022-06-06+at+10.36.35+AM.png'></img>
</p>

# Technologies Used
- Javascript
- Express
- PostgreSQL
- React
- Redux
- HTML
- CSS
- Git

# Features

## Tracks
### Create
To create a track, a signed in user can click on the 'plus' icon located in the navigation bar. The navigation bar is accessible throughout the entire website to encourage users to continue creating and sharing with the Aurora community. Below is form for creating a track. Although a cover photo is not required, Aurora will be able to create one for you if a link is not provided. If a cover photo is created, a user will be able to see a preview of their cover photo so that they can be assured that their picture will be played properly. Once a track has been created, please feel free to go back to the splash page and see if your newly created track appears in the 'most recent tracks' section near the bottom of the page! Otherwise, enjoy the result of your new track on the Aurora app!

<p align="center">
  <img src='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/create-track.png'></img>
</p>

### Read
Any user will be able to see and listen to tracks on the website. One way is to scroll down on the home page to the most recent tracks section. This encourages users to discover new tracks! Once clicked, they can use the next and back buttons to navigate through other tracks. A user can also listen to a full track and allow the app to automatically press 'next' for you!

<p align="center">
  <img src='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/track-profile.png'></img>
</p>


### Update
A signed user will be able to edit their tracks on the specified track page. From there, a user can update the song title, description, cover photo, and/or genre. If a user decides that the track they uploaded was the incorrect path, they will need to delete the entire post instead. See belore for more info.

<p align="center">
  <img src='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/update-track.png'></img>
</p>


### Delete
A signed in user will also be able to delete an existing track that they have created. Doing so will also delete the respective comments tied with that track. To delete a track, a user can simply go on the specific track that they want to delete and click on the 'delete' icon in the media controls section (next to the 'back' button).

## Comments
### Create
A signed in user will be able to create a comment to express their thoughts on a track. Although there is a 280 character limit, there is no limit as to how many times a signed in user can post! A character count validator will update in real time to let the user know if they are reaching the character limit.

<p align='center'>
  <img src='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/comment-char-count.png'></img>
</p>

### Read
Any user will be able to see the comments under a specific track. Comments will update to the their respective comments if a song is skipped. Users will be able to see who and when the comment was posted.

### Delete
If a user wants to delete a comment, they can simply press the delete icon under the date of when they posted the comment. A delete confirmation modal will show up asking if the user is sure they want to delete the comment.

# Incoming Features
- User profile
