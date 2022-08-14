import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import DateConverter from '../../DateConverter'
import '../Search.css'

const SearchResults = ({track}) => {
    const audioPlayer = useRef();

    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()
    }, [isPlaying])

    return (
        <>
            <div className="left-search">
                <div className="search-imagePath">
                    <Link to={`/tracks/${track?.id}`}><img src={track.imagePath}></img></Link>
                </div>
            </div>
            <div className='right-search'>
                <div className='top-right'>
                    <div className='play-pause-search'>
                        <div className='search-play-ctn'>
                            {/* If not playing, play button will display */}
                            {/* If playing, pause button will display */}
                            <button
                                type='button'
                                className='play-pause'
                                onClick={() => setIsPlaying(!isPlaying)}
                                // onChange={isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()}
                            >
                                {isPlaying
                                ? <i className="fa-solid fa-circle-pause fa-3x search-pause"></i>
                                : <i className="fa-solid fa-circle-play fa-3x search-play"></i>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="search-track-info">
                        <div className="username-creation-ctn">
                            <div className="search-track-user search-text-color">
                                {track?.User?.username}
                            </div>
                            <div className="search-track-createDate search-text-color">
                                <DateConverter date={track.createdAt} />
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
                </div>
                <div className="search-trackPath">
                    <audio ref={audioPlayer} src={track.trackPath}></audio>
                </div>
            </div>
        </>
    )

}

export default SearchResults
