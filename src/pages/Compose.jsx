import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; import { X, Paperclip, Send, Minus, Maximize2, Minimize2, XCircle } from 'lucide-react';
import Draggable from 'react-draggable';
import debounce from 'lodash/debounce';

// Mock contact data - In real app, this would come from your backend
const mockContacts = [
    { id: 1, email: 'john.doe@example.com', name: 'John Doe' },
    { id: 2, email: 'jane.smith@example.com', name: 'Jane Smith' },
    // Add more mock contacts...
];

// Contact Suggestion Component
const ContactSuggestions = ({ suggestions, onSelect, onClose }) => {
    if (suggestions.length === 0) return null;

    return (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {suggestions.map((contact) => (
                <button
                    key={contact.id}
                    onClick={() => onSelect(contact)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium">{contact.name}</div>
                        <div className="text-xs text-gray-500">{contact.email}</div>
                    </div>
                </button>
            ))}
        </div>
    );
};

// Recipient Tag Component
const RecipientTag = ({ recipient, onRemove }) => (
    <span className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2 py-1 text-sm mr-2">
        <span className="max-w-[150px] truncate">{recipient.name || recipient.email}</span>
        <button onClick={() => onRemove(recipient)} className="ml-1 text-blue-400 hover:text-blue-600">
            <XCircle className="w-4 h-4" />
        </button>
    </span>
);

// File Attachment Preview Component
const AttachmentPreview = ({ file, onRemove }) => (
    <div className="flex items-center space-x-2 bg-gray-50 rounded p-2 mb-2">
        <Paperclip className="w-4 h-4 text-gray-400" />
        <span className="text-sm truncate flex-1">{file.name}</span>
        <span className="text-xs text-gray-500">
            ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </span>
        <button
            onClick={() => onRemove(file)}
            className="text-gray-400 hover:text-gray-600"
        >
            <X className="w-4 h-4" />
        </button>
    </div>
);

// Main Compose Modal Component
const ComposeModal = ({ isOpen, onClose }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [recipients, setRecipients] = useState({ to: [], cc: [], bcc: [] });
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    const dropZoneRef = useRef(null);
    const editorRef = useRef(null);
    const draftId = useRef(Date.now().toString());

    // Handle draft auto-saving
    const saveDraft = debounce(() => {
        const draft = {
            id: draftId.current,
            subject,
            content: editorRef.current?.getContent(),
            recipients,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem(`draft_${draftId.current}`, JSON.stringify(draft));
    }, 1000);

    useEffect(() => {
        saveDraft();
    }, [subject, content, recipients]);

    // Load existing draft
    useEffect(() => {
        const savedDraft = localStorage.getItem(`draft_${draftId.current}`);
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            setSubject(draft.subject);
            setContent(draft.content);
            setRecipients(draft.recipients);
        }
    }, []);

    // Handle file drag and drop
    useEffect(() => {
        const dropZone = dropZoneRef.current;

        if (!dropZone) return; 

        const handleDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('bg-blue-50');
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('bg-blue-50');
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('bg-blue-50');

            const files = Array.from(e.dataTransfer.files);
            handleFileAttachment(files);
        };

        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);

        return () => {
            dropZone.removeEventListener('dragover', handleDragOver);
            dropZone.removeEventListener('dragleave', handleDragLeave);
            dropZone.removeEventListener('drop', handleDrop);
        };
    }, [dropZoneRef.current]); // Add dropZoneRef.current as a dependency

    const handleFileAttachment = (files) => {
        const newAttachments = files.filter(file => {
            // Add file size limit (e.g., 25MB)
            return file.size <= 25 * 1024 * 1024;
        });

        setAttachments(prev => [...prev, ...newAttachments]);
    };

    const handleRecipientInput = (e, type) => {
        const value = e.target.value;
        if (value.length > 1) {
            const filtered = mockContacts.filter(contact =>
                contact.email.toLowerCase().includes(value.toLowerCase()) ||
                contact.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setActiveInput(type);
        } else {
            setSuggestions([]);
        }
    };

    const handleRecipientSelect = (contact, type) => {
        setRecipients(prev => ({
            ...prev,
            [type]: [...prev[type], contact]
        }));
        setSuggestions([]);
    };

    const removeRecipient = (recipient, type) => {
        setRecipients(prev => ({
            ...prev,
            [type]: prev[type].filter(r => r.id !== recipient.id)
        }));
    };

    const modalClasses = `
        fixed bg-white rounded-t-lg shadow-2xl transition-all duration-200 flex flex-col
        ${isMaximized ? 'inset-4' : 'bottom-0 right-4 w-[45rem]'}
        ${isMinimized ? 'h-14' : 'h-[36rem]'}
    `;

    if (!isOpen) return null;

    return (
        <Draggable
            handle=".drag-handle"
            position={position}
            onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
            disabled={isMaximized}
        >
            <div className={modalClasses}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-14 border-b bg-gray-50 rounded-t-lg drag-handle cursor-move">
                    <h2 className="text-sm font-medium text-gray-700">New Message</h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                        >
                            <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={() => {
                                setIsMaximized(!isMaximized);
                                setPosition({ x: 0, y: 0 });
                            }}
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
                            {['to', 'cc', 'bcc'].map((type) => (
                                <div key={type} className="relative px-4 py-2 border-b last:border-b-0">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 w-12 capitalize">
                                            {type}:
                                        </span>
                                        <div className="flex-1 flex flex-wrap items-center">
                                            {recipients[type].map((recipient) => (
                                                <RecipientTag
                                                    key={recipient.id}
                                                    recipient={recipient}
                                                    onRemove={() => removeRecipient(recipient, type)}
                                                />
                                            ))}
                                            <input
                                                type="text"
                                                onChange={(e) => handleRecipientInput(e, type)}
                                                className="flex-1 text-sm outline-none placeholder-gray-400"
                                                placeholder={`Add ${type.toUpperCase()} recipients`}
                                            />
                                        </div>
                                    </div>
                                    {activeInput === type && (
                                        <ContactSuggestions
                                            suggestions={suggestions}
                                            onSelect={(contact) => handleRecipientSelect(contact, type)}
                                            onClose={() => setSuggestions([])}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Subject */}
                        <div className="flex items-center px-4 py-2 border-b">
                            <span className="text-sm text-gray-500 w-12">Subject:</span>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Subject"
                                className="ml-4 flex-1 text-sm outline-none placeholder-gray-400"
                            />
                        </div>

                        {/* Editor */}
                        <div ref={dropZoneRef} className="flex-1 overflow-hidden">
                            <ReactQuill
                                value={content}
                                onChange={setContent}
                                placeholder="Compose your message here..."
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        ['link', 'image'],
                                        ['clean']
                                    ]
                                }}
                                formats={[
                                    'header',
                                    'bold', 'italic', 'underline', 'strike',
                                    'list', 'bullet',
                                    'link', 'image'
                                ]}
                                style={{ height: '100%' }}
                            />
                        </div>

                        {/* Attachments */}
                        {attachments.length > 0 && (
                            <div className="border-t p-4">
                                {attachments.map((file, index) => (
                                    <AttachmentPreview
                                        key={index}
                                        file={file}
                                        onRemove={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="px-4 py-2 border-t bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send
                                </button>
                                <label className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleFileAttachment(Array.from(e.target.files))}
                                    />
                                    <Paperclip className="w-4 h-4" />
                                </label>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem(`draft_${draftId.current}`);
                                    onClose();
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                Discard draft
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Draggable>
    );
};

export default ComposeModal;