import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getTracks, removeTrack } from '../../store/trackReducer';
import DeleteTrackComponent from './DeleteTrackComponent';
import './TrackIdPage.css';

const TrackIdPage = () => {
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const tracks = useSelector(state => state.track.entries)
    const [isPlaying, setIsPlaying] = useState(true)
    const singleTrack = Object.values(tracks).find(track => track.id === +trackId)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    return (
        <div className='music-player-ctn'>
            <div className='music-player-content'>
                <div className='track-bar'>
                    <div className='cover-photo-ctn'>
                        <img className='cover-photo' src={singleTrack?.imagePath}></img>
                    </div>
                </div>
                {/* <div className='track-info-ctn'>
                    <div className='track-title'>
                        <h1>{singleTrack?.title}</h1>
                    </div>
                    <div className='track-artist'>
                        <p>{singleTrack?.User.username}</p>
                    </div>
                </div> */}
                <div className='media-controls'>
                    <div className='control-left'>
                        <div className='track-title'>
                            <h1>{singleTrack?.title}</h1>
                        </div>
                        <div className='track-artist'>
                            <p>{singleTrack?.User?.username}</p>
                        </div>
                    </div>
                    <div className='control-center'>
                        <div className='back-ctn'>
                            <button className='back'><i className="fa-solid fa-backward-step fa-3x"></i></button>
                        </div>
                        <div className='play-ctn'>
                            {/* If not playing, play button will display */}
                            {!isPlaying && (<button className='play' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-play fa-7x"></i></button>)}
                            {/* If playing, pause button will display */}
                            {isPlaying && (<button className='pause' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-pause fa-7x"></i></button>)}
                        </div>
                        <div className='next-ctn'>
                            <button className='next'><i className="fa-solid fa-forward-step fa-3x"></i></button>
                        </div>

                    </div>
                    <div className='volume-ctn'>
                        Volume line here
                    </div>
                </div>
            </div>
        <div className='adjustment-ctn'>
            <div className='edit-ctn'>
                <button>Edit</button>
            </div>
            <div className='delete-ctn'>
                <DeleteTrackComponent />
            </div>
        </div>
        <div className='comment-section-ctn'>
            <h1>Comments down below</h1>
        </div>

        </div>
    )
}

export default TrackIdPage;
