import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getTracks } from '../../store/trackReducer';
import DeleteTrackModal from './DeleteTrackModal';
import Comments from '../Comments';
import DateConverter from '../DateConverter';
import './Tracks.css';
import { deleteLike, getLikes, postLike } from '../../store/likes';
import { getStateVolume, updateStateVolume } from '../../store/mediaControl';

const Tracks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trackId } = useParams();
    const tracks = useSelector(state => state?.track?.entries)
    const sessionUser = useSelector(state => state?.session?.user);
    const playing = useSelector(state => state?.mediaControl?.playing)
    const volumeLevel = useSelector(state => state?.mediaControl?.volume)
    const likes = useSelector(state => state?.like?.entries)
    const likesArr = Object.values(likes)
    const currentTrack = tracks[+trackId];

    const userLike = likesArr.find(like => like.trackId === +trackId && like.userId === sessionUser?.id)

    // States
    const [isShuffled, setIsShuffled] = useState(false)
    const [isPlaying, setIsPlaying] = useState(!!playing)
    const [animate, setAnimate] = useState(false)
    const [duration, setDuration] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [volumeBar, setVolumeBar] = useState('')
    const [mute, setMute] = useState(false)
    const [specialCaseVolume, setSpecialCaseVolume] = useState('')
    const [loopIdx, setLoopIdx] = useState(0)
    const [tracksArr, setTracksArr] = useState([])

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

    useEffect(() => {
        window.scrollTo(0, 0)
        setElapsedTime(0)
        setVolumeBar(1)
        setTracksArr(Object.values(tracks))

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
    }, [isPlaying, trackId])

    useEffect(() => {
        if (isPlaying === true) {
            const durationInterval = setInterval(() => {
                setElapsedTime(audioPlayer.current?.currentTime)
            }, 1000)

            clearInterval(durationInterval)
        }
    }, [isPlaying])

    useEffect(() => {
        volumeBarRef.current.value = audioPlayer.current.volume
    }, [volumeBar])

    useEffect(() => {
        if (isShuffled) {
            // When shuffled, put the current track at the very front of the playlist
            let shuffledPlaylist = shuffleTracks(tracksArr)
            let current = shuffledPlaylist.splice(shuffledPlaylist.map(obj => obj.id).indexOf(+trackId), 1)[0]
            shuffledPlaylist.unshift(current)
            setTracksArr(shuffledPlaylist)
        }
        else {
            let tracksArrCopy = Object.values(tracks)
            let sortedArr = []
            let start = 0
            let end = tracksArrCopy.length - 1

            // Using two pointers to sort tracks in id numerical order
            for (let i = tracksArrCopy.length - 1; i >= 0; i--) {

                // If starting id is bigger than ending id, then place bigger id in right most spot.
                if (tracksArrCopy[start]?.id > tracksArrCopy[end]?.id) {
                    sortedArr[i] = tracksArrCopy[start]
                    // Then increase starting index.
                    start++
                } else {
                    // Otherwise, put ending id to right most index.
                    sortedArr[i] = tracksArrCopy[end]
                    end--
                }
            }
            setTracksArr(sortedArr)
        }

    }, [isShuffled])

    const formatTrackTime = (time) => {
        if (time && !Number.isNaN(time)) {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }

        return '0:00'
    }

    const backBtn = () => {
        // Find the index of the current track we're on in the playlist array
        const currTrackIdx = tracksArr.map(obj => obj.id).indexOf(+trackId)

        // If at the beginning of the playlist and on continuous loop/repeat, then backtrack to last track of playlist
        if (currTrackIdx === 0 && loopIdx !== 0) {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[tracksArr.length - 1]?.id}`)

        // If at the beginning of the playlist and no loop is on, then stay on track and just reset progress bar.
        } else if (currTrackIdx === 0 && loopIdx === 0) {
            setIsPlaying(false)
            audioPlayer.current.currentTime = 0
            progressBar.current.value = audioPlayer.current.currentTime
            dragDuration()

        // Otherwise, go back one track
        } else {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[currTrackIdx - 1]?.id}`)
        }

        // Opted for Spotify's functionality: If on repeat setting but click back, revert to continuous loop
        if (loopIdx === 2) setLoopIdx(1)
    }

    const nextBtn = () => {
        // Find the index of the current track we're on in the playlist array
        const currTrackIdx = tracksArr.map(obj => obj.id).indexOf(+trackId)

        // If at the end of the playlist and on continuous loop/repeat, then restart at beginning of playlist
        if (currTrackIdx === tracksArr.length - 1 && loopIdx !== 0) {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[0]?.id}`)

        // If at the end of the playlist and no loop is on, then stay on track and just reset progress bar.
        } else if (currTrackIdx === tracksArr.length - 1 && loopIdx === 0) {
            setIsPlaying(false)
            audioPlayer.current.currentTime = 0
            progressBar.current.value = audioPlayer.current.currentTime
            dragDuration()

        // Otherwise, move on to next track.
        } else {
            setIsPlaying(true)
            history.push(`/tracks/${tracksArr[currTrackIdx + 1]?.id}`)
        }

        // Opted for Spotify's functionality: If on repeat setting but click next, revert to continuous loop
        if (loopIdx === 2) setLoopIdx(1)
    }

    // Used recursion to shuffle playlist around
    const shuffleTracks = (playlist) => {
        // Base case
        if (playlist.length === 1) return playlist

        // Generate a random number with respect to the playlist size
        const randomIdx = Math.floor(Math.random() * playlist.length)

        return [playlist[randomIdx], ...shuffleTracks(playlist.filter((_, i) => i !== randomIdx))]
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
    }

    // If I drag the volume bar around, the volume level should change accordingly
    // If I drag the volume bar down to 0, it should record the previous volume
    // and volume value bar so that, when I click on the mute button twice, the
    // volume bar should return back to the saved volume value.
    // Volume progress bar control
    const updateVolume = () => {
        // When the volume bar is dragged, the volume updates.
        audioPlayer.current.volume = volumeBarRef.current.value

        volumeBarRef.current.style.setProperty('--before-volume-thumb', `${audioPlayer?.current?.volume * 100}px`)

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
        dragVolume()
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

    // Sets background color before volume thumb
    const dragVolume = () => {
        volumeBarRef.current.style.setProperty('--before-volume-thumb', `${audioPlayer?.current?.volume * 100}px`)
        setVolumeBar(volumeBarRef.current.value)
    }

    const continuousLoop = () => {
        setIsPlaying(true)
        audioPlayer.current.currentTime = 0
        progressBar.current.value = audioPlayer.current.currentTime
        audioPlayer.current.play()
        dragDuration()
    }

    return (
        <>
            <div className='music-player-ctn'>
                <div className='music-player-content'>
                    <div className='track-bar-content'>

                        {/* ------------------ IMAGEPATH ------------------ */}
                        <div className='cover-photo-ctn'>
                            <img className='cover-photo' src={currentTrack?.imagePath}></img>
                        </div>
                        <div className='track-bar-ctn'>
                            <audio
                                ref={audioPlayer}
                                src={currentTrack?.trackPath}
                                onEnded={loopIdx === 2 ? continuousLoop : nextBtn}
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
                                        {currentTrack?.title}
                                    </span>
                                </div>
                                <div className='control-right'>
                                    {/* ------------------ DATE ------------------ */}
                                    <div className='date-ctn'>
                                        <div className='date'>
                                            <span><DateConverter date={currentTrack?.createdAt} /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='artist-genre-ctn'>
                                {/* ------------------ ARTIST ------------------ */}
                                <div className='track-artist'>
                                    <p>{currentTrack?.User?.username}</p>
                                </div>
                                {/* ------------------ GENRE ------------------ */}
                                <div className='genre-ctn'>
                                    <div className='genre'>
                                        <span>#{currentTrack?.genre}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='track-like-icon'>
                                <div className='likes-section'>
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
                            </div>
                        </div>
                    </div>

                    {/* START MEDIA CONTROLS */}
                    <div className='media-controls'>
                        {/* START CENTER OF CONTROLS */}
                        {/* ------------------ MEDIA CONTROLS ------------------ */}
                        <div className='control-center'>
                            {/* ------------------ DELETE ------------------ */}
                            {sessionUser?.id === currentTrack?.User?.id
                            ? <div className='delete-cancel-ctn'>
                                <DeleteTrackModal />
                            </div>
                            : ""}


                            {/* ------------------ SHUFFLE BUTTON ------------------ */}
                            <div className='shuffle-ctn'>
                                <button
                                    type='button'
                                    className='shuffle'
                                    onClick={() => setIsShuffled(!isShuffled)}
                                    style={{ color: isShuffled ? '#F050ED' : ''}}
                                >
                                    <i className="fa-solid fa-shuffle fa-2xl"></i>
                                </button>
                            </div>

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
                                >
                                    {isPlaying
                                    ? <i className="fa-solid fa-circle-pause fa-7x trackPage-pause"></i>
                                    : <i className="fa-solid fa-circle-play fa-7x trackPage-play"></i>
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

                            {/* ------------------ LOOP BUTTON ------------------ */}
                            <div className='loop-ctn'>
                                <button
                                    type='button'
                                    className='loop'
                                    onClick={() => setLoopIdx(prev => prev === 2 ? 0 : prev + 1)}
                                >
                                    {loopIdx === 0 && <img className='no-loop-icon' src={process.env.PUBLIC_URL + '/images/no-loop.png'}></img>}
                                    {loopIdx === 1 && <img className='loop-icon' src={process.env.PUBLIC_URL + '/images/loop.png'}></img>}
                                    {loopIdx === 2 && <img className='repeat-one-icon' src={process.env.PUBLIC_URL + '/images/repeat-one.png'}></img>}
                                </button>
                            </div>

                            {/* ------------------ EDIT ------------------ */}
                            {sessionUser?.id === currentTrack?.User?.id
                            ? <div className='edit-save-ctn'>
                                <Link to={`/tracks/${currentTrack?.id}/edit`}>
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
                            {currentTrack?.description}
                        </div>
                    </div>
                </div>
                <Comments tracks={tracks}/>
            </div>
        </>
    )
}

export default Tracks;
