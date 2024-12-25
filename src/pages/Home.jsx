import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Mail, Star, Archive, Trash, Folder, Search, Reply, ReplyAll, Forward } from 'lucide-react';

const ResizableDivider = ({ onResize }) => {
    const dividerRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);

    useEffect(() => {
        const handleMouseDown = (e) => {
            isDraggingRef.current = true;
            startXRef.current = e.clientX;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        };

        const handleMouseMove = (e) => {
            if (isDraggingRef.current) {
                const dx = e.clientX - startXRef.current;
                onResize(dx);
                startXRef.current = e.clientX;
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        const divider = dividerRef.current;
        divider.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            divider.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [onResize]);

    return (
        <div
            ref={dividerRef}
            className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-colors flex items-center justify-center group"
        >
            <div className="h-8 w-full group-hover:bg-blue-400 flex items-center justify-center">
                <div className="w-0.5 h-4 bg-gray-400 group-hover:bg-white mx-0.5"></div>
                <div className="w-0.5 h-4 bg-gray-400 group-hover:bg-white mx-0.5"></div>
            </div>
        </div>
    );
};

const Home = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [dummyEmails, setDummyEmails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const [mailListWidth, setMailListWidth] = useState(384);

    // Get unique folders and count emails in each folder
    const folderStats = dummyEmails.reduce((acc, email) => {
        acc[email.folder] = (acc[email.folder] || 0) + 1;
        return acc;
    }, {});

    useEffect(() => {
        if (!selectedFolder && Object.keys(folderStats).length > 0) {
            setSelectedFolder(Object.keys(folderStats)[0]);
        }
    }, [folderStats, selectedFolder]);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/emails/getAllEmails');
                setDummyEmails(data);
            } catch (error) {
                console.error("Error fetching emails:", error);
            }
        };
        fetchEmails();
    }, []);

    const handleSidebarResize = (dx) => {
        setSidebarWidth((prev) => {
            const newWidth = Math.max(200, Math.min(400, prev + dx));
            return newWidth;
        });
    };

    const handleMailListResize = (dx) => {
        setMailListWidth((prev) => {
            const newWidth = Math.max(250, Math.min(500, prev + dx));
            return newWidth;
        });
    };

    const filteredEmails = dummyEmails.filter(email =>
        selectedFolder ? email.folder === selectedFolder : true
    );

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

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <div
                style={{ width: `${sidebarWidth}px` }}
                className="flex-none bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto"
            >
                <div className="mb-6">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Mail"
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    {Object.entries(folderStats).map(([folder, count]) => (
                        <div
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors
                                ${selectedFolder === folder ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}`}
                        >
                            <div className="flex items-center">
                                <Folder className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium">{folder}</span>
                            </div>
                            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                {count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* First Resizable Divider */}
            <ResizableDivider onResize={handleSidebarResize} />

            {/* Email List */}
            <div
                style={{ width: `${mailListWidth}px` }}
                className="flex-none border-r border-gray-200 overflow-y-auto"
            >
                <div className="divide-y divide-gray-100">
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
                                <span className="text-xs text-gray-500">{formatDate(email.createdAt)}</span>
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

            {/* Second Resizable Divider */}
            <ResizableDivider onResize={handleMailListResize} />

            {/* Email Detail Preview */}
            <div className="flex-1 flex flex-col min-w-[400px]">
                {selectedEmail ? (
                    <>
                        {/* Sticky Header Section */}
                        <div className="sticky top-0 bg-white z-10">
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
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium mr-4 ${getRandomColor(selectedEmail.from[0].address)}`}>
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
                                                    {selectedEmail.to.map(to => to.address).join(', ')}
                                                </span>
                                            </div>
                                            {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                                                <div className="flex items-center">
                                                    <span className="w-12 text-sm text-gray-500">CC:</span>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {selectedEmail.cc.map(cc => cc.address).join(', ')}
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
                    </>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        Select an email to preview
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;