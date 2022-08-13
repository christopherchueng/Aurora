import { Link } from 'react-router-dom'
import '../Search.css'

const SearchResults = ({track}) => {
    return (
        <>
            <div className="left-search">
                <div className="search-imagePath">
                    <Link to={`/tracks/${track?.id}`}><img src={track.imagePath}></img></Link>
                </div>
            </div>
            <div className='right-search'>
                <div className="search-track-info">
                    <div className="username-creation-ctn">
                        <div className="search-track-user search-text-color">
                            {track?.User?.username}
                        </div>
                        <div className="search-track-createDate search-text-color">
                            {track.createdAt}
                        </div>
                    </div>
                    <div className="search-title-genre-ctn">
                        <div className="search-track-title">
                            <Link to={`/tracks/${track?.id}`}>{track.title}</Link>
                        </div>
                        <div className="search-genre search-text-color">
                            #{track.genre}
                        </div>
                    </div>
                </div>
                <div className="search-trackPath">
                    <audio src={track.trackPath}></audio>
                </div>
            </div>
        </>
    )

}

export default SearchResults
