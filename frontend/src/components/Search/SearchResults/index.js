import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postLike, deleteLike } from '../../../store/likes'
import DateConverter from '../../DateConverter'
import '../Search.css'

const SearchResults = ({track}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const likes = useSelector(state => state?.like?.entries)
    const likesArr = Object.values(likes).filter(like => like.trackId === track?.id)
    const userLike = likesArr.find(like => like.userId === sessionUser?.id)
    const playing = useSelector(state => state?.mediaControl?.playing)

    // States
    const [elapsedTime, setElapsedTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTrack] = useState(track)
    const [isPlaying, setIsPlaying] = useState(!!playing)

    // References
    const audioPlayer = useRef()
    const progressBar = useRef()
    const progressAnimation = useRef()

    useEffect(() => {
        setElapsedTime(0)

        setInterval(() => {
            const trackDuration = audioPlayer?.current?.duration
            setDuration(trackDuration)
        }, 100)
    }, [])

    useEffect(() => {
        if (isPlaying) {
            audioPlayer?.current?.play()
            progressAnimation.current = requestAnimationFrame(currentlyPlaying)
        } else {
            audioPlayer?.current?.pause()
            cancelAnimationFrame(progressAnimation.current)
        }
    }, [isPlaying])

    // When track ends, reset progress bar and audio.
    const trackEnded = () => {
        setIsPlaying(false)
        audioPlayer.current.currentTime = 0
        progressBar.current.value = audioPlayer.current.currentTime
        dragDuration()
    }

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

    // While track is playing, sync progress bar with the current value of the audio player time
    // Background should also update while track is playing
    const currentlyPlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        dragDuration()
        progressAnimation.current = requestAnimationFrame(currentlyPlaying) // Allows for bg color before thumb to move WHILE track is playing
    }

    // Skip by dragging thumb around progress bar
    const setProgress = () => {
        audioPlayer.current.currentTime = progressBar.current.value
        dragDuration()
    }

    // Sets background color before progress thumb
    const dragDuration = () => {
        progressBar.current.style.setProperty('--before-thumb', `${progressBar.current.value / audioPlayer?.current?.duration * 100}%`)
        setElapsedTime(progressBar.current.value)
    }

    return (
        <>
            <div className='search-content'>
                <div className="left-search">
                    <div className="search-imagePath">
                        <Link to={`/tracks/${track?.id}`}><img src={track.imagePath} className='search-result-img'></img></Link>
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
                                    <span className='genre-tag'>#{track.genre}</span>
                                    <div className='search-like-ctn'>
                                        {sessionUser ?
                                        <button
                                            onClick={updateLike}
                                            className='search-like-button'
                                        >
                                            {userLike ? <i className="fa-solid fa-heart fa-large search-like"></i> : <i className="fa-regular fa-heart fa-large search-unlike"></i>
                                            }
                                        </button>
                                        : <button className='no-auth-span'><i className="fa-solid fa-heart fa-large no-user-heart"></i></button>
                                        }
                                        <span className='search-like-count search-text-color search-padding'>
                                            {likesArr && (likesArr.length).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search-trackPath">
                        <audio
                            ref={audioPlayer}
                            src={currentTrack?.trackPath}
                            onEnded={trackEnded}
                        >
                        </audio>
                    </div>
                    <div className='search-tracker-ctn'>
                        <input
                            type='range'
                            value={elapsedTime}
                            min='0'
                            max={duration}
                            step='any'
                            className='search-tracker'
                            ref={progressBar}
                            onChange={setProgress}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default SearchResults
