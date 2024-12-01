import React, { useState } from 'react';
import {
    Mail,
    Lock,
    Server,
    Key,
    MoveLeft
} from 'lucide-react';
import AuthLayout from './AuthLayout';

const SignUp = ({ onSaveConfig, darkMode, toggleDarkMode, switchToSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imapHost, setImapHost] = useState('');
    const [smtpHost, setSmtpHost] = useState('');
    const [imapPort, setImapPort] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [imapSsl, setImapSsl] = useState(true);
    const [smtpSsl, setSmtpSsl] = useState(true);
    const [testStatus, setTestStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            email,
            password,
            imapHost,
            smtpHost,
            imapPort,
            smtpPort,
            imapSsl,
            smtpSsl
        };
        onSaveConfig(config);
    };

    const handleTestConnection = () => {
        setTestStatus('Testing connection...');
        setTimeout(() => {
            setTestStatus('Connection successful!');
        }, 2000);
    };

    return (
        <AuthLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <div>
                <MoveLeft
                    onClick={switchToSignIn} />
            </div>
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    value={imapHost}
                                    onChange={(e) => setImapHost(e.target.value)}
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
                                    value={imapPort}
                                    onChange={(e) => setImapPort(e.target.value)}
                                    className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={imapSsl}
                                    onChange={() => setImapSsl(!imapSsl)}
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
                                    value={smtpHost}
                                    onChange={(e) => setSmtpHost(e.target.value)}
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
                                    value={smtpPort}
                                    onChange={(e) => setSmtpPort(e.target.value)}
                                    className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={smtpSsl}
                                    onChange={() => setSmtpSsl(!smtpSsl)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div className="relative">
                        <Lock className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-3 pl-10 rounded-lg ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-gray-100 border-gray-300 text-gray-800'} 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
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

                {/* Status Message */}
                {testStatus && (
                    <div className="text-center mt-4">
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {testStatus}
                        </p>
                    </div>
                )}
            </form>
        </AuthLayout>
    );
};

export default SignUp;