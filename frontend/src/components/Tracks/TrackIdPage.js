import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTracks, updateTrack } from '../../store/trackReducer';
import { genres } from "../../utils/genreData";
import DeleteTrackComponent from './DeleteTrackComponent';
import UpdateTrackForm from './UpdateTrackForm';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../FormTemplate/ErrorMessage'
// import './TrackIdPage.css';

const TrackIdPage = ({tracks}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { trackId } = useParams();
    const track = tracks[+trackId];
    console.log('heres the track again', track?.User?.id)

    const [title, setTitle] = useState(track?.title)
    const [description, setDescription] = useState(track?.description)
    const [genre, setGenre] = useState(track?.genre)
    const [trackPath, setTrackPath] = useState(track?.trackPath)
    const [imagePath, setImagePath] = useState(track?.imagePath)
    const [errors, setErrors] = useState({});
    // const [value, setValue] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [saveChanges, setSaveChanges] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    // Validator errors
    useEffect(() => {
        const validationErrors = {};
        if (!title) {
            validationErrors.title = 'Please provide a title.'
        }
        if (!genre) {
            validationErrors.genre = 'Please select a genre.'
        }

        setErrors(validationErrors);

    }, [title, genre])

    // onSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        setOpenEdit(true)
        setSaveChanges(false)

        // Payload to be delivered to thunk
        const payload = {
            title,
            description,
            genre,
            trackPath,
            imagePath,
            // userId: track[User].id
        }
        console.log('this is what were sending to thunk', payload.id)

        // When form is submitted, track will be updated through payload
        const updatedTrack = await dispatch(updateTrack(payload, trackId))
        if (updatedTrack) {
            setOpenEdit(false);
            setSaveChanges(true);
            history.push(`/tracks/${updatedTrack.id}`)
        }

        // setTitle(track?.title);
        // setDescription(track?.description);
        // setGenre(track?.genre);
        // setTrackPath(track?.trackPath)
        // setImagePath(track?.imagePath);
        // setErrors({});
    }

    return (
        <>
            <div className='music-player-ctn'>
                {/* IF THE EDIT BUTTON IS PRESSED, BRING UP FORM */}
                <div className='music-player-content'>
                    <div className='track-bar'>
                        {/* ------------------ IMAGEPATH ------------------ */}
                        <div className='cover-photo-ctn'>
                            {/* If edit button is clicked, form will appear.
                            Otherwise, display cover photo */}
                            {saveChanges && <img className='cover-photo' src={track?.imagePath}></img>}
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

                            {/* ------------------ VOLUME ------------------ */}
                            <div className='volume-ctn'>
                                Volume line here
                            </div>
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
                            (<button
                                type='submit'
                                className='inline-edit-Track'
                                // When Edit button is CLICKED, Editing will be allowed and Save Changes
                                // button WILL BE DISPLAYED.
                                onClick={() => setOpenEdit(true) &&
                                setSaveChanges(true)}>
                                    Edit
                            </button>)

                            {/* ------------------ DELETE ------------------ */}
                            <div className='delete-ctn'>
                                    <DeleteTrackComponent trackId={trackId} />
                            </div>
                        </div>
                    </div>

                    <div className='track-info-ctn'>
                        {/* ------------------ DESCRIPTION ------------------ */}
                        <div className='description'>
                            {/* If edit button is clicked, form will appear.
                            Otherwise, display description */}
                            {saveChanges && track?.description}
                        </div>
                        {/* ------------------ GENRE ------------------ */}
                        <div className='genre-ctn'>
                            <div className='genre'>
                                <span>{saveChanges && track?.genre}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/* // <div className='comment-section-ctn'>
                //     <h1>Comments down below</h1>
                // </div> */}
        </>
    )
}

export default TrackIdPage;
