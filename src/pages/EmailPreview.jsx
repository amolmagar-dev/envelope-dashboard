import React from 'react';
import { Reply, ReplyAll, Forward, Archive, Trash } from 'lucide-react';
import DOMPurify from 'dompurify';

const EmailPreview = ({ selectedEmail }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    const getInitials = (email) => {
        const name = email.split('@')[0];
        return name.slice(0, 2).toUpperCase();
    };

    const getRandomColor = (str) => {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
        ];
        const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    };

    if (!selectedEmail) {
        return <div className="h-full flex items-center justify-center text-gray-500">Select an email to preview</div>;
    }

    return (
        <div className="flex-1 flex flex-col min-w-[400px]">
            {/* Sticky Header Section */}
            <div className="sticky top-0 bg-white">
                {/* Toolbar */}
                <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 justify-between">
                    <div className="flex space-x-2">
                        <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                            <Reply className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                            <ReplyAll className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                            <Forward className="w-4 h-4 text-gray-600" />
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-2"></div>
                        <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                            <Archive className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-200 transition-colors">
                            <Trash className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Email Header Info */}
                <div className="border-b border-gray-200 p-6 bg-white">
                    <div className="flex items-start">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium mr-4 ${getRandomColor(
                                selectedEmail.from[0].address
                            )}`}
                        >
                            {getInitials(selectedEmail.from[0].address)}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedEmail.subject}</h2>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <span className="w-12 text-sm text-gray-500">From:</span>
                                    <span className="text-sm font-medium text-gray-900">{selectedEmail.from[0].address}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-12 text-sm text-gray-500">To:</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {selectedEmail.to.map((to) => to.address).join(', ')}
                                    </span>
                                </div>
                                {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                                    <div className="flex items-center">
                                        <span className="w-12 text-sm text-gray-500">CC:</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {selectedEmail.cc.map((cc) => cc.address).join(', ')}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <span className="w-12 text-sm text-gray-500">Date:</span>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(selectedEmail.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Email Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <div
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedEmail.htmlBody) }}
                        className="prose max-w-3xl mx-auto"
                    />
                    {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                Attachments ({selectedEmail.attachments.length})
                            </h3>
                            {/* Attachment list would go here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailPreview;