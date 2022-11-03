import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const PlaylistCover = ({track}) => {
    const playing = useSelector(state => state?.mediaControl?.playing)

    const [isPlaying, setIsPlaying] = useState(!!playing)
    const [showButton, setShowButton] = useState(false)

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
            <div className='playlistTrack-info' onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
                <div className="playlistTrack-trackPath">
                    <audio src={track.trackPath} ref={audioPlayer}></audio>
                </div>
                <div className="playlistTrack-imagePath">
                    <div className="play-playlistTrack-ctn">
                        <button
                            type='button'
                            className='play-pause-playlistTrack'
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {showButton && (isPlaying
                            ? <i className="fa-solid fa-circle-pause fa-4x fontA-pause"></i>
                            : <i className="fa-solid fa-circle-play fa-4x fontA-play"></i>
                            )}
                        </button>
                    </div>
                </div>
                <img
                    className='playlistTrack-cover-photo'
                    src={track.imagePath}
                />
            </div>
        </>
    )
}

export default PlaylistCover
