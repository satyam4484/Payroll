import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CreateUser from '../User/CreateUser';
import CreateCompany from '../Company/CreateCompany';
import CompanyList from '../CompanyDetails/CompanyList';
import UserDetails from '../UserDetails/UserDetails';

const Dashboard = () => {

    const [selectedPage, setSelectedPage] = useState(null);

    const renderPage = () => {

        switch (selectedPage) {
            case 'User':
                return <CreateUser />;
            case 'Company':
                return <CreateCompany />;
            case 'CompanyList':
                return <CompanyList />;
            case 'UserDetails':
                return <UserDetails />;
            default:
                return null

        }

    }


    return (
        <>
            <div className='grid grid-cols-12 gap-4 px-5 pt-5'>

                <div className='col-span-2 mt-16 hidden md:block'>
                    <Sidebar setSelectedPage={setSelectedPage} />
                </div>

                <div className={`col-span-10 mx-auto my-16 w-5/6`}>
                    {renderPage()}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
