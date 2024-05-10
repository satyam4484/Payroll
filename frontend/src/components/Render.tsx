import React from 'react'
import Header from './UI/Header'
import Footer from './UI/Footer'
import Dashboard from './Admin/Dashboard'

const Render: React.FC = () => {
    return (
        <div>
            <Header />
            <Dashboard />
            <Footer />
        </div>
    )
}

export default Render