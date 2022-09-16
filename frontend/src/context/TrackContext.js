import { createContext, useContext, useState } from 'react';

export const trackContext = createContext();

export const useTrackContext = () => useContext(trackContext);

export default function TrackProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)


    return (
        <trackContext.Provider value={{
            isPlaying,
            setIsPlaying,
            isShuffled,
            setIsShuffled
        }}>
            { children }
        </trackContext.Provider>
    );
}
