import React, { useState } from 'react';
import { X, Paperclip, ChevronDown, Send, Minus, Maximize2, Minimize2 } from 'lucide-react';

// Mock Editor Toolbar Button Component
const ToolbarButton = ({ children, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${active ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
            }`}
    >
        {children}
    </button>
);

// Mock Recipient Input Component
const RecipientInput = ({ label, placeholder }) => (
    <div className="flex items-center px-4 py-2 border-b">
        <span className="text-sm text-gray-500 w-12">{label}:</span>
        <input
            type="text"
            placeholder={placeholder}
            className="flex-1 text-sm outline-none placeholder-gray-400"
        />
        <button className="text-gray-400 hover:text-gray-600">
            <ChevronDown className="w-4 h-4" />
        </button>
    </div>
);

const ComposeModal = ({ isOpen, onClose }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [subject, setSubject] = useState('');

    if (!isOpen) return null;

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
        setIsMaximized(false);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
        setIsMinimized(false);
    };

    const modalClasses = `
    fixed bg-white rounded-t-lg shadow-2xl transition-all duration-200 flex flex-col
    ${isMaximized ? 'inset-4' : 'bottom-0 right-4 w-[45rem]'}
    ${isMinimized ? 'h-14' : 'h-[36rem]'}
`;

    return (
        <div className={modalClasses}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b bg-gray-50 rounded-t-lg">
                <h2 className="text-sm font-medium text-gray-700">New Message</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleMinimize}
                        className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={handleMaximize}
                        className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    >
                        {isMaximized ? (
                            <Minimize2 className="w-4 h-4 text-gray-600" />
                        ) : (
                            <Maximize2 className="w-4 h-4 text-gray-600" />
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Recipients */}
                    <div className="border-b">
                        <RecipientInput label="To" placeholder="Recipients" />
                        <RecipientInput label="Cc" placeholder="Carbon copy" />
                        <RecipientInput label="Bcc" placeholder="Blind carbon copy" />
                    </div>

                    {/* Subject */}
                    <div className="flex items-center px-4 py-2 border-b">
                        <span className="text-sm text-gray-500 w-12">Subject:</span>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                            className=" ml-3 flex-1 text-sm outline-none placeholder-gray-400"
                        />
                    </div>

                    {/* Editor Toolbar */}
                    <div className="flex items-center px-2 py-1 border-b space-x-1">
                        {/* Text Styling */}
                        <ToolbarButton>
                            <span className="font-bold">B</span>
                        </ToolbarButton>
                        <ToolbarButton>
                            <span className="italic">I</span>
                        </ToolbarButton>
                        <ToolbarButton>
                            <span className="underline">U</span>
                        </ToolbarButton>

                        <div className="w-px h-4 bg-gray-300 mx-1" />

                        {/* Lists */}
                        <ToolbarButton>
                            <span className="font-mono">●</span>
                        </ToolbarButton>
                        <ToolbarButton>
                            <span className="font-mono">1.</span>
                        </ToolbarButton>

                        <div className="w-px h-4 bg-gray-300 mx-1" />

                        {/* Alignment */}
                        <ToolbarButton>
                            <span className="font-mono">≡</span>
                        </ToolbarButton>

                        <div className="w-px h-4 bg-gray-300 mx-1" />

                        {/* Font Size */}
                        <select className="text-sm border rounded px-2 py-1 bg-white hover:bg-gray-50">
                            <option>Normal</option>
                            <option>Small</option>
                            <option>Large</option>
                        </select>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 overflow-auto h-full">
                        <textarea
                            placeholder="Write your message here..."
                            className="w-full h-full p-4 text-sm outline-none resize-none"
                        />
                    </div>

                    {/* Footer */}
                    <div
                        className={`px-4 py-2 border-t bg-gray-50 flex items-center justify-between ${isMaximized ? 'sticky bottom-0' : ''
                            }`}
                    >
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center">
                                <Send className="w-4 h-4 mr-2" />
                                Send
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors">
                                <Paperclip className="w-4 h-4" />
                            </button>
                        </div>
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                            Discard draft
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ComposeModal;