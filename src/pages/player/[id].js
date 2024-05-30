import React from 'react'
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player'

const Player = () => {
  const router = useRouter();
  return (


      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />

  )
}

export default Player