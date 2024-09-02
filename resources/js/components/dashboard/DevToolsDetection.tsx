import React, { useEffect, useState } from 'react';
import devtools from 'devtools-detect';
import axios from 'axios';
import { route } from 'ziggy-js';
import toast from 'react-hot-toast';
const DevToolsListener: React.FC = () => {
  const [prevInnerHeight, setPrevInnerHeight] = useState(window.innerHeight);
  const [prevInnerWidth, setPrevInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) ||
        (event.metaKey && event.altKey && event.key === 'I')
      ) {
        event.preventDefault();
        toast.error('Developer tools are disabled.',{
            position: 'top-right',
            duration: 5000,
        });
        CliBan('Developer tools are disabled.');
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      toast.error('Right-click is disabled.',{
        position: 'top-right',
        duration: 5000,
    });
    CliBan('Right-click is disabled.');
    };

    const handleResize = (event: Event) => {
      if (window.innerHeight !== prevInnerHeight || window.innerWidth !== prevInnerWidth) {
        event.preventDefault();
        toast.error('Please do not open developer tools.',{
            position: 'top-right',
            duration: 5000,
        });
        CliBan('Please do not open developer tools.');
      }
      setPrevInnerHeight(window.innerHeight);
      setPrevInnerWidth(window.innerWidth);
    };

    const checkDevTools = () => {
        const start = performance.now();
        debugger;
        const timeTaken = performance.now() - start;
        
        if (timeTaken > 5) {
            toast.error('Developer tools are open!',{
                position: 'top-right',
                duration: 5000,
            });
            CliBan('Developer tools are open!');
        }
    };
    const CliBan = (cause:string) => {
        axios.post(route('client.dashboard.cli-ban'), {
            cause: cause,
        });
        // window.location.reload();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('resize', handleResize);
    const interval = setInterval(checkDevTools, 1000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [prevInnerHeight, prevInnerWidth]);

  return null;
};

export default DevToolsListener;
