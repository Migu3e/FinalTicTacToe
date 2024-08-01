import { useState, useEffect } from "react";

export interface Player {
    name: string;
    score: number;
}

function getSavedValue(key: string, initialValue: Player[]): Player[] {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
        return JSON.parse(savedValue);
    }
    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: Player[]) {
    const [value, setValue] = useState<Player[]>(() => getSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}