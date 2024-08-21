/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../../components/schema/Modal";
import VideosCards from "../../../components/cards/VideosCards";
import ahmed_amar from "../../../assets/thumbnail/ahmed_amar.jpg";
import eyad_elmogy from "../../../assets/thumbnail/eyad_elmogy.jpg";
import yahia_azzam from "../../../assets/thumbnail/yahia_azzam.jpg";
import marwan_serry from "../../../assets/thumbnail/marwan_serry.jpg";
import mohamed_abdelaty from "../../../assets/thumbnail/mohamed_abdelaty.jpg";
import ebrahim_hegazy from "../../../assets/thumbnail/mesh_ebrahim_hegazy.jpg";
import RootLayout from "../../../layout";
const ViewVideosPage = () => {
  const timerRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeWindow, setYoutubeWindow] = useState<Window | null>(null);

  const startTask = () => {
    console.log("Starting task...");

    const videoUrl = "https://youtu.be/4BGLxxELr8A?si=FzqiP3GkYQRi2NaN";
    const openedWindow = window.open(videoUrl, "_blank");
    setYoutubeWindow(openedWindow);

    if (!openedWindow) {
      console.warn("Failed to open YouTube window.");
      return;
    }

    setRemainingTime(15);

    // Monitor the window status
    const checkWindowStatus = () => {
      try {
        // Attempt to access a property of the window to check if it's closed
        const isClosed = openedWindow!.closed;

        // If the window is closed, handle completion
        if (isClosed) {
          handleTaskCompletion(openedWindow);
        } else {
          // If the window is still open, focus on it
          openedWindow!.focus();
        }
      } catch (error) {
        console.error("Error checking window status:", error);
      }
    };

    // Check window status every 2 seconds
    const statusCheckInterval = setInterval(checkWindowStatus, 2000);

    timerRef.current = window.setInterval(() => {
      setRemainingTime((prevTime) => {
        console.log("Remaining Time:", prevTime);

        if (prevTime === 0) {
          clearInterval(timerRef.current as number);
          clearInterval(statusCheckInterval); // Clear the status check interval
          handleTaskCompletion(openedWindow);
        }

        checkWindowStatus();
        return prevTime - 1;
      });
    }, 1000);

    setIsModalOpen(true);

    // Clear the status check interval when the modal is closed
    const clearStatusCheckInterval = () => {
      clearInterval(statusCheckInterval);
    };

    window.addEventListener("beforeunload", clearStatusCheckInterval);
    window.addEventListener("unload", clearStatusCheckInterval);
  };

  const isWindowClosed = (win: Window | null) => {
    return !win || win.closed;
  };

  const handleTaskCompletion = (openedWindow: Window | null) => {
    clearInterval(timerRef.current as number);

    if (isWindowClosed(openedWindow)) {
      console.warn("YouTube window closed unexpectedly.");
      toast.error("YouTube window closed unexpectedly. Task canceled.");
    } else {
      toast.success("Task completed!");
    }

    setIsModalOpen(false);
    setYoutubeWindow(null);
    setRemainingTime(0);
  };

  useEffect(() => {
    console.log("ViewVideosPage rendered.");

    return () => {
      console.log("ViewVideosPage unmounted.");
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleTaskCompletion(youtubeWindow);
    }
  }, [remainingTime]);

  useEffect(() => {
    console.log("Checking for existing task...");

    const taskInProgress = localStorage.getItem("taskInProgress");
    const remainingTime = localStorage.getItem("remainingTime");

    if (taskInProgress === "true" && remainingTime) {
      // Restore task state and remaining time
      setRemainingTime(parseInt(remainingTime));
      setIsModalOpen(true);

      // Restart the task
      timerRef.current = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          console.log("Remaining Time:", prevTime);

          if (prevTime === 0) {
            handleTaskCompletion(youtubeWindow);
          }

          return prevTime - 1;
        });
      }, 1000);
    }

    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      if (timerRef.current) {
        event.preventDefault();
        event.returnValue = "";
        console.warn(
          "Task still in progress. Please finish before leaving the page."
        );
        toast.error(
          "Task still in progress. Please finish before leaving the page."
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("taskInProgress");
      localStorage.removeItem("remainingTime");

      // Clear the interval when the component unmounts
      clearInterval(timerRef.current as number);
      // clearInterval(statusCheckInterval);
    };
  }, [youtubeWindow]);

  const handleVideoClick = () => {
    startTask();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <RootLayout>
    <main className="w-full h-full my-20 container">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4">
          View <span className="mark">Videos</span>
        </h2>
        {remainingTime > 0 && (
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <div className="text-black text-lg">
              Time remaining: {Math.floor(remainingTime / 60)}:
              {remainingTime % 60}s
            </div>
          </Modal>
        )}
      </div>
      <div className="w-full py-20">
        <div className="w-full flex flex-col items-center justify-end gap-y-5">
          <div className="flex flex-row gap-5">
            <VideosCards
              URL="player"
              img={ahmed_amar}
              title="وعي ٧۳ - سيدنا إبراهيم عليه السلام"
              money="3.30$"
              time="2.5m"
              onClick={handleVideoClick}
            />
            <VideosCards
              URL="player"
              img={eyad_elmogy}
              title="جت كده - اياد الموجي و هشام جمال"
              money="0.54$"
              time="50s"
              onClick={() => {
                handleVideoClick();
                setIsModalOpen(true);
              }}
            />
            <VideosCards
              URL="player"
              img={yahia_azzam}
              title="لما اشتغلت طيار ديليفري وكنت هروح في داهية"
              money="0.18$"
              time="30s"
              onClick={() => {
                handleVideoClick();
                setIsModalOpen(true);
              }}
            />
          </div>
          <div className="flex flex-row gap-5">
            <VideosCards
              URL="player"
              img={ebrahim_hegazy}
              title="لا يوجد جهاز آمن من الاختراق | مع ابراهيم حجازي"
              money="5$"
              time="5m"
              onClick={() => {
                handleVideoClick();
                setIsModalOpen(true);
              }}
            />
            <VideosCards
              URL="player"
              img={marwan_serry}
              title="اسئلة عبثية | الاسطي عبده البلف و اياد الموجي"
              money="2$"
              time="1.5m"
              onClick={() => {
                handleVideoClick();
                setIsModalOpen(true);
              }}
            />
            <VideosCards
              URL="player"
              img={mohamed_abdelaty}
              title="جت كده - مبقتش حمل مع كامل احترامي"
              money="1.30$"
              time="3m"
              onClick={() => {
                handleVideoClick();
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    </main>
    </RootLayout>
  );
};

export default ViewVideosPage;
