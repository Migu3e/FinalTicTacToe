import useLocalStorage from '../useLocalStorage.tsx';
import './Scoreboard.css';
import ActionBar from '../NavActBar.tsx';
import {useNavigationHelpers} from "../UseFunctions.ts";


interface Player {
    name: string;
    score: number;
}


const bubbleSortPlayersByScore = (players: Player[]): Player[] => {
    const sortedPlayers:Player[] = [...players];
    let n : number = sortedPlayers.length;
    let swapped : boolean;

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
function Scoreboard()
{
    const [players] = useLocalStorage('players', []) as [Player[], (players: Player[]) => void];
    const sortedPlayers = bubbleSortPlayersByScore(players);
    const { handleBack } = useNavigationHelpers();

    return (
        <div className="scoreboard-container">
            <ActionBar/>
            <h1>Scoreboard</h1>
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {sortedPlayers.map(createPlayerRow)}

                </tbody>
            </table>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default Scoreboard;
