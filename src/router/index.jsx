import { Routes, Route } from 'react-router-dom';
import Inbox from '../pages/InboxPage';
import Sent from '../pages/SentPage';
import Trash from '../pages/TrashPage';
import Compose from '../pages/ComposePage';
import Home from '../pages/Home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/compose" element={<Compose />} />
        </Routes>
    );
};

export default AppRoutes;