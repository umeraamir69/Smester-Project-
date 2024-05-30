import React from 'react'
import { useRouter } from 'next/router';



const PlayerVideo = () => {
  const router = useRouter();
  return (

    <>
      <video className=' w-screen h-screen' controls preload="none">
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />

      Your browser does not support the video tag.
    </video>
    </> 

  )
}

export default PlayerVideo