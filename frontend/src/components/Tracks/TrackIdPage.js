import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTracks, updateTrack } from '../../store/trackReducer';
import { genres } from "../../utils/genreData";
import DeleteTrackComponent from './DeleteTrackComponent';
import UpdateTrackForm from './UpdateTrackForm';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../FormTemplate/ErrorMessage'
import { useEditTrackContext } from '../../context/EditTrackContext';
import DeleteTrackModal from './DeleteTrackModal';

import './TrackIdPage.css';

const TrackIdPage = ({tracks}) => {
    const { openEdit, setOpenEdit, saveChanges, setSaveChanges } = useEditTrackContext();
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = tracks[+trackId];

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState({});
    // const [value, setValue] = useState();
    // const [openEdit, setOpenEdit] = useState(false)
    // const [saveChanges, setSaveChanges] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    // useEffect(() => {

    //     setOpenEdit(false);
    // }, [])

    // ON MOUNT RENDER, EDIT IS OFF AND NO CHANGES MADE.
    // useEffect(() => {
    //     setOpenEdit(false);
    //     setSaveChanges(true);
    // }, [])

    // EVERY TIME WHEN EDIT BUTTON IS CLICKED, saveChanges IS FALSE
    // useEffect(() => {
    //     setSaveChanges(!saveChanges);
    // }, [openEdit])

    // const editOnClick =() => {
    //     setOpenEdit(true);
    //     setSaveChanges(false);
    // }

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

                        {/* ------------------ MEDIA CONTROLS ------------------ */}
                        {/* START CENTER OF CONTROLS */}
                        <div className='control-center'>
                            <div className='back-ctn'>
                                <button
                                    type='button'
                                    className='back'
                                >
                                    <i className="fa-solid fa-backward-step fa-3x"></i>
                                </button>
                            </div>
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
                    <div className='edit-save-ctn'>
                        {/* ------------------ EDIT AND DELETE BUTTONS ------------------ */}
                        <div className='edit-ctn'>
                            {/* If edit button is clicked, openEdit will be set to true and
                            will display save changes button. This will allow form to appear.
                            Conversely, if edit button is not clicked, the edit button will be displayed.
                            Edit button has a 'submit' type because when openEdit is false, that means we are NOT
                            making any changes. Thus, the edits are made and locked in.*/}
                            <button
                                type='button'
                                className='inline-edit-Track'
                                // When Edit button is CLICKED, Editing will be allowed and Save Changes
                                // button WILL BE DISPLAYED.
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

                    <div className='track-info-ctn'>
                        {/* ------------------ DESCRIPTION ------------------ */}
                        <div className='description'>
                            {/* If edit button is clicked, form will appear.
                            Otherwise, display description */}
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
