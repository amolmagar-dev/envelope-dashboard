import React, { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    Mail as MailIcon,
    Eye,
    EyeOff
} from 'lucide-react';
import AuthLayout from './AuthLayout';
import { userAuthAtom } from '../../state';
import { useAtom } from 'jotai';

const SignIn = ({ onSignIn, darkMode, toggleDarkMode, switchToSignUp }) => {
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
        console.log(userSignInfo);
        onSignIn(userSignInfo);
    };

    return (
        <AuthLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <div
                className={`
                    ${animationClass}
                    transition-all duration-700 ease-out
                    text-center mb-8
                `}
            >
                <Mail
                    className={`
                        mx-auto mb-4
                        ${darkMode ? 'text-blue-400' : 'text-blue-600'}
                    `}
                    size={48}
                />
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-500">Sign in to continue to your inbox</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className={`
                    ${animationClass}
                    transition-all duration-700 ease-out delay-200
                    space-y-4
                `}
            >
                <div className="relative">
                    <div
                        className={`
                            absolute left-3 top-3
                            ${darkMode ? 'text-gray-400' : 'text-gray-500'}
                        `}
                    >
                        <MailIcon size={20} />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userSignInfo?.Email || ''} // Read from atom state
                        onChange={(e) =>
                            setUserSignInfo((prev) => ({
                                ...prev,
                                Email: e.target.value
                            }))
                        }
                        required
                        className={`
                            w-full p-3 pl-10 rounded-lg border
                            ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-100 border-gray-300'}
                            focus:outline-none focus:ring-2 
                            ${darkMode
                                ? 'focus:ring-blue-500'
                                : 'focus:ring-blue-300'}
                        `}
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

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2 rounded"
                        />
                        <span
                            className={`
                                ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                            `}
                        >
                            Remember me
                        </span>
                    </label>
                    <a
                        href="#"
                        className={`
                            text-sm
                            ${darkMode
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-blue-600 hover:text-blue-700'}
                        `}
                    >
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    className={`
                        w-full p-3 rounded-lg font-bold
                        ${darkMode
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'}
                        transition duration-300
                    `}
                >
                    Sign In
                </button>
            </form>
        </AuthLayout>
    );
};

export default SignIn;