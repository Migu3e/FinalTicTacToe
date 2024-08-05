import useLocalStorage from '../useLocalStorage';
import { useNavigationHelpers } from "../UseFunctions";

export interface Player {
    name: string;
    score: number;
}

export function ScoreboardLogic() {
    const [players] = useLocalStorage('players', []) as [Player[], (players: Player[]) => void];
    const { handleBack } = useNavigationHelpers();

    const bubbleSortPlayersByScore = (players: Player[]): Player[] => {
        const sortedPlayers: Player[] = [...players];
        let n: number = sortedPlayers.length;
        let swapped: boolean;

        do {
            swapped = false;
            for (let i = 1; i < n; i++) {
                if (sortedPlayers[i - 1].score < sortedPlayers[i].score) {
                    const temp = sortedPlayers[i - 1];
                    sortedPlayers[i - 1] = sortedPlayers[i];
                    sortedPlayers[i] = temp;
                    swapped = true;
                }
            }
            n--;
        } while (swapped);

        return sortedPlayers;
    };

    const createPlayerRow = (player: Player): JSX.Element => {
        return (
            <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.score}</td>
            </tr>
        );
    };

    const sortedPlayers = bubbleSortPlayersByScore(players);

    return {
        sortedPlayers,
        createPlayerRow,
        handleBack
    };
}