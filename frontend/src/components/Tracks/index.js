import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getTracks } from '../../store/trackReducer';
import { useTrackContext } from '../../context/TrackContext';
import DeleteTrackModal from './DeleteTrackModal';
import Comments from '../Comments';
import DateConverter from '../DateConverter';
import './Tracks.css';
import { deleteLike, getLikes, postLike } from '../../store/likes';
import { pauseTrack, playTrack, setCurrentTrack } from '../../store/mediaControl';

const Tracks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trackId } = useParams();
    const tracks = useSelector(state => state?.track?.entries)
    const sessionUser = useSelector(state => state?.session?.user);
    const playing = useSelector(state => state?.mediaControl?.playing)
    const currentTrack = useSelector(state => state?.mediaControl?.track)
    const likes = useSelector(state => state?.like?.entries)
    const likesArr = Object.values(likes)
    const track = tracks[+trackId];

    const userLike = likesArr.find(like => like.trackId === +trackId && like.userId === sessionUser?.id)

    // States
    const { isShuffled, setIsShuffled } = useTrackContext()
    const [currentSong, setCurrentSong] = useState(track)
    const [isPlaying, setIsPlaying] = useState(!!playing)
    const [animate, setAnimate] = useState(false)
    const [duration, setDuration] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0)

    let tracksArr = Object.values(tracks);
    let shuffledArr = []

    // References
    const audioPlayer = useRef();

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    useEffect(() => {
        dispatch(getLikes(trackId))
    }, [dispatch, trackId])

    // useEffect(() => {
    //     if (audioPlayer) {
    //         audioPlayer?.current?.duration = elapsedTime
    //     }
    // }, [elapsedTime])

    useEffect(() => {
        window.scrollTo(0, 0)
        setElapsedTime(0)

        const durationInt = setInterval(() => {
            const trackDuration = audioPlayer?.current?.duration
            setDuration(trackDuration)
        }, 100)
    }, [])

    useEffect(() => {
        isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()
    }, [isPlaying, trackId])

    useEffect(() => {
        if (isPlaying === true) {
            setInterval(() => {
                setElapsedTime(audioPlayer.current?.currentTime)
            }, 100)
        }
    }, [isPlaying])

    const formatTrackTime = (time) => {
        if (time && !Number.isNaN(time)) {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }

        return '0:00'
    }

    const backBtn = () => {
        for (let i = 0; i < tracksArr.length; i++) {
            let track = tracksArr[i]
            if (+trackId === track?.id) {
                setIsPlaying(true)
                history.push(`/tracks/${tracksArr[i - 1]?.id}`)
            }
        }

        if (+trackId === tracksArr[0]?.id) {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[tracksArr.length - 1]?.id}`)
        }
    }

    const playBtn = (e) => {
        e.preventDefault()
        // dispatch(setCurrentTrack(currentTrack))

        if (playing && track?.id === currentTrack) {
            // dispatch(pauseTrack())
            setIsPlaying(false)
        } else if (!playing && track?.id === currentTrack) {
            // dispatch(playTrack())
            setIsPlaying(true)
        }
    }

    const nextBtn = () => {
        for (let i = 0; i < tracksArr.length; i++) {
            let track = tracksArr[i]
            if (+trackId === track.id) {
                setIsPlaying(true)
                history.push(`/tracks/${tracksArr[i + 1]?.id}`)
            }
        }

        // If at the end of the playlist, then restart at 1
        if (+trackId === tracksArr[tracksArr.length - 1]?.id) {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[0]?.id}`)
        }
    }

    // const autoPlay = e => {
    //     if (e.currentTarget.className === 'play') {
    //         setIsPlaying(true)
    //         return true
    //     } else if (e.currentTarget.className === 'pause') {
    //         setIsPlaying(false)
    //         return false
    //     }
    // }

    const shuffleTracks = () => {
        console.log('tracksArr BEFOREEEE', tracksArr)
        // for (let i = tracksArr.length - 1; i > 1; i--) {
        //     const randomIdx = Math.floor(Math.random() * tracksArr.length + 1)
        //     const temp = tracksArr[i]
        //     tracksArr[i] = tracksArr[randomIdx]
        //     tracksArr[randomIdx] = temp;
        // }
        // tracks = tracksArr;
        setIsShuffled(!isShuffled);
        console.log('SHUFFLED ARR AFTER', shuffledArr)
    }

    const updateLike = (e) => {
        e.preventDefault()
        if (userLike) {
            setAnimate(false)
            dispatch(deleteLike(userLike?.id))
        } else {
            setAnimate(true)
            const payload = {
                trackId,
                userId: sessionUser?.id
            }
            dispatch(postLike(payload))
        }
        // setTimeout(() => setAnimate(false), 1000)
    }

    return (
        <>
            <div className='music-player-ctn'>
                <div className='music-player-content'>
                    <div className='track-bar-content'>

                        {/* ------------------ IMAGEPATH ------------------ */}
                        <div className='cover-photo-ctn'>
                            <img className='cover-photo' src={track?.imagePath}></img>
                        </div>
                        <div className='track-bar-ctn'>
                            <audio
                                ref={audioPlayer}
                                src={track?.trackPath}
                                onEnded={nextBtn}
                                // play={isPlaying === true}
                                // pause={isPlaying === false}
                                // onChange={(e) => isPlaying ? e.current?.play() : e.current?.pause()}
                            >
                            </audio>
                        </div>
                        <input type='range' value={elapsedTime} min='0' max={duration} className='input-tracker' onChange={(e) => setElapsedTime(e.target.value)} />
                    </div>
                    <div className='duration-ctn'>
                        <div className='start-time'>{formatTrackTime(elapsedTime)}</div>
                        <div className='end-time'>{formatTrackTime(duration)}</div>
                    </div>

                    <div className='title-ctn'>
                        <div className='top-info'>
                            <div className='title-date-ctn'>
                                {/* ------------------ TITLE ------------------ */}
                                <div className='track-title'>
                                    <span>
                                        {track?.title}
                                    </span>
                                </div>
                                <div className='control-right'>
                                    {/* ------------------ DATE ------------------ */}
                                    <div className='date-ctn'>
                                        <div className='date'>
                                            <span><DateConverter date={track?.createdAt} /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='artist-genre-ctn'>
                                {/* ------------------ ARTIST ------------------ */}
                                <div className='track-artist'>
                                    <p>{track?.User?.username}</p>
                                </div>
                                {/* ------------------ GENRE ------------------ */}
                                <div className='genre-ctn'>
                                    <div className='genre'>
                                        <span>#{track?.genre}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='track-like-icon'>
                                {sessionUser ?
                                <button
                                    onClick={updateLike}
                                    className={animate ? 'like-button' : 'unlike-button'}
                                >
                                    {userLike ? <i className="fa-solid fa-heart fa-xl liked-icon"></i> : <i className="fa-regular fa-heart fa-xl unliked-icon"></i>
                                    }
                                </button>
                                : <button className='no-auth-span'><i className="fa-solid fa-heart fa-xl no-user-heart"></i></button>
                                }
                                <span className='like-count'>
                                    {likesArr && likesArr.length === 1 ? `1 like` : `${(likesArr.length).toLocaleString()} likes`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* START MEDIA CONTROLS */}
                    <div className='media-controls'>
                        {/* START CENTER OF CONTROLS */}
                        {/* ------------------ MEDIA CONTROLS ------------------ */}
                        <div className='control-center'>
                            {/* ------------------ DELETE ------------------ */}
                            {sessionUser?.id === track?.User?.id
                            ? <div className='delete-cancel-ctn'>
                                <DeleteTrackModal />
                            </div>
                            : ""}


                            {/* ------------------ SHUFFLE BUTTON ------------------ */}
                            {/* <div className='shuffle-ctn'>
                                <button
                                    type='button'
                                    className='shuffle'
                                    onClick={shuffleTracks}
                                    style={{ color: isShuffled ? 'lightgreen' : ''}}
                                >
                                    <i className="fa-solid fa-shuffle fa-xl"></i>
                                </button>
                            </div> */}

                            {/* ------------------ BACK BUTTON ------------------ */}
                            <div className='back-ctn'>
                                <button
                                    type='button'
                                    className='back'
                                    onClick={backBtn}
                                >
                                    <i className="fa-solid fa-backward-step fa-3x"></i>
                                </button>
                            </div>

                            {/* ------------------ PLAY/PAUSE BUTTON ------------------ */}
                            <div className='play-ctn'>
                                {/* If not playing, play button will display */}
                                {/* If playing, pause button will display */}
                                <button
                                    type='button'
                                    className='play-pause'
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    // onClick={playBtn}
                                >
                                    {isPlaying
                                    ? <i className="fa-solid fa-circle-pause fa-7x"></i>
                                    : <i className="fa-solid fa-circle-play fa-7x"></i>
                                    }
                                </button>
                            </div>

                            {/* ------------------ NEXT BUTTON ------------------ */}
                            <div className='next-ctn'>
                                <button
                                    type='button'
                                    className='next'
                                    onClick={nextBtn}
                                >
                                    <i className="fa-solid fa-forward-step fa-3x"></i>
                                </button>
                            </div>

                            {/* ------------------ VOLUME ------------------ */}
                            {/* <div className='volume-ctn'>
                                <button
                                    type='button'
                                    className='volume'
                                    // onClick={}
                                >
                                    <i className="fa-solid fa-volume-high fa-xl"></i>
                                </button>
                            </div> */}

                            {/* ------------------ EDIT ------------------ */}
                            {sessionUser?.id === track?.User?.id
                            ? <div className='edit-save-ctn'>
                                <Link to={`/tracks/${track?.id}/edit`}>
                                    <i className="fa-solid fa-pen fa-xl comment"></i>
                                </Link>
                            </div>
                            : ""}
                        </div>
                        {/* END CENTER OF MEDIA CONTROLS */}
                    </div>
                    {/* END MEDIA CONTROLS */}

                    {/* ------------------ DESCRIPTION ------------------ */}
                    <div className='track-info-ctn'>
                        <div className='description'>
                            {track?.description}
                        </div>
                    </div>
                </div>
                <Comments tracks={tracks}/>
            </div>
        </>
    )
}

export default Tracks;
