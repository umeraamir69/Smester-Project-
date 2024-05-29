import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Clappr from 'clappr';

export default function Player() {
  const router = useRouter();
  const playerRef = useRef(null);

  useEffect(() => {
    if (router.query.id && playerRef.current) {
      // Construct your video link using the id from router.query.id
      const videoLink = "https://media.istockphoto.com/id/1413207061/video/road-traffic-in-delhi-roads.mp4?s=mp4-640x640-is&k=20&c=KnGos4ZVgHxZSV-zGAJk0mWsjR2kLGumoVcKI-PanEw="
      
      // Destroy the previous player instance if it exists
      if (playerRef.current.player) {
        playerRef.current.player.destroy();
      }

      // Initialize Clappr player
      playerRef.current.player = new Clappr.Player({
        source: videoLink,
        parentId: '#player-container',
        width: '100%',
        height: '100%',
      });
    }
  }, [router.query.id]);

  return (
    <div>
      <p>Post: {router.query.id}</p>
      <div id="player-container" ref={playerRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}
