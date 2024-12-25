import React from 'react';
import { Inbox, FileEdit, SendHorizontal, Trash, AlertOctagon, Archive, Folder, Search, Mail } from 'lucide-react';

const Sidebar = ({
    sidebarWidth,
    folderStats,
    selectedFolder,
    setSelectedFolder,
    setIsComposeOpen,
    searchQuery,
    setSearchQuery,
}) => {
    const defaultFolders = [
        { id: 'inbox', name: 'Inbox', icon: Inbox, count: folderStats.inbox || 0 },
        { id: 'drafts', name: 'Drafts', icon: FileEdit, count: folderStats.drafts || 0 },
        { id: 'sent', name: 'Sent Items', icon: SendHorizontal, count: folderStats.sent || 0 },
        { id: 'deleted', name: 'Deleted Items', icon: Trash, count: folderStats.deleted || 0 },
        { id: 'junk', name: 'Junk Email', icon: AlertOctagon, count: folderStats.junk || 0 },
        { id: 'archive', name: 'Archive', icon: Archive, count: folderStats.archive || 0 },
    ];

    const customFolders = Object.keys(folderStats)
        .filter(folder => !defaultFolders.some(def => def.id?.toLowerCase() === folder?.toLowerCase()))
        .map(folder => ({
            id: folder,
            name: folder,
            icon: Folder,
            count: folderStats[folder],
        }));

    return (
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

            <button
                onClick={() => setIsComposeOpen(true)}
                className="w-full mb-6 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                <Mail className="w-4 h-4 mr-2" />
                <span>Compose</span>
            </button>

            <FolderSection
                title="Favorites"
                folders={defaultFolders}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
            />
            {customFolders.length > 0 && (
                <FolderSection
                    title="Other Folders"
                    folders={customFolders}
                    selectedFolder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                />
            )}
        </div>
    );
};

const FolderSection = ({ title, folders, selectedFolder, setSelectedFolder }) => (
    <div className="mb-6">
        <h2 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
        <div className="space-y-1">
            {folders.map(folder => (
                <div
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedFolder === folder.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                        }`}
                >
                    <div className="flex items-center">
                        <folder.icon className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    {folder.count > 0 && (
                        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                            {folder.count}
                        </span>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default Sidebar;