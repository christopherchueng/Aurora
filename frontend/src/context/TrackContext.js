import { createContext, useContext, useState } from 'react';

export const trackContext = createContext();

export const useTrackContext = () => useContext(trackContext);

export default function TrackProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)


    return (
        <trackContext.Provider value={{
            isPlaying,
            setIsPlaying,
            isShuffled,
            setIsShuffled,
            duration,
            setDuration,
            currentTime,
            setCurrentTime
        }}>
            { children }
        </trackContext.Provider>
    );
}
