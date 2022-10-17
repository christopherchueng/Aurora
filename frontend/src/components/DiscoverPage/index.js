import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPlaylists } from "../../store/playlists";
import './DiscoverPage.css'

const DiscoverPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const playlists = useSelector(state => state?.playlist?.entries)
    const playlistsArr = Object.values(playlists)

    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch]);

    return (
        <div className='discover-ctn'>
            <h1>Here in Discover</h1>
            <div className='selection-field'>
                <div className='selection-field-title'>
                    <h2>Curated for you</h2>
                </div>
            </div>
            <div className="playlists-content">
                {playlistsArr && playlistsArr.map(playlist => (
                    <div className="playlist-ctn" key={playlist?.id}>
                        <div className="playlist-name">
                            {playlist.name}
                        </div>
                        <div className='playlistTracks'>
                            {playlist?.Tracks && (playlist.Tracks).map(track => (
                                <div className='playlistTrack-content'>
                                    <div className='track-here'>
                                        {track.title}
                                    </div>
                                    <div className="playlistTrack-imagePath">
                                        <img src={track.imagePath}></img>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscoverPage;
