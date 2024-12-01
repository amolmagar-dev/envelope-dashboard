import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { authModeAtom, darkModeAtom } from '../../state';
import { useAtom } from 'jotai';

const AuthContainer = () => {
    const [authMode, setAuthMode] = useAtom(authModeAtom);
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);

    let users = {
        Email: "a.magar@gmailcom",
        Password: "serkjwkejhrkh"
    }

    const handleSignIn = (credentials) => {
        let { Email } = credentials

        if (Email !== users.Email) {
            //  it means new user 
            setAuthMode('signup')
        }
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
            {(() => {
                switch (authMode) {
                    case 'signin':
                        return (
                            <SignIn
                                onSignIn={handleSignIn}
                                darkMode={darkMode}
                                toggleDarkMode={toggleDarkMode}
                                switchToSignUp={switchToSignUp}
                            />
                        );
                    case 'signup':
                        return (
                            <SignUp
                                onSignUp={handleSignUp}
                                darkMode={darkMode}
                                toggleDarkMode={toggleDarkMode}
                                switchToSignIn={switchToSignIn}
                            />
                        );
                    default:
                        return null;
                }
            })()}
        </>
    );
};

export default AuthContainer;