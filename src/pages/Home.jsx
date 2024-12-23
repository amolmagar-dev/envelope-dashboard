import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Star, Archive, Trash, Folder } from 'lucide-react';

const Home = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [dummyEmails, setDummyEmails] = useState([]);

    // Get unique folders and count emails in each folder
    const folderStats = dummyEmails.reduce((acc, email) => {
        acc[email.folder] = (acc[email.folder] || 0) + 1;
        return acc;
    }, {});

    // Set initial selected folder if not set
    useEffect(() => {
        if (!selectedFolder && Object.keys(folderStats).length > 0) {
            setSelectedFolder(Object.keys(folderStats)[0]);
        }
    }, [folderStats, selectedFolder]);

    // Fetch emails on component mount
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

    // Filter emails by selected folder
    const filteredEmails = dummyEmails.filter(email =>
        selectedFolder ? email.folder === selectedFolder : true
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white p-4 border-r overflow-auto">
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Folders</h2>
                    <div className="space-y-2">
                        {Object.entries(folderStats).map(([folder, count]) => (
                            <div
                                key={folder}
                                onClick={() => setSelectedFolder(folder)}
                                className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer
                                ${selectedFolder === folder ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center">
                                    <Folder className="w-4 h-4 mr-2" />
                                    <span>{folder}</span>
                                </div>
                                <span className="text-sm text-gray-500">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Email List */}
            <div className="w-96 border-r overflow-auto">
                {/* Toolbar */}
                <div className="h-12 bg-white border-b flex items-center px-4 justify-between">
                    <div className="flex space-x-4">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <Star className="w-5 h-5 text-gray-500" />
                        <Archive className="w-5 h-5 text-gray-500" />
                        <Trash className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Email List */}
                <div>
                    {filteredEmails.map((email) => (
                        <div
                            key={email._id}
                            className={`flex items-center px-4 py-3 border-b hover:bg-gray-50 cursor-pointer 
                                ${selectedEmail?._id === email._id ? 'bg-blue-50' : ''}
                                ${!email.isRead ? 'font-semibold' : ''}`}
                            onClick={() => setSelectedEmail(email)}
                        >
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{email.from[0].address}</span>
                                    <span className="text-sm text-gray-500">{formatDate(email.createdAt)}</span>
                                </div>
                                <div className="text-sm font-medium">{email.subject}</div>
                                <div className="text-sm text-gray-500 truncate">
                                    {email.textBody || "No preview available"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Detail Preview */}
            <div className="flex-1 bg-white overflow-auto">
                {selectedEmail ? (
                    <div className="h-full flex flex-col">
                        <div className="border-b p-4">
                            <h2 className="text-xl font-semibold mb-4">{selectedEmail.subject}</h2>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-12">From:</span>
                                    <span className="font-medium">{selectedEmail.from[0].address}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-12">To:</span>
                                    <span className="font-medium">
                                        {selectedEmail.to.map(to => to.address).join(', ')}
                                    </span>
                                </div>
                                {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="w-12">CC:</span>
                                        <span className="font-medium">
                                            {selectedEmail.cc.map(cc => cc.address).join(', ')}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-12">Date:</span>
                                    <span className="font-medium">{formatDate(selectedEmail.createdAt)}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-12">Folder:</span>
                                    <span className="font-medium">{selectedEmail.folder}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex-1 overflow-auto h-full">
                            <div
                                dangerouslySetInnerHTML={{ __html: selectedEmail.htmlBody }}
                                className="prose max-w-none"
                                style={{width:'60vw'}}
                            />
                            {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                                <div className="mt-4 pt-4 border-t">
                                    <h3 className="text-sm font-semibold mb-2">Attachments ({selectedEmail.attachments.length})</h3>
                                    {/* Attachment list would go here */}
                                </div>
                            )}
                        </div>
                    </div>
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