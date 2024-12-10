import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { route } from "ziggy-js";
import { toast } from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import DevToolsListener from "./DevToolsDetection";
const YouTubePlayer = ({ videoId, taskId, order, onTaskCompleted }) => {
    const playerRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaQuestion, setCaptchaQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [isPlayerHidden, setIsPlayerHidden] = useState(false);

    const updateTask = async (taskId: string, status: string) => {
        try {
            await axios.post(route("client.dashboard.tasks.update"), {
                taskId: taskId,
                status: status,
            });
        } catch (error) {
            console.error("Failed to update task:", error);
            toast.error("Failed to update task status. Please try again.");
        }
    };

    const onPlayerFinish = () => {
        onTaskCompleted();
        updateTask(taskId, "completed");
    };

    const onPlayerError = (event: YT.OnErrorEvent) => {
        console.error("YouTube Player Error:", event.data);
        toast.error("An error occurred with the YouTube player.");
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
        event.target.playVideo();
    };

    const updateProgress = () => {
        // Logic to update progress
    };

    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => {
            if (!isPlayerHidden && playerRef.current) {
                new YT.Player(playerRef.current, {
                    videoId: videoId,
                    playerVars: {
                        start:
                            order.order_type === "custom_time"
                                ? order.time_start
                                : 0,
                        end:
                            order.order_type === "custom_time"
                                ? order.time_end
                                : 0,
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
                        onStateChange: async (event: YT.OnStateChangeEvent) => {
                            if (event.data === YT.PlayerState.PAUSED) {
                                event.target.playVideo();
                            }
                            if (event.data === YT.PlayerState.PLAYING) {
                                await updateTask(taskId, "in_progress");
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
    }, [videoId, taskId, order]);
    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => {
            if (!isPlayerHidden && playerRef.current) {
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
                            }
                            if (event.data === YT.PlayerState.PLAYING) {
                                await updateTask(taskId, "in_progress");
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
            event.target.playVideo();
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
            const duration =
                order.order_type === "custom_time"
                    ? order.time_end - order.time_start
                    : JSON.parse(order.data).minutes * 60;
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

        const handleVisibilityChange = async () => {
            if (document.visibilityState === "hidden") {
                console.log("hidden");
                setIsPlayerHidden(true);
                await updateTask(taskId, "failed");
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
            <center>
                <span className="text-center text-2xl font-bold">
                    NOT ALLOWED TO MOVE OR CLOSE THE WINDOW UNTIL THE TASK IS
                    COMPLETED
                </span>
            </center>
            {/* <DevToolsListener /> */}
            {!isPlayerHidden  && (
                <div
                    style={{ height: "78%" }}
                    className="w-full mt-4"
                    ref={playerRef}
                ></div>
            )}
            {isPlayerHidden && (
                <div
                    style={{ height: "78%" }}
                    className="w-full mt-4"
                    id="player-hidden"
                >
                    <center>
                        <img
                            src="https://www.freeiconspng.com/uploads/shiny-metal-red-error-image-designs-1.png"
                            width="350"
                        />
                        <span className="text-2xl font-bold">
                            KINDLY RELOAD THE PAGE AND CLICK AGAIN ON 'VIEW
                            TASK'
                            <br /> IF YOU FOUND IT 😅
                        </span>
                    </center>
                </div>
            )}
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
                        style={{ width: "80%" }}
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
