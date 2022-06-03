import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTracks } from '../../store/trackReducer';
import { useEditTrackContext } from '../../context/EditTrackContext';
import DeleteTrackModal from './DeleteTrackModal';

import './TrackIdPage.css';

const TrackIdPage = ({tracks}) => {
    const { openEdit, setOpenEdit } = useEditTrackContext();
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = tracks[+trackId];

    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [genre, setGenre] = useState('')
    // const [trackPath, setTrackPath] = useState('')
    // const [imagePath, setImagePath] = useState('')
    // const [errors, setErrors] = useState({});
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    return (
        <>
            <div className='music-player-ctn'>
                <div className='music-player-content'>
                    <div className='track-bar'>

                        {/* ------------------ IMAGEPATH ------------------ */}
                        <div className='cover-photo-ctn'>
                            <img className='cover-photo' src={track?.imagePath}></img>
                        </div>
                    </div>

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

                            {/* ------------------ BACK BUTTON ------------------ */}
                            <div className='back-ctn'>
                                <button
                                    type='button'
                                    className='back'
                                >
                                    <i className="fa-solid fa-backward-step fa-3x"></i>
                                </button>
                            </div>

                            {/* ------------------ PLAY BUTTON ------------------ */}
                            <div className='play-ctn'>
                                {/* If not playing, play button will display */}
                                {!isPlaying &&
                                (<button
                                    type='button'
                                    className='play'
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    <i className="fa-solid fa-circle-play fa-7x"></i>
                                </button>
                                )}
                                {/* If playing, pause button will display */}
                                {isPlaying &&
                                (<button
                                    type='button'
                                    className='pause'
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    <i className="fa-solid fa-circle-pause fa-7x"></i>
                                </button>
                                )}
                            </div>

                            {/* ------------------ NEXT BUTTON ------------------ */}
                            <div className='next-ctn'>
                                <button
                                    type='button'
                                    className='next'
                                >
                                    <i className="fa-solid fa-forward-step fa-3x"></i>
                                </button>
                            </div>
                        </div>

                        {/* ------------------ VOLUME ------------------ */}
                        <div className='volume-ctn'>
                            Volume line here
                        </div>
                        {/* END CENTER OF MEDIA CONTROLS */}
                    </div>
                    {/* END MEDIA CONTROLS */}

                    {  /* START EDIT/DELETE */}
                    {/* ------------------ EDIT AND DELETE BUTTONS ------------------ */}
                    <div className='edit-save-ctn'>
                        <div className='edit-ctn'>
                            <button
                                type='button'
                                className='inline-edit-Track'
                                // When Edit button is CLICKED, Editing will be allowed by rendering UpdateTrackForm component.
                                // Save Changes button WILL BE DISPLAYED.
                                onClick={() => setOpenEdit(true)}
                                >
                                Edit
                            </button>

                            {/* ------------------ DELETE ------------------ */}
                            <div className='delete-ctn'>
                                <DeleteTrackModal />
                            </div>
                        </div>
                    </div>

                    {/* ------------------ DESCRIPTION ------------------ */}
                    <div className='track-info-ctn'>
                        <div className='description'>
                            {track?.description}
                        </div>

                        {/* ------------------ GENRE ------------------ */}
                        <div className='genre-ctn'>
                            <div className='genre'>
                                <span>{track?.genre}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='comment-section-ctn'>
                    <h1>Comments down below</h1>
                </div>
            </div>
        </>
    )
}

export default TrackIdPage;
