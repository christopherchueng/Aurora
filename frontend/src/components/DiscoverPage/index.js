import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPlaylists } from "../../store/playlists";
import DiscoverPlaylists from "./DiscoverPlaylists";
import './DiscoverPage.css'

const DiscoverPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const playlists = useSelector(state => state?.playlist?.entries)
    const playlistsArr = Object.values(playlists)

    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])

    return (
        <div id='discover'>
            <div className='discover-header'>
                <h1>Discover</h1>
            </div>
            <div className="discover-container">
                {playlistsArr && playlistsArr.map(playlist => (
                    <div className="playlist-ctn" key={playlist?.id}>
                       <DiscoverPlaylists playlist={playlist} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscoverPage;
