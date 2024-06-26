import React, { lazy, Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Spinner from './ui/Spinner';

const Render = lazy(() => import('./ui/Render'));
const NoPage = lazy(() => import('./ui/NoPage'));
const Dashboard = lazy(() => import('./components/Homepage/Dashboard'));
const Login = lazy(() => import('./components/Authentication/Login'));
const Signup = lazy(() => import('./components/Authentication/Signup'));


const Routing = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route index element={<Render />} />
                </Route>

                <Route path="/auth" element={<Outlet />}>
                    <Route index element={<NoPage />} />
                    <Route path="login" element={<Login />} />
                    {/* <Route path="signup" element={<Signup />} /> */}
                </Route>

                <Route path="*" element={<NoPage />} />
            </Routes>
        </Suspense>
    );
};

export default Routing;