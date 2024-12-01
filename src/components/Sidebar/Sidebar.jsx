import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Mail Client</h1>
            <nav className="flex-1 p-4">
                <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Inbox</Link>
                <Link to="/sent" className="block py-2 px-4 hover:bg-gray-700">Sent</Link>
                <Link to="/trash" className="block py-2 px-4 hover:bg-gray-700">Trash</Link>
                <Link to="/compose" className="block py-2 px-4 hover:bg-gray-700">Compose</Link>
            </nav>
        </div>
    );
};

export default Sidebar;