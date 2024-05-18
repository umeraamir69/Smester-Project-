import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { GlobalContext } from '../context';

const Layout = ({ children , leagueData , chanelData}) => {
  const { isSidebarOpen } = useContext(GlobalContext);

  return (
    <div className='flex h-screen overflow-x-hidden bg-[#191C24]'>
      
      <Sidebar leagueData={leagueData} chanelData={chanelData}/>
      <div className={`relative flex flex-1 flex-col overflow-y-auto ${isSidebarOpen ? 'lg:ml-56' : 'ml-0'}`}>
        <Navbar/>
        <main className=''>
          <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
