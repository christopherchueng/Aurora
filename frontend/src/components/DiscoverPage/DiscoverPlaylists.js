import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlaylistCover from "./PlaylistCover";

const DiscoverPlaylists = ({playlist}) => {
    const playing = useSelector(state => state?.mediaControl?.playing)
    const [isPlaying, setIsPlaying] = useState(!!playing)
    const [showButton, setShowButton] = useState(false)
    const [isHoveringPlaylist, setIsHoveringPlaylist] = useState(false)

    const audioPlayer = useRef()

    useEffect(() => {
        if (isPlaying) {
            audioPlayer?.current?.play()
            // progressAnimation.current = requestAnimationFrame(currentlyPlaying)
        } else {
            audioPlayer?.current?.pause()
            // cancelAnimationFrame(progressAnimation.current)
        }
    }, [isPlaying])

    return (
        <>
            <div
                className="playlist-cover"
                onMouseOver={() => setIsHoveringPlaylist(true)}
                onMouseOut={() => setIsHoveringPlaylist(false)}
            >
                {playlist?.Tracks && (playlist.Tracks).map(track => (
                    <PlaylistCover track={track} key={track.id} />
                ))}
                {/* <img
                    className='playlistTrack-cover-photo'
                    src={isHoveringPlaylist ? playlist?.Tracks[1]?.imagePath : playlist?.Tracks[0]?.imagePath}
                /> */}
            </div>
            <div className="playlist-name">
                <h4>{playlist.name}</h4>
            </div>
            <div className='playlistTrack-artist'>
                {playlist?.Tracks[0]?.User?.username}
            </div>
            {/* <div className='playlistTracks flex-col'>
                <div className='playlist-conveyor-belt flex-row'>
                    {playlist?.Tracks && (playlist.Tracks).map(track => (
                        <DiscoverPlaylists
                            key={track.id}
                            track={track}
                        />
                    ))}
                </div>
            </div> */
                // <div className='playlistTrack-content'>
                //     <div className='playlistTrack-info'>
                //         <div className="playlistTrack-trackPath">
                //             <audio src={track.trackPath} ref={audioPlayer}></audio>
                //         </div>
                //         <div className="playlistTrack-imagePath" onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
                //             <div className="play-playlistTrack-ctn">
                //                 <button
                //                     type='button'
                //                     className='play-pause-playlistTrack'
                //                     onClick={() => setIsPlaying(!isPlaying)}
                //                 >
                //                     {showButton && (isPlaying
                //                     ? <i className="fa-solid fa-circle-pause fa-4x fontA-pause"></i>
                //                     : <i className="fa-solid fa-circle-play fa-4x fontA-play"></i>
                //                     )}
                //                 </button>
                //             </div>
                //             <Link to={`/tracks/${track.id}`}><img className='playlistTrack-cover-photo' src={track.imagePath}></img></Link>
                //         </div>
                //         <div className='playlistTrack-title-artist flex-col'>
                //             <div className='playlistTrack-title'>
                //                 <Link to={`/tracks/${track.id}`}>{track.title}</Link>
                //             </div>
                //             <div className='playlistTrack-artist'>
                //                 {track.User?.username}
                //             </div>
                //         </div>
                //     </div>
                // </div>
                    }
        </>
    )
}

export default DiscoverPlaylists
