import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTracks } from "../../store/trackReducer";
import './DiscoverPage.css'

const DiscoverPage = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.track.entries)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch]);

    return (
        <div className='discover-ctn'>
            <h1>Here in Discover</h1>
            <div className='selection-field'>
                <div className='selection-field-title'>
                    <h2>Curated for you</h2>
                </div>
                <div className='selection-field-tracks'>
                    <ul>
                        {Object.values(tracks).map(({ id, imagePath }) => (
                            <li key={id}>
                                <NavLink to={`/tracks/${id}`}>
                                    <img src={imagePath}></img>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DiscoverPage;
