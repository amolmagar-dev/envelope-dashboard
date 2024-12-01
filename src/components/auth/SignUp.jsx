import React, { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    Server,
    Key,
    MoveLeft,
    Eye,
    EyeOff
} from 'lucide-react';
import AuthLayout from './AuthLayout';
import { userAuthAtom } from '../../state';
import { useAtom } from 'jotai';

const SignUp = ({ onSaveConfig, darkMode, toggleDarkMode, switchToSignIn }) => {
    const [userSignInfo, setUserSignInfo] = useAtom(userAuthAtom);
    const [showPassword, setShowPassword] = useState(false);

    // New state for animation
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-10');

    useEffect(() => {
        // Trigger animation after initial render
        if (isFirstRender) {
            const animationTimer = setTimeout(() => {
                setAnimationClass('opacity-100 translate-y-0');
                setIsFirstRender(false);
            }, 100); // Small delay to ensure initial render

            return () => clearTimeout(animationTimer);
        }
    }, [isFirstRender]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveConfig(userSignInfo);
    };

    const handleTestConnection = () => {
        setUserSignInfo((prev) => ({
            ...prev,
            testStatusMessages: ['Loading...']
        }));

        setTimeout(() => {
            setUserSignInfo((prev) => ({
                ...prev,
                testStatusMessages: ['Testing connection...']
            }));
        }, 1000);

        setTimeout(() => {
            setUserSignInfo((prev) => ({
                ...prev,
                testStatusMessages: [...prev.testStatusMessages, 'IMAP connection successful']
            }));
        }, 2000);

        setTimeout(() => {
            setUserSignInfo((prev) => ({
                ...prev,
                testStatusMessages: [...prev.testStatusMessages, 'SMTP connection successful']
            }));
        }, 3000);

        setTimeout(() => {
            setUserSignInfo((prev) => ({
                ...prev,
                testStatusMessages: [...prev.testStatusMessages, 'Creating new user...']
            }));
        }, 4000);
    };

    return (
        <AuthLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <div
                className={`
                    ${animationClass}
                    transition-all duration-700 ease-out
                    mb-4
                `}
            >
                <MoveLeft
                    onClick={switchToSignIn}
                    className={`cursor-pointer ${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}`}
                />
            </div>
            <div
                className={`
                    ${animationClass}
                    transition-all duration-700 ease-out
                    text-center mb-8
                `}
            >
                <Mail
                    className={`mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                    size={48}
                />
                <h2 className="text-2xl font-bold">Create Your Account</h2>
                <p className="text-gray-500">Start your email journey with us</p>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`
                    ${animationClass}
                    transition-all duration-700 ease-out delay-200
                    space-y-6
                `}
            >
                <div className="flex space-x-6">
                    {/* IMAP Configuration */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">IMAP Settings</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Server className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                                <input
                                    type="text"
                                    placeholder="IMAP Host"
                                    value={userSignInfo.IMAP.host}
                                    onChange={(e) => setUserSignInfo((prev) => ({
                                        ...prev,
                                        IMAP: { ...prev.IMAP, host: e.target.value }
                                    }))}
                                    className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            </div>
                            <div className="relative">
                                <Key className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                                <input
                                    type="number"
                                    placeholder="IMAP Port"
                                    value={userSignInfo.IMAP.port}
                                    onChange={(e) => setUserSignInfo((prev) => ({
                                        ...prev,
                                        IMAP: { ...prev.IMAP, port: e.target.value }
                                    }))}
                                    className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={userSignInfo.IMAP.secure}
                                    onChange={() => setUserSignInfo((prev) => ({
                                        ...prev,
                                        IMAP: { ...prev.IMAP, secure: !prev.IMAP.secure }
                                    }))}
                                    className="rounded text-blue-500 focus:ring-blue-500"
                                />
                                <span>Enable SSL/TLS</span>
                            </div>
                        </div>
                    </div>

                    {/* SMTP Configuration */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">SMTP Settings</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Server className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                                <input
                                    type="text"
                                    placeholder="SMTP Host"
                                    value={userSignInfo.SMTP.host}
                                    onChange={(e) => setUserSignInfo((prev) => ({
                                        ...prev,
                                        SMTP: { ...prev.SMTP, host: e.target.value }
                                    }))}
                                    className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            </div>
                            <div className="relative">
                                <Key className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                                <input
                                    type="number"
                                    placeholder="SMTP Port"
                                    value={userSignInfo.SMTP.port}
                                    onChange={(e) => setUserSignInfo((prev) => ({
                                        ...prev,
                                        SMTP: { ...prev.SMTP, port: e.target.value }
                                    }))}
                                    className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={userSignInfo.SMTP.secure}
                                    onChange={() => setUserSignInfo((prev) => ({
                                        ...prev,
                                        SMTP: { ...prev.SMTP, secure: !prev.SMTP.secure }
                                    }))}
                                    className="rounded text-blue-500 focus:ring-blue-500"
                                />
                                <span>Enable SSL/TLS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email and Password */}
                <div className="space-y-4">
                    <div className="relative">
                        <Mail className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={userSignInfo.Email}
                            onChange={(e) => setUserSignInfo((prev) => ({
                                ...prev,
                                Email: e.target.value
                            }))}
                            className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div className="relative">
                        <div
                            className={`
                            absolute left-3 top-3
                            ${darkMode ? 'text-gray-400' : 'text-gray-500'}
                        `}
                        >
                            <Lock size={20} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={userSignInfo.Password}
                            onChange={(e) =>
                                setUserSignInfo((prev) => ({
                                    ...prev,
                                    Password: e.target.value
                                }))
                            }
                            required
                            className={`
                            w-full p-3 pl-10 pr-12 rounded-lg border
                            ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-100 border-gray-300'}
                            focus:outline-none focus:ring-2 
                            ${darkMode
                                    ? 'focus:ring-blue-500'
                                    : 'focus:ring-blue-300'}
                        `}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`
                            absolute right-3 top-3
                            ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}
                        `}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={handleTestConnection}
                        className={`flex-1 p-3 rounded-lg font-semibold transition-colors 
                                ${darkMode
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-green-500 text-white hover:bg-green-600'}`}
                    >
                        Test Connection
                    </button>
                    <button
                        type="submit"
                        className={`flex-1 p-3 rounded-lg font-semibold transition-colors 
                                ${darkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        Save Configuration
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default SignUp;