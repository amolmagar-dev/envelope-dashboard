import React from 'react';
import { RefreshCcw } from 'lucide-react';

const EmailList = ({
    mailListWidth,
    filteredEmails,
    selectedEmail,
    setSelectedEmail,
    selectedFolder
}) => {
    const unreadCount = filteredEmails.filter(email => !email.isRead).length;
    const totalCount = filteredEmails.length;

    return (
        <div
            style={{ width: `${mailListWidth}px` }}
            className="flex-none border-r border-gray-200 overflow-y-auto"
        >
            {/* New Toolbar */}
            <div className="sticky top-0 bg-white">

            <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                        {selectedFolder}
                    </span>
                    <span className="text-xs text-gray-500">
                        ({unreadCount} unread / {totalCount} total)
                    </span>
                </div>
                <button
                    className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                    title="Refresh"
                >
                    <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
            </div>
            </div>


            {/* Email List */}
            <div className="divide-y divide-gray-100 m-2">
                {filteredEmails.map((email) => (
                    <div
                        key={email._id}
                        onClick={() => setSelectedEmail(email)}
                        className={`group px-4 py-3 cursor-pointer transition-colors
                            ${selectedEmail?._id === email._id ? 'bg-blue-50' : 'hover:bg-gray-50'}
                            ${!email.isRead ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <div className="flex items-start justify-between mb-1">
                            <span className={`text-sm ${!email.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                {email.from[0].address.split('@')[0]}
                            </span>
                            <span className="text-xs text-gray-500">{email.createdAt}</span>
                        </div>
                        <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                            {email.subject}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {email.textBody || "No preview available"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmailList;