import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import MenuPage from './Menu';
import { Player } from './useLocalStorage';

import './CSS/tra.css';

function TransitionPage() {
    const [currentPage, setCurrentPage] = useState('register');
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);


    function handleLogin(player: Player) {
        setCurrentPlayer(player);
        setCurrentPage('menu');
    }

    function handleLogout() : void {
        setCurrentPlayer(null);

        setCurrentPage('login');
    }

    function handleSwitchToLogin() {
        setCurrentPage('login');
    }

    function handleSwitchToRegister() {
        setCurrentPage('register');
    }
    function getCurrentPlayer(): Player | null {
        console.log("player:", currentPlayer); // Debug log
        return currentPlayer;
    }

    return (
        <div className="transition-container">
            {currentPage === 'register' && (
                <Register
                    onSwitchToLogin={handleSwitchToLogin}
                    onRegistered={handleSwitchToLogin}
                />
            )}
            {currentPage === 'login' && (
                <Login
                    onSwitchToRegister={handleSwitchToRegister}
                    onLoggedIn={handleLogin}
                    getCurrentPlayer={getCurrentPlayer}


                />
            )}
            {currentPage === 'menu' && (
                <
                    MenuPage onLogout={handleLogout}
                             currentPlayer={currentPlayer}
                />
            )}
        </div>
    );
}

export default TransitionPage;