import '../../assets/CSS/Scoreboard/Scoreboard.css';
import ScorebourdTable from '../../feature/Scoreboard/ScorebourdTable.tsx';
import { ScoreboardLogic } from '../../feature/Scoreboard/ScoreboardLogic.tsx';

function Scoreboard() {
    const prop = ScoreboardLogic();

    return (
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                </thead>
                <ScorebourdTable></ScorebourdTable>
                <tbody>
                {prop.sortedPlayers.map(prop.createPlayerRow)}
                </tbody>
            </table>

    );
}

export default Scoreboard;