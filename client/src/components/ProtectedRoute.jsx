import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
