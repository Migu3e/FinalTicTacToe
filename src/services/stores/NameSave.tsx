import React, { createContext, useState, useContext, useEffect } from 'react';
import { Player } from '../Utilities/useLocalStorage.tsx';

interface NameContextType {
    currentPlayer: Player | null;
    setCurrentPlayer: (player: Player | null) => void;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export const NameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(() => {
        const savedPlayer = localStorage.getItem('currentPlayer');
        return savedPlayer ? JSON.parse(savedPlayer) : null;
    });

    useEffect(() => {
        if (currentPlayer) {
            localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
        } else {
            localStorage.removeItem('currentPlayer');
        }
    }, [currentPlayer]);

    return (
        <NameContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
            {children}
        </NameContext.Provider>
    );
};

export const useName = () => {
    const context = useContext(NameContext);
    if (context === undefined) {
        throw new Error('useName must be used within a NameProvider');
    }
    return context;
};