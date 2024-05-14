import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { CiHome } from "react-icons/ci";
import 'react-vertical-timeline-component/style.min.css';

const Timeline = ({ isDarkMode }) => {
  // Sample timeline data
  const timelineData = [
    {
      time: "12:00 am",
      title: "PSG vs Borssia Dortmund",
      league: "Champion League",
      description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
      logo:"./images/image1.png",
      image:"./images/image1.png",
    },
    {
      time: "12:00 am",
      title: "PSG vs Borssia Dortmund",
      league: "Champion League",
      description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
      logo:"./images/image1.png",
      image:"",
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
    <div className="  pt-20 text-white">
      {/* Horizontal line above timeline start */}
      <div className=' px-2 md:px-3 lg:px-5 xl:px-10'>
      <div style={{ borderTop: '2px solid #ccc', marginBottom: '0px' , padding:''}}></div>
      </div>
     
      
      <VerticalTimeline layout="1-column-left">
        {timelineData.map((item, index) => (
            <div key={index}>
            <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work "
            date={item.date}
            iconStyle={{ background: "none", color: 'black', fontSize: '16px', borderColor: 'none'  , border:"none"}} // Removed default border
            icon={<img src={item.logo} alt="Timeline" style={{ borderRadius: '50%', width: '40px', height: '40px' , border:"none" }}  />}
            layout="1-column-right"
            contentStyle={{ background: "#222831", maxHeight: accordionOpen[index] ? 'none' : '50px', boxShadow: '0 3px 0 white' }}
            contentArrowStyle={{borderRight: "7px solid #222831"}} // Adjusted height
            style={{ marginBottom: '10px', marginTop: '5px' }} // Adjusted margin for spacing
          >
            <div className="flex items-center justify-between">
              <div className='flex'>
                <h3 className="vertical-timeline-element-title">{item.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
              </div>
              <button onClick={() => toggleAccordion(index)}>
                {accordionOpen[index] ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
            {accordionOpen[index] && (
                <div className='flex justify-end'>
                    <p>{item.description}</p>
                </div>
              
            )}
          </VerticalTimelineElement>
            </div>
          
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;