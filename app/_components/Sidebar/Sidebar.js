'use client';
import Link from 'next/link';

const Sidebar = ({ isOpen }) => {
    return (
        <div className={`sidebar fixed top-0 left-0  z-50transition-transform duration-300 ease-in-out 
            ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
            bg-slate-100 w-40 h-screen shadow-lg p-4`}>
            <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
            <nav className='p-2'>
                <ul className='font-semibold '>
                    <li className='my-2'>
                        <Link href="/auth/signin">Sign In</Link>
                    </li>

                    <li className='my-2 '>
                        <Link href="/auth/signup">Sign Up</Link>
                    </li>
                    {/*  <li className='my-2 '>
                        <Link href="/dashboard">Dashboard</Link>
                    </li> */}
                </ul>
            </nav>

        </div>
    );
};

export default Sidebar;
