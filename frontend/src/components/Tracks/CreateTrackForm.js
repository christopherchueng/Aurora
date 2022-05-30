import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTrack } from "../../store/trackReducer";
import { genres } from "../../utils/genreData";
import FormRowInput from "../FormTemplate/FormRowInput";
import SelectInput from "../FormTemplate/SelectInput";
import TextareaInput from "../FormTemplate/TextareaInput";
import TextInput from "../FormTemplate/TextInput";
import './CreateTrackForm.css'

const CreateTrackForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            genre,
            trackPath,
            imagePath
        }
        let track;
        try {
            track = await dispatch(createTrack(payload))
        } catch (error) {
            // console.log(error.errors);
            setErrors(error.errors);
        }
        if (track) {
            setErrors({});
            history.push(`/tracks/${track.id}`)
        }

        setTitle('');
        setDescription('');
        setGenre('');
        setTrackPath('');
        setImagePath('');
        setErrors({})
    }

    return (
        <div className='create-track-form-ctn'>
            <h1>Upload</h1>
            <div className='track-form-content'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            name='title'
                            type='text'
                            value={title}
                            placeholder='Title'
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                            name='description'
                            value={description}
                            placeholder='Description'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            name='genre'
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        >
                            <option value='' disabled>
                                Select a genre
                            </option>
                            {genres.map(genre => (
                                <option key={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            name='trackPath'
                            type='text'
                            value={trackPath}
                            placeholder='Insert a track link'
                            onChange={e => setTrackPath(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name='imagePath'
                            type='text'
                            value={imagePath}
                            placeholder='Insert an image link'
                            onChange={e => setImagePath(e.target.value)}
                        />
                    </div>
                    <div>
                        <button>Upload</button>
                    </div>

                    {/* <div>
                        <FormRowInput>
                            <TextInput
                                name='title'
                                label='Title'
                                value={title}
                                placeholder='Title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormRowInput>
                    </div>
                    <div>
                        <FormRowInput>
                            <TextareaInput
                                name='description'
                                label='Description'
                                value={description}
                                placeholder='Description'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormRowInput>
                    </div>
                    <div>
                        <FormRowInput>
                            <SelectInput
                                name='genre'
                                label='Select a genre'
                                value={genre}
                                options={genres}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </FormRowInput>
                    </div>
                    <div>
                        <FormRowInput>
                            <TextInput
                                name='trackPath'
                                label='Track'
                                value={trackPath}
                                placeholder='Insert a track link'
                                onChange={(e) => setTrackPath(e.target.value)}
                            />
                        </FormRowInput>
                    </div>
                    <div>
                        <FormRowInput>
                            <TextInput
                                name='imagePath'
                                label='Upload Image'
                                value={imagePath}
                                placeholder='Insert an image link'
                                onChange={(e) => setImagePath(e.target.value)}
                            />
                        </FormRowInput>
                    </div> */}

                        {/* {errors.length > 0 && (
                            <div className='errors'>
                                The following errors were found:
                                <ul>
                                    {errors.map(error => <li key={error}>{error}</li>)}
                                </ul>
                            </div>
                        )} */}
                </form>
            </div>
        </div>
    )
}

export default CreateTrackForm;
