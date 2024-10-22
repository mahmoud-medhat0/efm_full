import React, { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import { route } from 'ziggy-js';
import { toast } from 'react-hot-toast';
import Inertia from '@inertiajs/inertia-react';
const YouTubePlayer: React.FC<{ videoId: string , taskId: string, order: any, }> = ({ videoId , taskId, order }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const updateTask = (taskId: string,status: string) => {
    axios.post(route('client.dashboard.tasks.update'), {
      taskId: taskId,
      status: status,
    });
  };
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        new YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            start: order.order_type === 'custom_time' ? order.time_start : 0, // Start time in seconds
            end: order.order_type === 'custom_time' ? order.time_end : 0,   // End time in seconds
            autoplay: 0,
            // controls: 0,
            showinfo: 0,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            iv_load_policy: 3,
            disablekb: 1,
            disableRelatedVideos: 1,
          },
          events: {
            onReady: onPlayerReady,
            onError: onPlayerError,
            onFinish: onPlayerFinish,
            onStateChange: (event: YT.OnStateChangeEvent) => {
              if (event.data === YT.PlayerState.PAUSED) {
                event.target.playVideo();
                updateTask(taskId,'in_progress');
              }
              if (event.data === YT.PlayerState.ENDED) {
                onPlayerFinish();
              }
            },
          },
        });
      }
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
      console.log('Player Ready');
      event.target.playVideo();
      removeWatermark();
    };

    const onPlayerError = (event: YT.OnErrorEvent) => {
      console.error('Error Occurred:', event.data);
    };

    const onPlayerFinish = () => {
      toast.success('Task Completed Thanks For Watching',{
        position: 'top-right',
        duration: 5000,
      });
      updateTask(taskId,'completed');
      Inertia.reload();
    };

    const removeWatermark = () => {
      const watermarkElement = document.querySelector("#movie_player > a.ytp-watermark.yt-uix-sessionlink");
      if (watermarkElement) {
        watermarkElement.remove();
      }
      const watermarkElements = document ? document.querySelectorAll('.ytp-watermark, .yt-uix-sessionlink') : [];
      watermarkElements.forEach(element => {
        element.remove();
      });
      const watermarkElements2 = document.querySelectorAll('.ytp-watermark .yt-uix-sessionlink');
      watermarkElements2.forEach(element => {
        element.remove();
      });
    };


    return () => {
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  return (
    <div className="w-full h-[500px] mt-4" ref={playerRef}></div>
  );
};

export default YouTubePlayer;
