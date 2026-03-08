import React, { createContext, useContext, useState } from 'react';

const DragContext = createContext();

export const DragProvider = ({ children }) => {
    const [dragMode, setDragMode] = useState(false);
    const toggleDragMode = () => setDragMode(prev => !prev);
    return (
        <DragContext.Provider value={{ dragMode, toggleDragMode }}>
            {children}
        </DragContext.Provider>
    );
};

export const useDragMode = () => useContext(DragContext);
