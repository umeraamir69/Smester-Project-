import React from 'react'

const Card = (props) => {
  const { icon: Icon, val, desc } = props;

  return (
    
      <div className=" rounded-[25px] bg-white p-4 px-6 aspect mx-1 w-[200px]">
        <Icon className="w-8 h-8" />
        <div className="my-2">
          <h2 className="text-4xl font-bold"><span>{val}</span></h2>
        </div>
        <div>
          <p className="mt-2 font-sans text-base font-medium text-gray-500">{desc}</p>
        </div>
      </div>

  )
}

export default Card
