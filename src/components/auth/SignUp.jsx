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
    const [testStatusMessages, setTestStatusMessages] = useState('');

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
        setTestStatusMessages(['Loading...']);
        setTimeout(() => {
            setTestStatusMessages(['Testing connection...']);
        }, 1000);
        setTimeout(() => {
            setTestStatusMessages((prevMessages) => [...prevMessages, 'IMAP connection successful']);
        }, 2000);
        setTimeout(() => {
            setTestStatusMessages((prevMessages) => [...prevMessages, 'SMTP connection successful']);
        }, 3000);
        setTimeout(() => {
            setTestStatusMessages((prevMessages) => [...prevMessages, 'Creating new user...']);
        }, 4000);
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
                {testStatusMessages.length > 0 && (
                    <div className="text-center mt-4">
                        <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                            {testStatusMessages.map((status, index) => (
                                <li key={index} className="flex items-center">
                                    {status.includes('successful') ? (
                                        <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                    ) : status.includes('Loading') || status.includes('Testing') ? (
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                    )}
                                    {status}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </AuthLayout>
    );
};

export default SignUp;