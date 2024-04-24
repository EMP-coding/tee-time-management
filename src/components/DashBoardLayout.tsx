// DashboardLayout.tsx

import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Dashboard</h1>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Home</Link></li>
                        <li><Link to="/dashboard/profile">Profile</Link></li>
                        <li><Link to="/dashboard/settings">Settings</Link></li>
                        <li><Link to="/dashboard/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
