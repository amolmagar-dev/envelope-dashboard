import React, { useRef, useEffect } from 'react';

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

export default ResizableDivider;