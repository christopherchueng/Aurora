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

const Tracks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trackId } = useParams();
    const tracks = useSelector(state => state?.track?.entries)
    const sessionUser = useSelector(state => state?.session?.user);
    const likes = useSelector(state => state?.like?.entries)
    const likesArr = Object.values(likes)
    const track = tracks[+trackId];

    const userLike = likesArr.find(like => like.trackId === +trackId && like.userId === sessionUser?.id)

    // States
    const { isShuffled, setIsShuffled, duration, setDuration, currentTime, setCurrentTime } = useTrackContext()
    const [currentSong, setCurrentSong] = useState(track)
    const [isPlaying, setIsPlaying] = useState(false)
    const [animate, setAnimate] = useState(false)

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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // useEffect(() => {
    //     const seconds = Math.floor(audioPlayer.current.duration)
    //     setDuration(seconds)
    // }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    useEffect(() => {
        isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()
    }, [isPlaying, trackId])


    const durationFormula = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const trackMin = minutes < 10 ? `0${minutes}` : `${minutes}`
        const sec = Math.floor(seconds % 60)
        const trackSec = seconds < 10 ? `0${sec}` : `${sec}`
        return `${trackMin}:${trackSec}`
    }

    const backBtn = () => {
        for (let i = 0; i < tracksArr.length; i++) {
            let track = tracksArr[i]
            if (+trackId === track?.id) {
                setIsPlaying(true)
                // audioPlayer.current.play();
                // setCurrentSong(tracks[+trackId])
                history.push(`/tracks/${tracksArr[i - 1]?.id}`)
            }
        }

        if (+trackId === tracksArr[0]?.id) {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[tracksArr.length - 1]?.id}`)
        }
    }

    const nextBtn = () => {
        for (let i = 0; i < tracksArr.length; i++) {
            let track = tracksArr[i]
            if (+trackId === track.id) {
                // setCurrentSong(tracks[+trackId])
                setIsPlaying(true)
                // audioPlayer.current.play();
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
                                onChange={(e) => isPlaying ? e.current?.play() : e.current?.pause()}
                            >
                            </audio>
                            {/* <input type='range' defaultValue='0'  className='input-tracker'></input> */}
                        </div>
                    </div>
                    {/* <div className='duration-ctn'>
                        <div className='start-time'>{durationFormula(currentTime)}</div>
                        <div className='end-time'>{(duration && !isNaN(duration)) && durationFormula(duration)}</div>
                    </div> */}

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
                                : ''
                                }
                                <span className='like-count' style={{paddingLeft: sessionUser ? '10px' : '0'}}>
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
                                    // onChange={isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()}
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
