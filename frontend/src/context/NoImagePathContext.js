import { createContext, useContext, useState } from "react";

export const ImagePathContext = createContext();

export const useImagePathContext = () => useContext(ImagePathContext);

export default function ImagePathProvider({ children }) {
    const [imagePath, setImagePath] = useState('');

    return (
        <ImagePathContext.Provider value={(imagePath, setImagePath)}>
            { children }
        </ImagePathContext.Provider>
    )
}
