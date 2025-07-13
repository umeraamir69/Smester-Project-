import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import 'react-vertical-timeline-component/style.min.css';
import Link from 'next/link';
const Timeline = ({ gameData }) => {
  // Sample timeline data

  console.log(gameData)
  const timelineData = [
    {
      time: "12:00 am",
      title: "PSG vs Borssia Dortmund",
      league: "Champion League",
      description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
      logo: "./images/image1.png",
      image: "./images/image1.png",
    },
    {
      time: "12:00 am",
      title: "PSG vs Borssia Dortmund",
      league: "Champion League",
      description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
      logo: "./images/image1.png",
      image: "",
    },
  ];

  // State to manage accordion open/close state for each timeline item
  const [accordionOpen, setAccordionOpen] = useState(new Array(timelineData.length).fill(false));

  // Function to toggle accordion open/close state for a specific index
  const toggleAccordion = (index) => {
    const newAccordionOpen = [...accordionOpen];
    newAccordionOpen[index] = !newAccordionOpen[index];
    setAccordionOpen(newAccordionOpen);
  };

  return (
    <div className="pt-10 md:pt-20 text-white">
      {/* Horizontal line above timeline start */}
      <div className='px-2 md:px-3 lg:px-5 xl:px-10'>
        <div style={{ borderTop: '3px solid white', marginBottom: '0px' }}></div>
      </div>

      <VerticalTimeline layout="1-column-left" lineColor="white" lineStyle={{ width: '20px' }} >
        {gameData && gameData.map((item, index) => (
          <div key={index} >
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date=""
              iconStyle={{ background: "none", color: 'black', fontSize: '16px', borderColor: 'none', border: "none" }} // Removed default border
              icon={<img className="bg-white" src={item.teamOne.logoLink} alt="Timeline" style={{ borderRadius: '50%', width: '40px', height: '40px', border: "none" }} />}
              layout="1-column-right"
              contentStyle={{ background: "#1E1E2C", minHeight: accordionOpen[index] ? 'none' : '60px', boxShadow: '0 3px 0 white' }}
              contentArrowStyle={{ borderRight: "7px solid #1E1E2C" }} // Adjusted height
              style={{ marginBottom: '10px', marginTop: '5px' }} // Adjusted margin for spacing
            >
              { index === 2 ? (
                <div>
                  <div className='grid  md:grid-cols-2'>
                    <div className='flex flex-col justify-center'>
                      <div className='space-y-1'>
                      <h3 className="vertical-timeline-element-title text-sm">{item.teamOne.name}  vs  {item.teamTwo.name}</h3>
                      <h4 className="vertical-timeline-element-subtitle ">{item.venue}</h4>
                      <h4 className="vertical-timeline-element-subtitle ">{item.league.name}</h4>
                      <div className='flex gap-x-4 justify-start'>
                      {item.channel.map((channel, i) => (
                        <div key={i} className='flex'>
                          
                        <Link href={"/player/" + channel._id}> <p  className=' bg-black text-gray-400 px-6 py-0.5 rounded-full'>{channel.name}</p></Link> 
                        </div>
  
                       
                      ))}
                    </div>
                      </div>
                    </div>
                    <div className='flex md:justify-end justify-center'>
                      <img src="./images/banner.jpg" alt=""  className='w-[400px] h-[200px] rounded-lg'/>
                    </div>
                  </div>

                </div>
              ) :
                <div 
                onClick={() => toggleAccordion(index)} clas>
                <div className="grid grid-cols-4 sm:grid-cols-10 hover:cursor-pointer "  >
                  <div className='sm:grid sm:col-span-9 sm:grid-cols-6 col-span-3'>
                  <div className='sm:flex flex-col justify-center sm:col-span-3'>
                    <h3 className="vertical-timeline-element-title text-sm">{item.teamOne.name}  vs  {item.teamTwo.name}</h3>
                  </div>
                  <div className='flex flex-col justify-center'>
                  <h4 className="vertical-timeline-element-subtitle ">  {item.league.name}</h4>
                  </div>
                  <div className='-mt-4 col-span-2'>
                  <p>{item.matchDate.substring(0, 19).replace('T', ' ')}</p>
                
                  </div>
                  
                  </div>
                  
                  <div className='sm:flex justify-end hidden'>
                  <button>
                    {accordionOpen[index] ? <AiOutlineUp /> : <AiOutlineDown />}
                  </button>
                  </div>
                  <div className='flex justify-end sm:hidden'>
                  <button>
                    {accordionOpen[index] ? <AiOutlineUp /> : <AiOutlineDown />}
                  </button>
                  </div>
                </div>
                {accordionOpen[index] && (
                    <div className='flex gap-x-4 justify-end'>
                      {item.channel.map((channel, i) => (
                        <div key={i} className='flex'>
                           <Link href={"/player" + channel._id}><p  className=' bg-black text-gray-400 px-5 py-1.5 rounded-full'>{channel.name}</p></Link>
                        </div>
  
                       
                      ))}
                    </div>
                  )}
                </div>
              }
              
              
              
            </VerticalTimelineElement>
          </div>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;