import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getTracks } from '../../store/trackReducer';
import { getComments } from '../../store/commentReducer';
import { useUpdateContext } from '../../context/UpdateContext';
import DeleteTrackModal from './DeleteTrackModal';
import Comments from '../Comments';

import './TrackIdPage.css';

const TrackIdPage = ({tracks}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trackId } = useParams();
    const track = tracks[+trackId];
    const comments = useSelector(state => state.comment.entries)
    const commentsArr = Object.values(comments);


    // States
    const { openEditTrack, setOpenEditTrack, setIsNewComment, boxClicked } = useUpdateContext();
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [currentSong, setCurrentSong] = useState(track)

    // References
    const audioPlayer = useRef();

    useEffect(() => {
        dispatch(getComments(+trackId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    useEffect(() => {
        setIsPlaying(true)
    }, [])

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])


    const durationFormula = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const trackMin = minutes < 10 ? `0${minutes}` : `${minutes}`
        const sec = Math.floor(seconds % 60)
        const trackSec = seconds < 10 ? `0${sec}` : `${sec}`
        return `${trackMin}:${trackSec}`
    }

    const playPauseTrack = () => {
        // Work around for useState asynchronous behavior.
        const prevState = isPlaying; // Grab the previous value (false on mount)
        setIsPlaying(!prevState) // Negating the value runs and executes that function
        // If isPlaying is false, pause the track. Otherwise, play.
        if (prevState) {
            audioPlayer.current.pause();
        } else {
            audioPlayer.current.play();
        }
    }

    const backBtn = () => {
        // if (isShuffled) return shuffleTracks;
        for (let trackId in tracks) {
            if (tracks[trackId] === track && (trackId > 1)) {
                --trackId
                setIsPlaying(true)
                // setCurrentSong(tracks[+trackId])
                history.push(`/tracks/${trackId}`)
            }
        }
    }

    const nextBtn = () => {
        // if (isShuffled) return shuffleTracks;
        for (let trackId in tracks) {
            if (tracks[trackId] === track && trackId < (Object.values(tracks).length)) {
                ++trackId
                // setCurrentSong(tracks[+trackId])
                setIsPlaying(true)
                history.push(`/tracks/${trackId}`)
            }
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

    // const shuffleTracks = () => {
    //     const tracksArr = Object.values(tracks);
    //     for (let i = tracksArr.length - 1; i > 1; i--) {
    //         const randomIdx = Math.floor(Math.random() * tracksArr.length + 1)
    //         const temp = tracksArr[i]
    //         tracksArr[i] = tracksArr[randomIdx]
    //         tracksArr[randomIdx] = temp;
    //     }
    //     tracks = tracksArr;
    //     setIsShuffled(true);
    //     return tracks;
    // }

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
                            <audio ref={audioPlayer} src={track?.trackPath} autoPlay></audio>
                            {/* <input type='range' defaultValue='0'  className='input-tracker'></input> */}
                        </div>
                    </div>
                    {/* <div className='duration-ctn'>
                        <div className='start-time'>{durationFormula(currentTime)}</div>
                        <div className='end-time'>{(duration && !isNaN(duration)) && durationFormula(duration)}</div>
                    </div> */}

                    {/* START MEDIA CONTROLS */}
                    <div className='media-controls'>
                        <div className='control-left'>

                            {/* ------------------ TITLE ------------------ */}
                            <div className='track-title'>
                                <h1>
                                    {track?.title}
                                </h1>
                            </div>

                            {/* ------------------ ARTIST ------------------ */}
                            <div className='track-artist'>
                                <p>{track?.User?.username}</p>
                            </div>
                        </div>

                        {/* START CENTER OF CONTROLS */}
                        {/* ------------------ MEDIA CONTROLS ------------------ */}
                        <div className='control-center'>

                            {/* ------------------ EDIT ------------------ */}
                            <div className='edit-ctn'>
                                <button
                                    type='button'
                                    className='inline-edit-Track'
                                    // When Edit button is CLICKED, Editing will be allowed by rendering UpdateTrackForm component.
                                    // Save Changes button WILL BE DISPLAYED.
                                    onClick={() => setOpenEditTrack(true)}
                                    >
                                    <i className="fa-solid fa-pen fa-2x comment"></i>
                                </button>
                            </div>

                            {/* ------------------ SHUFFLE BUTTON ------------------ */}
                            {/* <div className='shuffle-ctn'>
                                <button
                                    type='button'
                                    className='shuffle'
                                    onClick={shuffleTracks}
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

                            {/* ------------------ PLAY BUTTON ------------------ */}
                            <div className='play-ctn'>
                                {/* If not playing, play button will display */}
                                {/* If playing, pause button will display */}
                                <button
                                    type='button'
                                    className='play-pause'
                                    onClick={playPauseTrack}
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

                            {/* ------------------ DELETE ------------------ */}
                            <div className='delete-ctn'>
                                <DeleteTrackModal />
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
                        </div>
                        {/* END CENTER OF MEDIA CONTROLS */}
                        <div className='control-right'>
                        {/* ------------------ GENRE ------------------ */}
                        <div className='genre-ctn'>
                            <div className='genre'>
                                <span>#{track?.genre}</span>
                            </div>
                        </div>
                        </div>
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

export default TrackIdPage;
