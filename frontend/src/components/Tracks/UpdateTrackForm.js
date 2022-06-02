import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getTracks, updateTrack } from '../../store/trackReducer';
import { genres } from "../../utils/genreData";
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../FormTemplate/ErrorMessage'
import { useEditTrackContext } from '../../context/EditTrackContext';
import './UpdateTrackForm.css';

const UpdateTrackForm = ({tracks}) => {
    const { openEdit, setOpenEdit, saveChanges, setSaveChanges } = useEditTrackContext();
    const dispatch = useDispatch();
    const history = useHistory()
    const { trackId } = useParams();
    const track = tracks[+trackId];

    const [title, setTitle] = useState(track.title)
    const [description, setDescription] = useState(track.description)
    const [genre, setGenre] = useState(track.genre)
    const [trackPath, setTrackPath] = useState(track.trackPath)
    const [imagePath, setImagePath] = useState(track.imagePath)
    const [errors, setErrors] = useState([]);
    const [cancelled, setCancelled] = useState(false);
    // const [value, setValue] = useState();
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    // useEffect(() => {
    //     if (saveChanges) {
    //         setCancelled(false)
    //     };
    // }, [])

    // useEffect(() => {
    //     if (sa) {

    //     }
    // }, [])

    // useEffect(() => {
    //     setSaveChanges(false);
    // }, [saveChanges])

    // Validator errors
    useEffect(() => {
        const validationErrors = [];
        if (!title) {
            validationErrors.push('Please provide a title.')
        }
        if (!genre) {
            validationErrors.push('Please select a genre.')
        }

        setErrors(validationErrors);

    }, [title, genre])

    // const cancelOnClick = () => {
    //     setCancelled(true)
    //     setSaveChanges(false)
    //     setOpenEdit(false);
    // }

    // onSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            // setSaveChanges(true);
            // history.push(`/tracks/${updatedTrack.id}`)
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
            {/* IF THE EDIT BUTTON IS PRESSED, BRING UP FORM */}
            {/* {openEdit ?  */}
            <div className='music-player-ctn'>
                <div className='music-player-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='track-bar'>
                            {/* ------------------ IMAGEPATH ------------------ */}
                            <div className='cover-photo-ctn'>
                                {/* If edit button is clicked, form will appear.
                                Otherwise, display cover photo */}
                                <input
                                    name='imagePath'
                                    type='text'
                                    alt='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
                                    value={imagePath}
                                    placeholder='Insert an image link'
                                    onChange={e => setImagePath(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='media-controls'>
                            <div className='control-left'>

                                {/* ------------------ TITLE ------------------ */}
                                <div className='track-title'>
                                    <h1>
                                        {/* If edit button is clicked, form will appear.
                                        Otherwise, display title */}
                                        <input
                                            type='text'
                                            aria-label='Title'
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </h1>
                                </div>
                                <div>
                                    {openEdit && <ErrorMessage error={errors.title} />}
                                </div>

                                {/* ------------------ ARTIST ------------------ */}
                                <div className='track-artist'>
                                    <p>{track?.User?.username}</p>
                                </div>
                            </div>

                            {/* ------------------ MEDIA CONTROLS ------------------ */}
                            <div className='control-center'>
                                <div className='back-ctn'>
                                    <button type='button' className='back'><i className="fa-solid fa-backward-step fa-3x"></i></button>
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
                            <div className='volume-ctn'>
                                Volume line here
                            </div>
                        </div>
                        <div className='edit-save-ctn'>
                            {/* ------------------ EDIT AND SAVE CHANGES BUTTONS ------------------ */}
                            <div className='edit-ctn'>
                                {/* If edit button is clicked, openEdit will be set to true and
                                will display save changes button. This will allow form to appear.
                                Conversely, if edit button is not clicked, the edit button will be displayed.
                                Edit button has a 'submit' type because when openEdit is false, that means we are NOT
                                making any changes. Thus, the edits are made and locked in.*/}

                                {<button
                                    type='submit'
                                    className='saveChanges'
                                    // When Save Changes button is CLICKED, Editing will NOT be allowed and
                                    // Edit button WILL BE DISPLAYED.
                                    disabled={errors.length !== 0}
                                    >
                                    Save Changes
                                </button>}
                                <button
                                    type='button'
                                    onClick={() => setOpenEdit(false)}
                                    >Cancel</button>
                            </div>
                            <div className='track-info-ctn'>
                                {/* ------------------ DESCRIPTION ------------------ */}
                                <div className='description'>
                                    {/* If edit button is clicked, form will appear.
                                    Otherwise, display description */}
                                        <textarea
                                            name='description'
                                            value={description}
                                            placeholder='Description'
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                        {/* :(saveChanges && track?.description) */}
                                </div>
                                <div>
                                    {saveChanges && <ErrorMessage error={errors.description} />}
                                </div>
                                {/* ------------------ GENRE ------------------ */}
                                <div className='genre-ctn'>
                                    <div className='genre'>
                                        {/* If edit button is clicked, form will appear.
                                        Otherwise, display genre dropdown */}
                                        <select
                                            type='text'
                                            aria-label='Title'
                                            value={genre}
                                            onChange={e => setGenre(e.target.value)}
                                        >
                                            {genres.map(genre => (
                                                <option key={genre}>{genre}</option>
                                            ))}
                                        </select>
                                        {/* :<span>{saveChanges && track?.genre}</span> */}
                                    </div>
                                    <div>
                                        {openEdit && <ErrorMessage error={errors.genre} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='comment-section-ctn'>
                    <h1>Comments down below</h1>
                </div>
            </div>
        </>
    )
}

export default UpdateTrackForm;
