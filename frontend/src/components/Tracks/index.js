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
import { getStateVolume, pauseTrack, playTrack, setCurrentTrack, updateStateVolume, getMute } from '../../store/mediaControl';

const Tracks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trackId } = useParams();
    const tracks = useSelector(state => state?.track?.entries)
    const sessionUser = useSelector(state => state?.session?.user);
    const playing = useSelector(state => state?.mediaControl?.playing)
    const currentTrack = useSelector(state => state?.mediaControl?.track)
    const volumeLevel = useSelector(state => state?.mediaControl?.volume)
    // const muteTrack = useSelector(state => state?.mediaControl?.mute)
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
    const [volumeBar, setVolumeBar] = useState('')
    const [mute, setMute] = useState(false)
    const [specialCaseVolume, setSpecialCaseVolume] = useState('')

    let tracksArr = Object.values(tracks);
    let shuffledArr = []

    // References
    const audioPlayer = useRef()
    const volumeBarRef = useRef()
    const progressBar = useRef()
    const progressAnimation = useRef() // Have progress background update as progressBar moves

    useEffect(() => {
        dispatch(getTracks())
        dispatch(getStateVolume(0))
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
        setVolumeBar(1)
        // dispatch(getStateVolume(volumeLevel))

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
        // isPlaying ? audioPlayer?.current?.play() : audioPlayer?.current?.pause()
    }, [isPlaying, trackId])

    useEffect(() => {
        if (isPlaying === true) {
            setInterval(() => {
                setElapsedTime(audioPlayer.current?.currentTime)
            }, 100)
        }
    }, [isPlaying])

    useEffect(() => {
        volumeBarRef.current.value = audioPlayer.current.volume
    }, [volumeBar])

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
            progressAnimation.current = requestAnimationFrame(currentlyPlaying)
        } else if (!playing && track?.id === currentTrack) {
            // dispatch(playTrack())
            setIsPlaying(true)
            cancelAnimationFrame(progressAnimation.current)
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

    // If I drag the volume bar around, the volume level should change accordingly
    // If I drag the volume bar down to 0, it should record the previous volume
    // and volume value bar so that, when I click on the mute button twice, the
    // volume bar should return back to the saved volume value.
    // Volume progress bar control
    const updateVolume = () => {
        // When the volume bar is dragged, the volume updates.
        audioPlayer.current.volume = volumeBarRef.current.value

        // This allows the volume bar to visually move on the client side while the volume is updating
        setVolumeBar(audioPlayer.current.volume)

        // return volumeBarRef.current.value
    }

    // If I push mute button to mute song,
    // volume level should drop to 0 and volume bar should be at 0.
    // If I push mute button to UNMUTE,
    // volume level AND volume bar should return to previous volume level prior to muting
    const pushMuteButton = (e) => {
        e.preventDefault()

        setMute(!mute)
        dispatch(getStateVolume(+volumeBarRef.current.value))
        setSpecialCaseVolume(volumeLevel)
        dispatch(updateStateVolume(+volumeBarRef.current.value))

        // If NOT mute and volume bar is NOT 0, then volume level and volume bar should be at 0
        if (mute === false && +volumeBarRef.current.value) {
            audioPlayer.current.volume = 0

        // If muted and volume bar is AT 0, then bring volume button back to the previous level prior to muting
        } else if (mute === true && +volumeBarRef.current.value === 0) {
            audioPlayer.current.volume = volumeLevel

        // If dragged volume bar down to 0 and then press the mute button again, volume bar
        // should go back to previous volume level prior to muting
        // Special case involves clicking volume bar straight to 0 and then pressing
        // mute button to unmute.
        } else if (mute === false && +volumeBarRef.current.value === 0) {
            setMute(false)
            audioPlayer.current.volume = specialCaseVolume ? specialCaseVolume : (volumeLevel ? volumeLevel : 1)

        } else {
            audioPlayer.current.volume = 0.01
        }

        volumeBarRef.current.value = audioPlayer.current.volume
        setVolumeBar(volumeBarRef.current.value)
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

    // Sets background color before thumb
    const dragDuration = () => {
        progressBar.current.style.setProperty('--before-thumb', `${progressBar.current.value / audioPlayer?.current?.duration * 100}%`)
        setElapsedTime(progressBar.current.value)
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
                        <input
                            type='range'
                            value={elapsedTime}
                            min='0'
                            max={duration}
                            step='any'
                            className='input-tracker'
                            ref={progressBar}
                            onChange={setProgress}
                        />
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
                            <div className='volume-ctn'>
                                <button className='volume' onClick={pushMuteButton}>
                                    {audioPlayer?.current?.volume >= 0.5 && <i className="fa-solid fa-volume-high fa-xl"></i>}
                                    {(audioPlayer?.current?.volume > 0 && audioPlayer?.current?.volume < 0.5) && <i className="fa-solid fa-volume-low fa-xl"></i>}
                                    {audioPlayer?.current?.volume === 0 && <i className="fa-solid fa-volume-xmark fa-xl"></i>}
                                </button>
                                <input
                                    type='range'
                                    value={volumeBar}
                                    min='0'
                                    max='1'
                                    step='any'
                                    className='volume-bar'
                                    ref={volumeBarRef}
                                    onChange={updateVolume}
                                    onMouseDown={() => dispatch(updateStateVolume(+volumeBarRef?.current?.value))}
                                />
                            </div>

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
