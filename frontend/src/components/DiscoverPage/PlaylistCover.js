const PlaylistCover = ({track}) => {

    return (
        <img
            className='playlistTrack-cover-photo'
            src={track.imagePath}
        />
    )
}

export default PlaylistCover
