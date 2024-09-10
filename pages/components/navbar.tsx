import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="w-full h-16 rounded-lg bg-customred text-[#FEF7EA] flex items-center justify-between px-10 border-2 border-black">
            <Link href="/" passHref>
                <h1 className='text-3xl'>Elias' Bento 🍱</h1>
            </Link>

            <div className='text-3xl font-bold'>弁当</div>
        </nav>
    );
};

export default Navbar;
