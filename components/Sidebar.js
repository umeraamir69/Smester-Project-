import React, { useContext, useState } from "react";
import { GlobalContext } from "../context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSchedule } from "react-icons/ai";
import { PiTelevisionBold } from "react-icons/pi";
import { MdOutlineMovieCreation } from "react-icons/md";
import { AiOutlineDiscord } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdOutlineCardMembership } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { MdOutlineContactSupport } from "react-icons/md";



const menuItems = [
  {
    id: "Schedule",
    label: "Schedule",
    path: "/schedule",
    icon: <AiOutlineSchedule size={25} />,
  },
  {
    id: "IPTV",
    label: "IPTV",
    path: "/IPTV",
    icon: <PiTelevisionBold size={25} />,
  },
  {
    id: "VOD",
    label: "VOD",
    path: "/VOD",
    icon: <MdOutlineMovieCreation size={25} />,
  },
  {
    id: "Discord",
    label: "Discord",
    path: "/Discord",
    icon: <AiOutlineDiscord size={25} />,
  },
];

export default function Sidebar({chanelData , leagueData , setfilter , filter}) {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);
  const pathName = usePathname();
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [isLeagueOpen, setIsLeagueOpen] = useState(false);

  const handleSetting = () => {
    setIsSettingOpen(!isSettingsOpen);
  };




  return (
    <>

    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen   w-64 flex-col overflow-y-hidden bg-black duration-100  ease-linear
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 pt-7">
        <Link href={"/"} className="text-2xl sm:text-[30px] bg-gradient-to-tr font-bold font-serif italic from-[#FF5F00] to-red-700 text-transparent bg-clip-text">
          StreamBTW
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear text-white">
        <div className="mt-5 py-4 px-4 lg:mt-5 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id} className="hover:bg-gray-400 rounded-lg">
                  <Link href={menuItem.path}

                    className={`group relative cursor-pointer flex items-center gap-2.5 gap-x-6 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark 
                             ${pathName.includes(menuItem.id) && "bg-graydark"}
                            `}
                  >
                    {menuItem.icon}
                    {menuItem.label}
                  </Link>
                </li>
              ))}
              <li className=" rounded-lg">
                <label
                  onClick={handleSetting}
                  className={`group relative cursor-pointer flex items-center gap-2.5 gap-x-6 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark`}
                >
                  <IoSettingsOutline size={23} />
                  <div>Settings</div>
                  {isSettingsOpen ? (
                    <BiChevronUp size={25} />
                  ) : (
                    <BiChevronDown size={25} />
                  )}
                </label>
                {isSettingsOpen && (
                  <div className="px-4 py-2 text-sm ">
                    {/* Additional content for Settings */}
                    <div className="flex flex-col gap-y-5 pl-5 pt-3">
                      <div className="flex gap-x-5">
                        <MdOutlineCardMembership size={25} />
                        <li>Home</li>
                      </div>
                      <div className="flex gap-x-5">
                        <ImProfile size={25} />
                        <li>Profile</li>
                      </div>
                      <div className="flex gap-x-5">
                        <MdOutlineContactSupport size={25} />
                        <li>Support</li>
                      </div>
                      <div className="">
                        <Link href="/membership" className="flex gap-x-5">
                        <MdOutlineContactSupport size={25} />
                        <li>Become Premium</li>
                        </Link>
                        
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <div className="mt-2">
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    marginBottom: "0px",
                    padding: "",
                  }}
                ></div>
              </div>
              <h1 className="px-4 text-xl font-semi-bold pt-3 pb-3">Leauges</h1>
              <li className=" rounded-lg">

  
                  <div className="py-2 text-sm ">
                    {/* Additional content for Settings */}
                    <div className="flex flex-col gap-y-4 pl-5 pt-3">
{filter&&  setfilter &&

                    <div  className="flex gap-x-5 text-white hover:cursor-pointer" onClick={() => setfilter()}>
                          <div className="flex flex-col justify-center">
                          <li>All Leagues</li>
                          </div>
                        </div>
}

                      {leagueData && leagueData.map((item) => (
                        <div onClick={()=>{setfilter(item.name)}} className="flex gap-x-5 text-white hover:cursor-pointer" key={item._id}>
                          <img
                            src={item.logoLink}
                            alt=""
                            className="w-8 h-8 rounded-full bg-white "
                          />
                          <div className="flex flex-col justify-center">
                          <li>{item.name}</li>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

              </li>
              <div className="mt-2">
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    marginBottom: "0px",
                    padding: "",
                  }}
                ></div>
              </div>
              <h1 className="px-4 text-xl font-semi-bold pt-3 pb-3">Channels</h1>
              <div className="flex flex-col gap-y-5 pl-5 pt-3">

                      {chanelData&& chanelData.map((item) => (
                        <div className="flex gap-x-5 text-white" key={item._id}>
                          <div className="flex flex-col justify-center">
                          <img
                            src={item.logoLink}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          </div>
                          <div className="flex flex-col justify-center">
                          <li>{item.name}</li>
                          </div>
                          
                        </div>
                      ))}
                    </div>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
