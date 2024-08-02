import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import MenuPage from './Menu';
import OneVOne from './1v1.tsx';

import { Player } from './useLocalStorage';

import './CSS/tra.css';

function TransitionPage() {
    const [currentPage, setCurrentPage] = useState<'register' | 'login' | 'menu' | '1v1' | 'scoreboard' | '1vPC'>('register');
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    function handleLogin(player: Player) {
        setCurrentPlayer(player);
        setCurrentPage('menu');
    }

    function handleLogout(): void {
        setCurrentPlayer(null);
        setCurrentPage('login');
    }

    function handleSwitchToLogin() {
        setCurrentPage('login');
    }

    function handleSwitchToRegister() {
        setCurrentPage('register');
    }

    function handleMenuOptionClick(option: '1v1' | 'scoreboard' | '1vPC') {
        setCurrentPage(option);
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
                <>
                    <MenuPage
                        onLogout={handleLogout}
                        currentPlayer={currentPlayer}
                        onOptionClick={handleMenuOptionClick}
                    />
                </>
            )}
            {currentPage === '1v1' && (
                <OneVOne
                    onLogout={handleLogout}
                    currentPlayer={currentPlayer}
                />
            )}

        </div>
    );
}

export default TransitionPage;
