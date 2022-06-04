import { createContext, useContext, useState } from 'react';

export const updateContext = createContext();

export const useUpdateContext = () => useContext(updateContext);

export default function UpdateProvider({ children }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [saveChanges, setSaveChanges] = useState(false);

    return (
        <updateContext.Provider value={{openEdit, setOpenEdit, saveChanges, setSaveChanges}}>
            { children }
        </updateContext.Provider>
    );
}
