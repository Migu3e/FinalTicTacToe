import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import MenuPage from './Menu';
import OneVOne from './1v1.tsx';
import Scorebourd from './Scorebourd.tsx';


import { Player } from './useLocalStorage';

import './CSS/tra.css';

function TransitionPage() {
    const [currentPage, setCurrentPage] = useState<'register' | 'login' | 'menu' | '1v1' | 'scoreboard' | '1vPC'>('register');
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    function handleLogin(player: Player):void {
        setCurrentPlayer(player);
        setCurrentPage('menu');
    }

    function handleLogout(): void {
        setCurrentPlayer(null);
        setCurrentPage('login');
    }

    function handleSwitchToLogin() :void{
        setCurrentPage('login');
    }

    function handleSwitchToRegister():void {
        setCurrentPage('register');
    }

    function handleMenuOptionClick(option: '1v1' | 'scoreboard' | '1vPC'):void {
        setCurrentPage(option);
    }

    function getCurrentPlayer(): Player | null {
        console.log("player:", currentPlayer); // Debug log
        return currentPlayer;
    }
    function handleBack() :void{
        console.log("player:", currentPage); // Debug log
        if (currentPage === 'menu')
        {
            handleLogout();
        }
        else
        {
            setCurrentPage('menu');
        }
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
                        onBack={handleBack}
                    />
                </>
            )}
            {currentPage === 'scoreboard' && (
                <Scorebourd
                    onBack={handleBack}
                />
            )}
            {currentPage === '1v1' && (
                <OneVOne
                    onLogout={handleLogout}
                    currentPlayer={currentPlayer}
                    onBack={handleBack}
                />

            )}
            {!['register', 'login', 'menu', 'scoreboard', '1v1'].includes(currentPage) && (
                <div>
                    <h1>Oops! Something went wrong.</h1>
                    <h1>Unrecognized page: {currentPage}</h1>
                    <button onClick={() => setCurrentPage('menu')}>Go to Menu</button>
                </div>
            )}

        </div>
    );
}

export default TransitionPage;
