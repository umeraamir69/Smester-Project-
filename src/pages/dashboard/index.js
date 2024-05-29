import React from 'react'
import { useState } from 'react'
import Navbar from '../../../components/dashboard/Navbar'
import Channel from '../../../models/Channel'
import Contact from '../../../models/Contact'
import Game from '../../../models/Game'
import Leagues from '../../../models/Leagues'
import { authOptions } from '../api/auth/[...nextauth]'
import { GiTeamIdea } from "react-icons/gi";
import { getServerSession } from 'next-auth'
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

    <div className='bg-[#191C24] min-h-screen overflow-x-hidden'><Navbar sidebar={sidebar} setsidebar={setsidebar}/>
    <section  className={` p-3 sm:p-5  ${sidebar == false ? "ml-0" : "lg:ml-48"}`}>

    <div className='sm:mx-10 flex flex-row flex-wrap gap-x-5 gap-y-5 p-5  justify-center items-center'>
      {props.userLength && <Link href="/dashboard/users"><Card val={props.userLength} desc=" Total Users" icon={BiUser} /> </Link>}
      {props.packageLength && <Link href="/dashboard/Packages"><Card val={props.packageLength} desc="Total Packages" icon={LuPackage} /> </Link>}
      {props.chanelLength &&<Link href="/dashboard/Channels"> <Card val={props.chanelLength} desc="Total Channels" icon={GrChannel} /> </Link>}
      {props.gameLength && <Link href="/dashboard/Games"><Card val={props.gameLength} desc="Total Games" icon={IoGameControllerOutline} /> </Link>}
      {props.leagueLength && <Link href="/dashboard/Leagues"><Card val={props.leagueLength} desc="Total Leagues" icon={SiIndiansuperleague} /> </Link>}
      {props.queryLength && <Link href="/dashboard/Query"><Card val={props.queryLength} desc="Total Queries" icon={FaUserClock} /> </Link>}
      {props.teamLength && <Link href="/dashboard/Teams"><Card val={props.teamLength} desc="Total Teams" icon={GiTeamIdea} /> </Link>}
    </div>


<div className='flex flex-wrap items-center justify-center p-5 my-3 gap-x-10 gap-y-16'>
    {props &&
      <div className='w-72'>
        <PieChart 
          data={[
            { type: 'Total Channels', value: props.chanelLength, color: '#62B170' },
            { type: 'Live Channels', value: props.liveChanel, color: '#4BA2DA' },
          ]}
        />
      </div>
    }

    {props &&
      <div className='w-72'>
        <PieChart 
          data={[
            { type: 'Total Packages', value: props.packageLength, color: '#62B170' },
            { type: 'Disabled Packages', value: props.disabledPackages, color: '#4BA2DA' },
            { type: 'Archived Packages', value: props.archivedPackages, color: '#E97D30' },
            { type: 'Active Packages', value: props.packageLength-(props.archivedPackages +props.disabledPackages) , color: '#0f7D30' },
          ]}
        />
      </div>
    }
  
    {props &&
      <div className='w-72'>
        <PieChart 
          data={[
            { type: 'Active User', value: props.activeUser, color: '#E97D30' },
            { type: 'Expired User', value: props.expiredUser, color: '#E81239' },
            { type: 'Pending User', value: props.pendingUser, color: '#62B170' },
           
          ]}
        />
      </div>
    }





    {props.userTbl && <div className="flex flex-col justify-center items-center h-[100vh]">
            <div
                className="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none"
            >
                <div
                className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none"
                >
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                    Top Creators
                </h4>
                <button
                    className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
                >
                    See all
                </button>
                </div>
                <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden bg-gray-900  p-5">
                <table className="w-full  overflow-x-scroll ">
                    <thead>
                    <tr role="row">
                        <th
                        colSpan="1"
                        role="columnheader"
                        title="Toggle SortBy"

                        >
                        <div
                            className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Name
                        </div>
                        </th>
                        <th
                        colSpan="1"
                        role="columnheader"
                        title="Toggle SortBy"

                        >
                        <div
                            className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Date Join
                        </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup" className="px-4">

                    {JSON.parse(props.userTbl).slice(-5).map((user => (
                         <tr role="row" key={user._id}>
                         <td className="py-3 text-sm" role="cell">
                         <div className="flex items-center gap-2">

                             <p
                             className="text-sm font-medium text-navy-700 text-white"
                             >
                             {user.name}
                             </p>
                         </div>
                         </td>
                         <td className="py-3 text-sm" role="cell">
                         <p className="text-md font-medium text-gray-600 text-white">
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
      if (session.user.email == 'admin'  && session.user.name =="_admin" ) {
        const channelData = await Channel.find();
        const contactData = await Contact.find();
        const gameData = await Game.find();
        const leaguedData = await Leagues.length;
        const teamData = await Team.find.length;
        


        const packagesRequest = await fetch(`${process.env.URL}/api/products?_key=${process.env.API}`,{
          method : 'GET',
          headers: {
            'Content-Type': 'application/json',
        },
        })
        const packagesData = await packagesRequest.json();



        const request = await fetch(`${process.env.URL}/api/users?_key=${process.env.API}`,{
          method : 'GET',
          headers: {
            'Content-Type': 'application/json',
        },
        })

        const userData = await request.json()

        const filter = (data , key) => {
          const filteredPackages = Object.values(data).filter(item => {
              return item.status? item.status == key : 0 ;
          });
          return filteredPackages;
      }
        const filteris_disabled = () => {
          const filteredPackages = Object.values(packagesData).filter(item => {
              return  item.is_disabled == 1 ;
          });
          return filteredPackages;
        }
        const filteris_archived = () => {
          const filteredPackages = Object.values(packagesData).filter(item => {
              return  item.is_archived == 1 ;
          });
          return filteredPackages;
        }
        
          return {
              props: {
                  chanelLength: channelData.length,
                  liveChanel : channelData.filter(channel => channel.isLive == true).length,


                  queryLength : contactData.length,
                  solvedquery : contactData.filter(data => data.solved == true).length,


                  gameLength : gameData.length,
                  liveGame : gameData.filter(data => data.isLive == true).length,

                  leagueLength : leaguedData,
                  teamLength : teamData,

                  packageLength : packagesData._total,
                  disabledPackages : filteris_disabled().length,
                  archivedPackages : filteris_archived().length,

                  userLength : userData._total,
                  pendingUser : filter(userData , 0).length,
                  activeUser : filter(userData , 1).length,
                  expiredUser : filter(userData , 2).length,
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