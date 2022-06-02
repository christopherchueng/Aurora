import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTracks, updateTrack } from '../../store/trackReducer';
import { genres } from "../../utils/genreData";
import DeleteTrackComponent from './DeleteTrackComponent';
import UpdateTrackForm from './UpdateTrackForm';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../FormTemplate/ErrorMessage'
import './TrackIdPage.css';

const TrackIdPage = ({tracks}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { trackId } = useParams();
    const track = tracks[+trackId];
    console.log('heres the track again', track)

    const [title, setTitle] = useState(track.title)
    const [description, setDescription] = useState(track.description)
    const [genre, setGenre] = useState(track.genre)
    const [trackPath, setTrackPath] = useState(track.trackPath)
    const [imagePath, setImagePath] = useState(track.imagePath)
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
            setErrors({})
            setOpenEdit(false);
            setSaveChanges(true);
            history.push(`/tracks/${updatedTrack.id}`)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='music-player-ctn'>
                    <div className='music-player-content'>
                        <div className='track-bar'>
                            {/* <form onSubmit={handleSubmit}> */}
                                <div className='cover-photo-ctn'>
                                    {/* If edit button is clicked, form will appear.
                                    Otherwise, display cover photo */}
                                    {openEdit ?
                                    <input
                                        name='imagePath'
                                        type='text'
                                        alt='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
                                        value={imagePath}
                                        placeholder='Insert an image link'
                                        onChange={e => setImagePath(e.target.value)}
                                    /> :
                                    (<img className='cover-photo' src={track?.imagePath}></img>)}
                                </div>
                            {/* </form> */}
                        </div>
                        <div className='media-controls'>
                            <div className='control-left'>
                                {/* <form onSubmit={handleSubmit}> */}
                                    <div className='track-title'>
                                        <h1>
                                            {/* If edit button is clicked, form will appear.
                                            Otherwise, display title */}
                                            {openEdit ?
                                                <input
                                                    type='text'
                                                    aria-label='Title'
                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                /> :
                                                (track?.title)
                                            }
                                        </h1>
                                    </div>
                                    <div>
                                        {saveChanges && <ErrorMessage error={errors.title} />}
                                    </div>
                                {/* </form> */}
                                <div className='track-artist'>
                                    <p>{track?.User?.username}</p>
                                </div>
                            </div>
                            <div className='control-center'>
                                <div className='back-ctn'>
                                    <button type='button' className='back'><i className="fa-solid fa-backward-step fa-3x"></i></button>
                                </div>
                                <div className='play-ctn'>
                                    {/* If not playing, play button will display */}
                                    {!isPlaying && (<button type='button' className='play' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-play fa-7x"></i></button>)}
                                    {/* If playing, pause button will display */}
                                    {isPlaying && (<button type='button' className='pause' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-pause fa-7x"></i></button>)}
                                </div>
                                <div className='next-ctn'>
                                    <button type='button' className='next'><i className="fa-solid fa-forward-step fa-3x"></i></button>
                                </div>

                            </div>
                            <div className='volume-ctn'>
                                Volume line here
                            </div>
                        </div>
                    </div>
                <div className='adjustment-ctn'>
                    <form onSubmit={handleSubmit}>
                        <div className='edit-ctn'>
                            {/* If edit button is clicked, openEdit will be set to true and
                            will display save changes button. This will allow form to appear.
                            Conversely, if edit button is not clicked, the edit button will be displayed.
                            Edit button has a 'submit' type because when openEdit is false, that means we are NOT
                            making any changes. Thus, the edits are made and locked in.*/}
                            {openEdit ?
                                (<button
                                    type='button'
                                    className='saveChanges'
                                    // When Save Changes button is CLICKED, Editing will NOT be allowed and
                                    // Edit button WILL BE DISPLAYED.
                                    onClick={() => setOpenEdit(false) &&
                                    setSaveChanges(false)}>
                                        Save Changes
                                </button>) :
                                (<button
                                    type='submit'
                                    className='inline-edit-Track'
                                    // When Edit button is CLICKED, Editing will be allowed and Save Changes
                                    // button WILL BE DISPLAYED.
                                    onClick={() => setOpenEdit(true) &&
                                    setSaveChanges(true)}>
                                        Edit
                                </button>)
                            }
                        </div>
                    </form>
                    <div className='delete-ctn'>
                        <DeleteTrackComponent trackId={trackId} />
                    </div>
                </div>
                    <div className='track-info-ctn'>
                        {/* <form onSubmit={handleSubmit}> */}
                            <div className='description'>
                                {/* If edit button is clicked, form will appear.
                                Otherwise, display description */}
                                {openEdit ?
                                    (<textarea
                                        name='description'
                                        value={description}
                                        placeholder='Description'
                                        onChange={e => setDescription(e.target.value)}
                                    />) :
                                    (track?.description)
                                }
                            </div>
                            <div>
                                {saveChanges && <ErrorMessage error={errors.description} />}
                            </div>
                        {/* </form> */}
                            <div className='genre-ctn'>
                                {/* <form onSubmit={handleSubmit}> */}
                                    <div className='genre'>
                                        {/* If edit button is clicked, form will appear.
                                        Otherwise, display genre dropdown */}
                                        {openEdit ?
                                            (<select
                                                type='text'
                                                aria-label='Title'
                                                value={genre}
                                                onChange={e => setGenre(e.target.value)}
                                            >
                                                {genres.map(genre => (
                                                    <option key={genre}>{genre}</option>
                                                ))}
                                            </select>) :
                                            <span>{track?.genre}</span>
                                        }
                                    </div>
                                    <div>
                                        {saveChanges && <ErrorMessage error={errors.genre} />}
                                    </div>
                                {/* </form> */}
                            </div>
                    </div>
                </div>
            </form>
                <div className='comment-section-ctn'>
                    <h1>Comments down below</h1>
                </div>
        </>
    )
}

export default TrackIdPage;
