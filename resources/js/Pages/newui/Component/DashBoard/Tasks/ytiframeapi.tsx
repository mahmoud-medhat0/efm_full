import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { route } from "ziggy-js";
import { toast } from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import DevToolsListener from "./DevToolsDetection";
const YouTubePlayer: React.FC<{
    videoId: string;
    taskId: string;
    order: any;
    onTaskCompleted: () => void;
}> = ({ videoId, taskId, order, onTaskCompleted }) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaQuestion, setCaptchaQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const updateTask = async (taskId: string, status: string) => {
        await axios.post(route("client.dashboard.tasks.update"), {
            taskId: taskId,
            status: status,
        });
    };
    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => {
            if (playerRef.current) {
                new YT.Player(playerRef.current, {
                    videoId: videoId,
                    playerVars: {
                        start:
                            order.order_type === "custom_time"
                                ? order.time_start
                                : 0, // Start time in seconds
                        end:
                            order.order_type === "custom_time"
                                ? order.time_end
                                : 0, // End time in seconds
                        autoplay: 0,
                        controls: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        rel: 0,
                        fs: 0,
                        iv_load_policy: 3,
                        disablekb: 1,
                        disableRelatedVideos: 1,
                        allowfullscreen: 1,
                    },
                    events: {
                        onReady: onPlayerReady,
                        onError: onPlayerError,
                        // onFinish: onPlayerFinish,
                        onStateChange: async (event: YT.OnStateChangeEvent) => {
                            if (event.data === YT.PlayerState.PAUSED) {
                                event.target.playVideo();
                                updateTask(taskId, "in_progress");
                            }
                            if (event.data === YT.PlayerState.PLAYING) {
                                updateTask(taskId, "in_progress");
                                updateProgress();
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
            console.log("Player Ready");
            event.target.playVideo();
            removeWatermark();
        };

        const onPlayerError = (event: YT.OnErrorEvent) => {
            toast.error;
            console.error("Error Occurred:", event.data);
        };

        const onPlayerFinish = async () => {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            setCorrectAnswer(num1 + num2);
            setCaptchaQuestion(`${num1} + ${num2}`);
            setShowCaptcha(true);
        };

        const updateProgress = () => {
            const duration = order.order_type === 'custom_time' ? order.time_end - order.time_start : (JSON.parse(order.data).minutes*60);
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    setShowCaptcha(true);
                } else {
                    width++;
                    setProgress(width);
                }
            }, duration * 10); // Adjust the interval timing as needed
        };

        const removeWatermark = () => {
            const watermarkElement = document.querySelector(
                "#movie_player > a.ytp-watermark.yt-uix-sessionlink"
            );
            if (watermarkElement) {
                watermarkElement.remove();
            }
            const watermarkElements = document
                ? document.querySelectorAll(
                      ".ytp-watermark, .yt-uix-sessionlink"
                  )
                : [];
            watermarkElements.forEach((element) => {
                element.remove();
            });
            const watermarkElements2 = document.querySelectorAll(
                ".ytp-watermark .yt-uix-sessionlink"
            );
            watermarkElements2.forEach((element) => {
                element.remove();
            });
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                toast.error("task cancelled", {
                    position: "top-right",
                    duration: 2000,
                });
                setTimeout(() => {
                    Inertia.reload();
                }, 2000);
                onTaskCompleted();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            // Clean up the event listener
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            delete (window as any).onYouTubeIframeAPIReady;
        };
    }, [videoId]);
    const handleCaptchaSubmit = async () => {
        if (parseInt(userAnswer) === correctAnswer) {
            await updateTask(taskId, "completed");
            toast.success("Task Completed Thanks For Watching", {
                position: "top-right",
                duration: 5000,
            });
            onTaskCompleted();
            Inertia.reload();
        } else {
            toast.error("Incorrect answer. Please try again.", {
                position: "top-right",
                duration: 5000,
            });
        }
    };

    return (
        <>
            {/* <DevToolsListener /> */}
            <div
                style={{ height: "78%" }}
                className="w-full mt-4"
                ref={playerRef}
            ></div>
            <div className="w-full h-[20px] bg-gray-300 rounded-full mt-4 relative">
                <div
                    className="h-[20px] bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                >
                    <span className="absolute right-0 text-xs text-black pr-2">
                        {progress}%
                    </span>
                </div>
            </div>
            {showCaptcha && (
                <div className="mt-4 flex items-center justify-center bg-white shadow-md rounded-lg p-4">
                    <p className="text-sm mr-2 flex items-center text-wrap">
                        Solve this:{" "}
                        <span className="text-blue-600 ml-1">
                            {captchaQuestion}
                        </span>
                    </p>
                    <input
                        style={{width: "70%"}}
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                        placeholder="Your answer"
                    />
                    <button
                        onClick={handleCaptchaSubmit}
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            )}
        </>
    );
};

export default YouTubePlayer;
