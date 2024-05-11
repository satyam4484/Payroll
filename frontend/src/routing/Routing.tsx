import React, { lazy, Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
const Render = lazy(() => import('@/components/Render'));
const NoPage = lazy(() => import('@/components/NoPage'));
const LandingPage = lazy(() => import('@/components/UI/LandingPage'));
const Login = lazy(() => import('@/components/Login/Login'));

const Routing: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<Outlet />}>
                    {/* Landing page route */}
                    <Route index element={<LandingPage />} />

                    {/* Application routes */}
                    <Route path='app' element={<Outlet />}>
                        <Route index element={<NoPage />} />
                        <Route path='dashboard' element={<Render />} />
                    </Route>

                    {/* Redirect unmatched paths to the NoPage component */}
                    <Route path='*' element={<NoPage />} />
                </Route>

                {/* Authentication routes */}
                <Route path='/auth' element={<Outlet />}>
                    <Route index element={<NoPage />} />
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default Routing;