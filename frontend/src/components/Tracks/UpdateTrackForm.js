import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTracks, updateTrack } from '../../store/trackReducer';
import { genres } from "../../utils/genreData";
import ErrorMessage from '../FormTemplate/ErrorMessage'
import { useUpdateContext } from '../../context/UpdateContext';
import './UpdateTrackForm.css';

const UpdateTrackForm = ({tracks}) => {
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = tracks[+trackId];

    const { openEditTrack, setOpenEditTrack } = useUpdateContext();
    const [title, setTitle] = useState(track.title)
    const [description, setDescription] = useState(track.description)
    const [genre, setGenre] = useState(track.genre)
    const [trackPath, setTrackPath] = useState(track.trackPath)
    const [imagePath, setImagePath] = useState(track.imagePath)
    const [errors, setErrors] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    // Validator errors
    useEffect(() => {
        const validationErrors = [];
        if (!title) {
            validationErrors.push('Please provide a title.')
        }
        if (title.length > 100) {
            validationErrors.push('Please provide a title under 100 characters.')
        }
        // if (!genre) {
        //     validationErrors.push('Please select a genre.')
        // }

        setErrors(validationErrors);

    }, [title, genre])

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
        }

        // When form is submitted, track will be updated through payload
        const updatedTrack = await dispatch(updateTrack(payload, trackId))
        if (updatedTrack) {
            setOpenEditTrack(false);
        }
    }

    return (
        <>
            <div className='music-player-ctn'>
                <div className='music-player-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='track-bar'>
                            {/* ------------------ IMAGEPATH ------------------ */}
                            <div className='cover-photo-ctn'>
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
                        {/* START MEDIA CONTROLS */}
                        <div className='media-controls'>
                            <div className='control-left'>

                                {/* ------------------ TITLE ------------------ */}
                                <div className='track-title'>
                                    <h1 className='title-input'>
                                        <input
                                            type='text'
                                            aria-label='Title'
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </h1>
                                </div>
                                <div className='edit-error-msg'>
                                    {openEditTrack && <ErrorMessage error={errors[0]} />}
                                </div>

                                {/* ------------------ ARTIST ------------------ */}
                                <div className='track-artist'>
                                    <p>{track?.User?.username}</p>
                                </div>
                            </div>

                            {/* START CENTER OF CONTROLS */}
                            {/* ------------------ MEDIA CONTROLS ------------------ */}
                            <div className='control-center'>

                                {/* ------------------ CANCEL ------------------ */}
                                <div className='delete-cancel-ctn'>
                                    <button
                                        className='track-delete-btn'
                                        type='button'
                                        onClick={() => setOpenEditTrack(false)}
                                        >
                                        <i class="fa-solid fa-xmark fa-2x"></i>
                                    </button>
                                </div>

                                {/* ------------------ BACK ------------------ */}
                                <div className='back-ctn'>
                                    <button
                                        type='button'
                                        className='back'
                                    >
                                        <i className="fa-solid fa-backward-step fa-3x"></i>
                                    </button>
                                </div>

                                {/* ------------------ PLAY ------------------ */}
                                <div className='play-ctn'>
                                    {/* If not playing, play button will display */}
                                    {/* If playing, pause button will display */}
                                    <button
                                        type='button'
                                        className='play-pause'
                                    >
                                        {isPlaying
                                        ? <i className="fa-solid fa-circle-pause fa-7x"></i>
                                        : <i className="fa-solid fa-circle-play fa-7x"></i>
                                        }
                                    </button>
                                </div>

                                {/* ------------------ NEXT ------------------ */}
                                <div className='next-ctn'>
                                    <button
                                        type='button'
                                        className='next'
                                    >
                                        <i className="fa-solid fa-forward-step fa-3x"></i>
                                    </button>
                                </div>

                                {/* ------------------ SAVE ------------------ */}
                                <div className='edit-save-ctn'>
                                    <button
                                        type='submit'
                                        className='saveChanges'
                                        disabled={errors.length !== 0}
                                    >
                                        <i class="fa-solid fa-check fa-2x"></i>
                                    </button>
                                </div>
                            </div>

                            {/* ------------------ GENRE ------------------ */}
                            <div className='genre-ctn'>
                                <div className='genre'>
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
                                </div>
                            </div>
                        </div>
                            <div className='track-info-ctn'>

                                {/* ------------------ DESCRIPTION ------------------ */}
                                <div className='description'>
                                    <textarea
                                        name='description'
                                        value={description}
                                        placeholder='Description'
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateTrackForm;
