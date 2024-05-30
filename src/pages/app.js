import React, { useContext } from 'react';
import Timeline from "../../components/Timeline";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import Leagues from "../../models/Leagues";
import Team from "../../models/Team";
import Channel from "../../models/Channel";
import Game from "../../models/Game";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GlobalContext } from '../../context/index';
import connectToDatabase from '../../middlewear/connectDb';

const App = (props)=> {
  const { isSidebarOpen } = useContext(GlobalContext);
  const [leagueData, setleagueData] = useState();
  const [teamData, setteamData] = useState();
  const [gameData, setgameData] = useState();
  const [chanelData, setchanelData] = useState();

  useEffect(() => {
    if(props.leaguedData != null){
      setleagueData(JSON.parse(props.leaguedData))
    }
    if(props.gameData != null){
      setgameData(JSON.parse(props.gameData))
    }
    if(props.channelData != null){
      setchanelData(JSON.parse(props.channelData))
    }
    if(props.teamData != null){
      setteamData(JSON.parse(props.teamData))
    }
  }, [props]);


  return (
    <Layout leagueData={leagueData} chanelData={chanelData}>
    <div className={`sm:flex justify-between overflow-x-hidden ${isSidebarOpen ? 'lg:pl-10' : ''}`}>
      

      <div className="sm:inline-flex flex justify-center rounded-lg shadow-sm">
        <button
          type="button"
          className="py-2 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 "
        >
          Upcoming
        </button>
        <button
          type="button"
          className="py-2 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 "
        >
          Past
        </button>
      </div>

      <div className="form relative mt-4 sm:mt-0">
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-700"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <input
          className="input rounded-full px-12 py-1.5 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
          placeholder="Search..."
          required=""
          type="text"
        />
        <button
          type="reset"
          className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>


    <Timeline gameData={gameData}/>
  </Layout>
  )
}

export default App;

export async function getServerSideProps(context) {
  connectToDatabase()
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session)
  if (!session) {
      return {
          redirect: {
              destination: '/auth/Login',
              permanent: false,
          },
      };
  } else {
        const leaguedData = await Leagues.find();
        const channelData =await Channel.find();
        const gameData = await Game.find().populate('teamOne teamTwo channel league');;
        const teamData = await Team.find();
          return {
              props: {
                  leaguedData: leaguedData.length > 0 ? JSON.stringify(leaguedData) : null,
                  channelData: channelData.length > 0 ? JSON.stringify(channelData) : null,
                  gameData: gameData.length > 0 ? JSON.stringify(gameData) : null,
                  teamData: teamData.length > 0 ? JSON.stringify(teamData) : null,
              },
          };
  }
}