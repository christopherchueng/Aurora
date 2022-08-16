import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLikes, postLike, deleteLike } from '../../../store/likes'
import DateConverter from '../../DateConverter'
import '../Search.css'

const SearchResults = ({track}) => {
    const audioPlayer = useRef();
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const likes = useSelector(state => state?.like?.entries)
    const likesArr = Object.values(likes).filter(like => like.trackId === track?.id)
    const userLike = likesArr.find(like => like.userId === sessionUser?.id)

    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()
    }, [isPlaying])

    const updateLike = (e) => {
        e.preventDefault()
        if (userLike) {
            dispatch(deleteLike(userLike?.id))
        } else {
            const payload = {
                trackId: track?.id,
                userId: sessionUser?.id
            }
            dispatch(postLike(payload))
        }
        // setTimeout(() => setAnimate(false), 1000)
    }

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
                        <div className='search-like-ctn'>
                            {sessionUser ?
                            <button
                                onClick={updateLike}
                                className='search-like-button'
                            >
                                {userLike ? <i className="fa-solid fa-heart fa-large search-like"></i> : <i className="fa-regular fa-heart fa-large search-unlike"></i>
                                }
                            </button>
                            : ''
                            }
                            <span className='search-like-count search-text-color' style={{paddingLeft: sessionUser ? '10px' : '0'}}>
                                {likesArr && (likesArr.length).toLocaleString()}
                            </span>
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
