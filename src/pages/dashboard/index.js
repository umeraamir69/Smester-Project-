import React from 'react'
import { useState } from 'react'
import Navbar from '../../../components/dashboard/Navbar'
import User from '../../../models/User'
import Channel from '../../../models/Channel'
import Contact from '../../../models/Contact'
import Game from '../../../models/Game'
import Leagues from '../../../models/Leagues'
import { authOptions } from '../api/auth/[...nextauth]'
import { GiTeamIdea } from "react-icons/gi";
import { getServerSession } from 'next-auth'
import Package from '../../../models/Package'
import Link from 'next/link'
import Team from '../../../models/Team'
import { FaUserClock } from "react-icons/fa6";
import Card from '../../../components/dashboard/Card'
import { LuPackage } from "react-icons/lu";
import { GrChannel } from "react-icons/gr";
import { BiUser } from 'react-icons/bi'
import { IoGameControllerOutline } from "react-icons/io5";
import { SiIndiansuperleague } from "react-icons/si";
import PieChart from '../../../components/dashboard/PieChart'



const Index = (props) => {
  const [sidebar, setsidebar] = useState(false);

  return (
    <div className='bg-[#191C24] min-h-screen'><Navbar sidebar={sidebar} setsidebar={setsidebar}/>
    <section  className={` p-3 sm:p-5  ${sidebar == false ? "ml-0" : "lg:ml-48"}`}>

    <div className='mx-10 flex flex-row flex-wrap space-x-5 bg-slate-900 p-5  justify-center items-center'>
      {props.userLength && <Link href="/dashboard/users"><Card val={props.userLength} desc=" Total Users" icon={BiUser} /> </Link>}
      {props.packageLength && <Link href="/dashboard/Packages"><Card val={props.packageLength} desc="Total Packages" icon={LuPackage} /> </Link>}
      {props.chanelLength &&<Link href="/dashboard/Channels"> <Card val={props.chanelLength} desc="Total Channels" icon={GrChannel} /> </Link>}
      {props.gameLength && <Link href="/dashboard/Games"><Card val={props.gameLength} desc="Total Games" icon={IoGameControllerOutline} /> </Link>}
      {props.leagueLength && <Link href="/dashboard/Leagues"><Card val={props.leagueLength} desc="Total Leagues" icon={SiIndiansuperleague} /> </Link>}
      {props.queryLength && <Link href="/dashboard/Query"><Card val={props.queryLength} desc="Total Queries" icon={FaUserClock} /> </Link>}
      {props.teamLength && <Link href="/dashboard/Teams"><Card val={props.teamLength} desc="Total Teams" icon={GiTeamIdea} /> </Link>}
    </div>


<div className='flex items-center justify-center p-5 my-3 space-x-10'>
    {props &&
      <div className='w-72'>
        <PieChart 
          data={[
            { type: 'Free Channels', value: props.freeChanel, color: '#62B170' },
            { type: 'Live Channels', value: props.liveChanel, color: '#4BA2DA' },
          ]}
        />
      </div>
    }

   

   

    {props &&
      <div className='w-72'>
        <PieChart 
          data={[
            { type: 'Premium User', value: props.premiumUser, color: '#E97D30' },
            { type: 'Standard User', value: props.userLength - props.premiumUser, color: '#E97D30' },
            { type: 'Super User', value: props.superUser, color: '#62B170' },
            { type: 'Google User', value: props.googleUser, color: '#62B170' },
          ]}
        />
      </div>
    }





    {props.userTbl && <div class="flex flex-col justify-center items-center h-[100vh]">
            <div
                class="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none"
            >
                <div
                class="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none"
                >
                <h4 class="text-lg font-bold text-navy-700 dark:text-white">
                    Top Creators
                </h4>
                <button
                    class="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
                >
                    See all
                </button>
                </div>
                <div class="w-full overflow-x-scroll px-4 md:overflow-x-hidden bg-gray-900  p-5">
                <table class="w-full  overflow-x-scroll ">
                    <thead>
                    <tr role="row">
                        <th
                        colspan="1"
                        role="columnheader"
                        title="Toggle SortBy"

                        >
                        <div
                            class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Name
                        </div>
                        </th>
                        <th
                        colspan="1"
                        role="columnheader"
                        title="Toggle SortBy"

                        >
                        <div
                            class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Date Join
                        </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup" class="px-4">

                    {JSON.parse(props.userTbl).slice(-5).map((user => (
                         <tr role="row" key={user._id}>
                         <td class="py-3 text-sm" role="cell">
                         <div class="flex items-center gap-2">

                             <p
                             class="text-sm font-medium text-navy-700 text-white"
                             >
                             {user.name}
                             </p>
                         </div>
                         </td>
                         <td class="py-3 text-sm" role="cell">
                         <p class="text-md font-medium text-gray-600 text-white">
                         {user.createdAt.substring(0,10)}
                         </p>
                         </td>
                     </tr>
                    )))}

                   
                 
                    </tbody>
                </table>
                </div>
            </div>
        </div>}
        </div>
</section>      
    </div>
  ) 
}

export default Index



export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
      return {
          redirect: {
              destination: '/auth/Login',
              permanent: false,
          },
      };
  } else {
      const user = await User.findOne({ "email": session.user.email });
      if (user && user.isSuperUser) {
        const channelData = await Channel.find();
        const contactData = await Contact.find();
        const gameData = await Game.find();
        const packagesData = await Package.find();
        const userData = await User.find().select('-password');;
        const leaguedData = await Leagues.length;
        const teamData = await Team.find.length;
          return {
              props: {
                  chanelLength: channelData.length,
                  freeChanel : channelData.filter(channel => channel.isAllowFree == true).length,
                  liveChanel : channelData.filter(channel => channel.isLive == true).length,
                  queryLength : contactData.length,
                  solvedquery : contactData.filter(data => data.solved == true).length,
                  gameLength : gameData.length,
                  liveGame : gameData.filter(data => data.isLive == true).length,
                  leagueLength : leaguedData,
                  teamLength : teamData,
                  packageLength : packagesData.length,
                  activePackage : packagesData.filter(data => data.active == true).length,
                  userLength : userData.length,
                  premiumUser : userData.filter(data => data.userType == "premium").length,
                  superUser : userData.filter(data => data.isSuperUser == true).length,
                  googleUser : userData.filter(data => data.password ).length,
                  userTbl : JSON.stringify(userData),
              },
          };
      }
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      };
  }
}