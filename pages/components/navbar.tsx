import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="w-full h-16 rounded-lg bg-biege2 flex items-center justify-between px-10">
            <h1 className='text-3xl'>Elias' Bento 🍱</h1>
            <div className='text-3xl font-bold'>べんとう</div>
        </nav>
    );
};

export default Navbar;
