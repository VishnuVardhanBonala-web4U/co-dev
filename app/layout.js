"use client"
import Navbar from './_components/Navbar/Navbar';
import Sidebar from './_components/Sidebar/Sidebar';
import 'regenerator-runtime/runtime';
import './globals.css';

import { useState } from 'react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar state
  };
  return (
    <html lang="en">
      <body>
        <div className="">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="">{children}</div>
          </div>

        </div>
      </body>
    </html>
  );
};

export default Layout;
