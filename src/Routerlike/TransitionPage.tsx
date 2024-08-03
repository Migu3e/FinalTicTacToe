import React, { useState } from 'react';
import Register from '../Register/Register.tsx';
import Login from '../Login/Login.tsx';
import MenuPage from '../Menu/Menu.tsx';
import OneVOne from '../1v1/1v1.tsx';
import Scoreboard from '../Scoreboard/Scorebourd.tsx';
import { Player } from '../useLocalStorage.tsx';
import './tra.css';

type PageType = 'register' | 'login' | 'menu' | '1v1' | 'scoreboard' | '1vPC';

const TransitionPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageType>('register');
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const navigateTo = (destinationPage: PageType): void => {
        // update currret page
        setCurrentPage(destinationPage);
    }

    const handleLogin = (player: Player): void => {
        setCurrentPlayer(player);
        navigateTo('menu');
    };

    const handleLogout = (): void => {
        setCurrentPlayer(null);
        navigateTo('login');
    };

    const handleBack = (): void => {
        if (currentPage === 'menu') {
            handleLogout();
        } else {
            navigateTo('menu');
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'register':
                return (
                    <Register
                        onSwitchToLogin={() => navigateTo('login')}
                        onRegistered={() => navigateTo('login')}
                    />
                );

            case 'login':
                return (
                    <Login
                        onSwitchToRegister={() => navigateTo('register')}
                        onLoggedIn={handleLogin}
                        getCurrentPlayer={() => currentPlayer}
                    />
                );

            case 'menu':
                return (
                    <MenuPage
                        onLogout={handleLogout}
                        currentPlayer={currentPlayer}
                        onOptionClick={navigateTo}
                        onBack={handleBack}
                    />
                );

            case 'scoreboard':
                return (
                    <Scoreboard
                        onBack={handleBack}
                        onLogout={handleBack}
                        currentPlayer={currentPlayer}
                    />
                );

            case '1v1':
                return (
                    <OneVOne
                        onLogout={handleLogout}
                        currentPlayer={currentPlayer}
                        onBack={handleBack}
                    />
                );

            default:
                // Handle unrecognized pages
                return (
                    <div>
                        <h1>לא עובת.</h1>
                        <h1>Unrecognized page: {currentPage}</h1>
                        <button onClick={() => navigateTo('menu')}>
                            Go to Menu
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="transition-container">
            {renderPage()}
        </div>
    );
};

export default TransitionPage;