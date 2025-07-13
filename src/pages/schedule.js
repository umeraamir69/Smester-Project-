import React, { useEffect, useState } from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Game from "../../models/Game";
import connectToDatabase from '../../middlewear/connectDb';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Packages from './dashboard/Packages';

const Schedule = (props) => {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    if (props.gameData != null) {
      const parsedData = JSON.parse(props.gameData);
      const today = new Date();
      const upcomingGames = parsedData.filter(game => new Date(game.date) >= today);
      setGameData(upcomingGames);
    }
  }, [props]);

  return (
<div className='bg-gray-900 h-screen'>
<Navbar/>
    <div className=" mt-10 mx-10">
      <h2 className="text-2xl font-semibold text-center mb-6  text-white">Upcoming Matches</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Team One</th>
              <th className="py-2 px-4">Team Two</th>
              <th className="py-2 px-4">Channel</th>
              <th className="py-2 px-4">League</th>
              <th className="py-2 px-4">Venue</th>
            </tr>
          </thead>
          <tbody>
            {gameData.length > 0 ? gameData.map((game, index) => (
              <tr key={game._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4">{new Date(game.date).toLocaleString()}</td>
                <td className="py-2 px-4 flex items-center">
                  <img src={game.teamOne.logoLink} alt={game.teamOne.name} className="w-8 h-8 mr-2"/>
                  {game.teamOne.name}
                </td>
                <td className="py-2 px-4 flex items-center">
                  <img src={game.teamTwo.logoLink} alt={game.teamTwo.name} className="w-8 h-8 mr-2"/>
                  {game.teamTwo.name}
                </td>
                <td className="py-2 px-4">{game.channel.name}</td>
                <td className="py-2 px-4">{game.league.name}</td>
                <td className="py-2 px-4">{game.venue}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 text-center">No upcoming matches</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>



            </div>
  );
}

export default Schedule;

export async function getServerSideProps(context) {
  await connectToDatabase();
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/Login',
        permanent: false,
      },
    };
  } else {
    const gameData = await Game.find().populate('teamOne teamTwo channel league');
    return {
      props: {
        gameData: gameData.length > 0 ? JSON.stringify(gameData) : null,
      },
    };
  }
}
