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
    const [isPausedProgrammatically, setIsPausedProgrammatically] = useState(false);
    const [lastAllowedTime, setLastAllowedTime] = useState(0);
    const playerInstanceRef = useRef(null);
    const trackingIntervalRef = useRef(null);
    const maxSeekDifference = 2; // Maximum allowed seek difference in seconds

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

    const trackPlayback = () => {
        if (playerInstanceRef.current) {
            const currentTime = playerInstanceRef.current.getCurrentTime();
            
            // Check if the video is within the custom time bounds
            if (order.order_type === "custom_time") {
                // Only enforce bounds if the difference is significant (more than 0.5 seconds)
                if (currentTime < order.time_start - 0.5) {
                    playerInstanceRef.current.seekTo(order.time_start, true);
                    toast.error("You cannot seek before the start time!", {
                        duration: 2000,
                    });
                    setLastAllowedTime(order.time_start);
                    return;
                }
                if (currentTime > order.time_end + 0.5) {
                    playerInstanceRef.current.seekTo(order.time_end, true);
                    toast.error("You cannot seek past the end time!", {
                        duration: 2000,
                    });
                    toast.error("try again Good Luck",{
                        duration: 2000,
                    });
                    onTaskCompleted();
                    setLastAllowedTime(order.time_end);
                    return;
                }
            }

            // Check for sudden time jumps (only if difference is more than maxSeekDifference)
            const timeDiff = Math.abs(currentTime - lastAllowedTime);
            if (timeDiff > maxSeekDifference && timeDiff < 30) { // Added upper limit to prevent false positives
                console.log('Seek detected:', { currentTime, lastAllowedTime });
                playerInstanceRef.current.seekTo(lastAllowedTime, true);
                toast.error("Seeking is not allowed!", {
                    duration: 2000,
                });
            } else {
                // Update lastAllowedTime only during normal playback
                setLastAllowedTime(currentTime);
            }
        }
    };

    // Cleanup interval on component unmount
    useEffect(() => {
        return () => {
            if (trackingIntervalRef.current) {
                clearInterval(trackingIntervalRef.current);
            }
        };
    }, []);

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
                        start: order.order_type === "custom_time" ? order.time_start : 0,
                        end: order.order_type === "custom_time" ? order.time_end : 0,
                        autoplay: 0,
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                        fs: 1,
                        iv_load_policy: 3,
                        disablekb: 0,
                    },
                    events: {
                        onReady: onPlayerReady,
                        onError: onPlayerError,
                        onStateChange: onPlayerStateChange,
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
        
        const onPlayerError = (event: YT.OnErrorEvent) => {
            console.error("Error Occurred:", event.data);
        };
        const onPlayerReady = (event: YT.PlayerEvent) => {           
            event.target.playVideo();
            playerInstanceRef.current = event.target;
            
            // Initialize the last allowed time to the start time for custom time videos
            const initialTime = order.order_type === "custom_time" ? order.time_start : 0;
            setLastAllowedTime(initialTime);
            event.target.seekTo(initialTime, true);
            
            // Clear any existing interval
            if (trackingIntervalRef.current) {
                clearInterval(trackingIntervalRef.current);
            }
            
            // Use a longer interval to reduce processing overhead
            trackingIntervalRef.current = setInterval(trackPlayback, 1000);
        };
    
        const onPlayerStateChange = async (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.PAUSED && !isPausedProgrammatically) {
                event.target.playVideo();
            }
            if (event.data === YT.PlayerState.PLAYING) {
                setIsPausedProgrammatically(false);
                await updateTask(taskId, "in_progress");
                updateProgress();
                // Reset lastAllowedTime when video starts playing
                setLastAllowedTime(event.target.getCurrentTime());
            }
            if (event.data === YT.PlayerState.ENDED) {
                if (trackingIntervalRef.current) {
                    clearInterval(trackingIntervalRef.current);
                }
                onPlayerFinish();
            }
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

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const message = "Are you sure you want to leave? Your progress will be lost.";
            event.preventDefault();
            updateTask(taskId, "failed");
            return message;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            // Clean up the event listener
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            delete (window as any).onYouTubeIframeAPIReady;
            window.removeEventListener("beforeunload", handleBeforeUnload);
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
            
                <div
                    style={isPlayerHidden ? { display: "none",width: "0%",height: "0%" } : {height: "60%"}}
                    className="w-full mt-4"
                    ref={playerRef}
                ></div>
            
            {isPlayerHidden && (
                <div
                    style={{ height: "60%" }}
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
            {showCaptcha && progress === 100 && (
                <div
                    style={{
                        marginTop: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "0.5rem",
                        padding: "1rem",
                    }}
                >
                    <p
                        style={{
                            fontSize: "1rem",
                            marginRight: "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Solve this:{" "}
                        <span
                            style={{
                                color: "#1D4ED8",
                                marginLeft: "0.25rem",
                                fontSize: "1rem",
                            }}
                        >
                            {captchaQuestion}
                        </span>
                    </p>
                    <input
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            border: "1px solid #D1D5DB",
                            borderRadius: "0.375rem",
                            padding: "0.5rem",
                            outline: "none",
                            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                            marginRight: "0.5rem",
                            marginBottom: "0.5rem",
                        }}
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Your answer"
                    />
                    <button
                        onClick={handleCaptchaSubmit}
                        style={{
                            backgroundColor: "#3B82F6",
                            color: "white",
                            transition: "all 0.3s",
                            width: "12%",
                            maxWidth: "auto",
                            fontSize: "1rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                        }}
                    >
                        Submit
                    </button>
                </div>
            )}
        </>
    );
};

export default YouTubePlayer;
