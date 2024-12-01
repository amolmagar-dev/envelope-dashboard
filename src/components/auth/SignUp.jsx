import React, { useState } from 'react';
import {
    Mail,
    User,
    Lock,
    Mail as MailIcon,
    Eye,
    EyeOff
} from 'lucide-react';
import AuthLayout from './AuthLayout';

const SignUp = ({ onSignUp, darkMode, toggleDarkMode, switchToSignIn }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Implement sign-up logic
        onSignUp({ fullName, email, password });
    };

    return (
        <AuthLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <div className="text-center mb-8">
                <Mail
                    className={`
            mx-auto mb-4
            ${darkMode ? 'text-blue-400' : 'text-blue-600'}
          `}
                    size={48}
                />
                <h2 className="text-2xl font-bold">Create Your Account</h2>
                <p className="text-gray-500">Start your email journey with us</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div
                        className={`
              absolute left-3 top-3
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            `}
                    >
                        <User size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        <MailIcon size={20} />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`
              absolute right-3 top-3
              ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}
            `}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2 rounded"
                        required
                    />
                    <span
                        className={`
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}
            `}
                    >
                        I agree to the Terms of Service and Privacy Policy
                    </span>
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
                    Create Account
                </button>

                <div className="text-center mt-4">
                    <span
                        className={`
              ${darkMode ? 'text-gray-400' : 'text-gray-600'}
            `}
                    >
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={switchToSignIn}
                            className={`
                font-bold
                ${darkMode
                                    ? 'text-blue-400 hover:text-blue-300'
                                    : 'text-blue-600 hover:text-blue-700'}
              `}
                        >
                            Sign In
                        </button>
                    </span>
                </div>
            </form>
        </AuthLayout>
    );
};

export default SignUp