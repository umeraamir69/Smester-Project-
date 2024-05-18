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


const LeagueData = [
  {
    image: "./images/image1.png",
    name: "IPL",
  },
  {
    image: "./images/image1.png",
    name: "BPL",
  },
];
const menuItems = [
  {
    id: "Schedule",
    label: "Schedule",
    path: "/Schedule",
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

export default function Sidebar({chanelData , leagueData}) {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);
  const pathName = usePathname();
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [isLeagueOpen, setIsLeagueOpen] = useState(false);

  const handleSetting = () => {
    setIsSettingOpen(!isSettingsOpen);
  };
  const handleLeague = () => {
    setIsLeagueOpen(!isLeagueOpen);
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen   w-64 flex-col overflow-y-hidden bg-[#222831] duration-100  ease-linear
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 pt-4">
        <Link href={"/"} className="text-[30px] text-white">
          StreamBTW
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear text-white">
        <nav className="mt-5 py-4 px-4 lg:mt-5 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id} className="hover:bg-gray-400 rounded-lg">
                  <label
                    onClick={() => handleNavigate(menuItem)}
                    className={`group relative cursor-pointer flex items-center gap-2.5 gap-x-6 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark 
                             ${pathName.includes(menuItem.id) && "bg-graydark"}
                            `}
                  >
                    {menuItem.icon}
                    {menuItem.label}
                  </label>
                </li>
              ))}
              <li className=" rounded-lg">
                <label
                  onClick={handleSetting}
                  className={`group relative cursor-pointer flex items-center gap-2.5 gap-x-6 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark`}
                >
                  <IoSettingsOutline size={23} />
                  <p>Settings</p>
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
                      {leagueData && leagueData.map((item) => (
                        <div className="flex gap-x-5 text-white" key={item._id}>
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
                          <li className="text-[12px]">{item.isAllowFree ? "Free" : "Only for Premium Members"}</li>
                          </div>
                          
                        </div>
                      ))}
                    </div>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
