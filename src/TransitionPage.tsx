import { useState } from 'react';
import Register from './Register';
import Login from './Login.tsx';
import './CSS/tra.css';

function MangarPage() {
    const [isRegistering, setIsRegistering] = useState(true);

    return (
        <div className={`manage-container ${isRegistering ? 'registering' : 'logging-in'}`}>
            <div>
                {isRegistering ? (
                    <Register onSwitchToLogin={() => setIsRegistering(false)} />
                ) : (
                    <Login onSwitchToRegister={() => setIsRegistering(true)} />
                )}
            </div>
        </div>
    );
}

export default MangarPage;