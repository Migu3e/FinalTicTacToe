import { useState, useEffect } from "react";
import { Player } from '../../Model/Player.tsx';

function getSavedValue(key: string, initialValue: Player[]): Player[] {
    const savedValue  = localStorage.getItem(key);
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

/*

במקום

const [players, setPlayers] = useState<Player[]>(() => {
  const saved = localStorage.getItem("players");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("players", JSON.stringify(players));
}, [players]);

בכל שורה
 */

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