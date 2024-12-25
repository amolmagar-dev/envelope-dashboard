import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ComposeModal from './Compose';
import ResizableDivider from './ResizableDivider';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import EmailPreview from './EmailPreview';

const Home = () => {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [dummyEmails, setDummyEmails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const [mailListWidth, setMailListWidth] = useState(384);
    const [isComposeOpen, setIsComposeOpen] = useState(false);

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

    const folderStats = dummyEmails.reduce((acc, email) => {
        acc[email.folder] = (acc[email.folder] || 0) + 1;
        return acc;
    }, {});

    useEffect(() => {
        if (!selectedFolder && Object.keys(folderStats).length > 0) {
            setSelectedFolder(Object.keys(folderStats)[0]);
        }
    }, [folderStats, selectedFolder]);

    const filteredEmails = dummyEmails.filter(email =>
        selectedFolder ? email.folder.toLowerCase() === selectedFolder.toLowerCase() : true
    );

    const handleSidebarResize = (dx) => {
        setSidebarWidth((prev) => Math.max(200, Math.min(400, prev + dx)));
    };

    const handleMailListResize = (dx) => {
        setMailListWidth((prev) => Math.max(250, Math.min(500, prev + dx)));
    };

    return (
        <>
            <div className="flex h-screen bg-white">
                <Sidebar
                    sidebarWidth={sidebarWidth}
                    folderStats={folderStats}
                    selectedFolder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                    setIsComposeOpen={setIsComposeOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <ResizableDivider onResize={handleSidebarResize} />
                <EmailList
                    mailListWidth={mailListWidth}
                    filteredEmails={filteredEmails}
                    selectedEmail={selectedEmail}
                    setSelectedEmail={setSelectedEmail}
                    selectedFolder={selectedFolder}
                />
                <ResizableDivider onResize={handleMailListResize} />
                <EmailPreview selectedEmail={selectedEmail} />
            </div>
            <ComposeModal
                isOpen={isComposeOpen}
                onClose={() => setIsComposeOpen(false)}
            />
        </>
    );
};

export default Home;