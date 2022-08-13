const SearchResults = ({track}) => {
    return (
        <>
            <div className="search-track-title">
                {track.title}
            </div>
            <div className="search-track-user">
                {track?.User?.username}
            </div>
            <div className="search-genre">
                {track.genre}
            </div>
            <div className="search-imagePath">
                <img src={track.imagePath}></img>
            </div>
            <div className="search-trackPath">
                <audio src={track.trackPath}></audio>
            </div>
            <div className="search-track-createDate">
                {track.createdAt}
            </div>
        </>
    )

}

export default SearchResults
