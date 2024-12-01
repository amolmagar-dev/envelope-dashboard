import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const AuthContainer = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [authMode, setAuthMode] = useState('signin');
    
    const handleSignIn = (credentials) => {
        // Implement sign-in logic
        console.log('Sign In', credentials);
    };

    const handleSignUp = (userData) => {
        // Implement sign-up logic
        console.log('Sign Up', userData);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const switchToSignUp = () => {
        setAuthMode('signup');
    };

    const switchToSignIn = () => {
        setAuthMode('signin');
    };

    return (
        <>
            {authMode === 'signin' ? (
                <SignIn
                    onSignIn={handleSignIn}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    switchToSignUp={switchToSignUp}
                />
            ) : (
                <SignUp
                    onSignUp={handleSignUp}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    switchToSignIn={switchToSignIn}
                />
            )}
        </>
    );
};

export default AuthContainer;