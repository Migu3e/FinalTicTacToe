import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import MenuPage from './Menu';
import './CSS/tra.css';

function TransitionPage() {
    const [currentPage, setCurrentPage] = useState('register');

    function handleLogin() {
        setCurrentPage('menu');
    }

    function handleLogout() {
        setCurrentPage('login');
    }

    function handleSwitchToLogin() {
        setCurrentPage('login');
    }

    function handleSwitchToRegister() {
        setCurrentPage('register');
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
                />
            )}
            {currentPage === 'menu' && (
                <MenuPage onLogout={handleLogout} />
            )}
        </div>
    );
}

export default TransitionPage;