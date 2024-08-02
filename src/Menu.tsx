import { useState } from 'react';
import Register from './Register';
import Login from './Login.tsx';
import './CSS/tra.css';

function AuthPage() {
    const [isRegistering, setIsRegistering] = useState(true);

    return (
        <div className={`auth-container ${isRegistering ? 'registering' : 'logging-in'}`}>
            <div className="auth-slider">
                {isRegistering ? (
                    <Register onSwitchToLogin={() => setIsRegistering(false)} />
                ) : (
                    <Login onSwitchToRegister={() => setIsRegistering(true)} />
                )}
            </div>
        </div>
    );
}

export default AuthPage;