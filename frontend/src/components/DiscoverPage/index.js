import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPlaylists } from "../../store/playlists";
import './DiscoverPage.css'
import DiscoverTracks from "./DiscoverTracks";

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
            <div className="discover-container">
                {playlistsArr && playlistsArr.map(playlist => (
                    <div className="playlist-ctn" key={playlist?.id}>
                        <div className="playlist-name">
                            <h1>{playlist.name}</h1>
                        </div>
                        <div className='playlistTracks flex-col'>
                            <div className='playlist-conveyor-belt flex-row'>
                                {playlist?.Tracks && (playlist.Tracks).map(track => (
                                    <DiscoverTracks
                                        key={track.id}
                                        track={track}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscoverPage;
