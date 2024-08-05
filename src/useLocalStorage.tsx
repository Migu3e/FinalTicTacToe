import { useState, useEffect } from "react";

export interface Player {
    name: string;
    score: number;
}

function getSavedValue(key: string, initialValue: Player[]): Player[] {
    const savedValue  = localStorage.getItem(key);
    if (savedValue) {
        return JSON.parse(savedValue);
    }
    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: Player[]) {
    // Use useState with a function to set initial state
    const [value, setValue] = useState<Player[]>(() => getSavedValue(key, initialValue));

    // Use useEffect to update localStorage when value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

//update player score
export function UpdatePlayerScore(players: Player[], playerName: string): Player[] {
    const updatedPlayers: Player[] = [];

    for (const player  of players) {
        if (player.name === playerName) {
            updatedPlayers.push({
                name: player.name,
                score: player.score + 1
            });
        } else {
            updatedPlayers.push(player);
        }
    }

    return updatedPlayers;
}