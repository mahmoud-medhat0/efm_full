import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import YouTubePlayer from "./ytiframeapi";
import ManualTask from "./Modaltask/ModalTask";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from "../../../Layout/DashboardLayout";
const Tasks = () => {
    const { tasks, categories,app_url } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [manualModalOpen,setManualModalOpen]=useState(false);
    const [videoId, setVideoId] = useState("");
    const [TaskId, setTaskId] = useState("");
    const [order, setOrder] = useState({});
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [fields, setFields] = useState();
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const filteredTasks =
        selectedCategory === "All"
            ? tasks
            : tasks.filter((task) => task.service_name === selectedCategory);
    const updateTask = async (taskId, status) => {
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
    const openModal = (videoId, taskId, order,closeModal) => {
        setVideoId(videoId);
        setTaskId(taskId);
        setIsModalOpen(true);
        setOrder(order);
        CloseModal();
    };

    const closeModal = async () => {
        setIsModalOpen(false);
        setVideoId(""); // Reset videoId when closing the modal
        setTaskId("");
        setOrder({});
        await updateTask(TaskId, "failed");
        window.location.reload();
    };
    const openManualModal = async(taskId, description, instructions, fields) => {
        const response = await axios.post(route('client.dashboard.tasks.status'), { taskId: taskId });
        if(response.data.ip_detected == 1){
            toast.error('VPN/Proxy Detected');
            return;
        }
        if(response.data.success == false){
            toast.error(response.data.message);
            return;
        }
        setManualModalOpen(true);
        setTaskId(taskId);
        setDescription(description);
        setInstructions(instructions);
        setFields(fields);
    };
    const closeManualModal = () => {
        setManualModalOpen(false);
    };
    const checkTaskStatus = async (task) => {
        try {
            const response = await axios.post(route('client.dashboard.tasks.status'), { taskId: task.id });
            return response.data.status;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                // Assuming the server returns validation errors in a standard format
                const errors = error.response.data.errors;
                Object.values(errors).forEach(err => {
                    toast.error(err[0]); // Display each error message
                });
                return;
            } else {
                console.error('Failed to check task status:', error);
                toast.error('Failed to check task status. Please try again.');
            }
            return 'failed';
        }
    };
    return (
        <DashboardLayout>
            <div className="tasks-tasksContainer">
                <h2 className="tasks-tasksTitle">Tasks</h2>
                <div className="tasks-tasksFilterButtons">
                    <button
                        className={`tasks-tasksButton ${
                            selectedCategory === "All"
                                ? "tasks-tasksButtonActive"
                                : ""
                        }`}
                        onClick={() => handleCategoryClick("All")}
                    >
                        All
                    </button>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <button
                                key={category.service_id}
                                className={`tasks-tasksButton ${
                                    selectedCategory === category.service_name
                                        ? "tasks-tasksButtonActive"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleCategoryClick(category.service_name)
                                }
                            >
                                {category.service_name}
                            </button>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div className="tasks-tasksCard" key={task.id}>
                            {task.data !=null && task.data.thumbnail !=null ? (
                                <img src={`${task.data.thumbnail}`} alt={`Task ${task.id}`} className="tasks-tasksImage" />
                            ) : (
                                <img src={`${app_url}/storage/${task.service_thumbnail}`} alt={`Task ${task.id}`} className="tasks-tasksImage" />
                            )}
                            <div className="tasks-tasksDetails">
                                <h3>{task.order.service.name.en}</h3>
                                <p>
                                    <span>Commission:</span> {task.reward}
                                </p>
                                <p>
                                    <span>Category:</span> {task.service_name}
                                </p>
                                <p>
                                    <span>Time:</span>{" "}
                                    {task.order.created_at_human}
                                </p>
                                <p>
                                    <span>Current/Target:</span> {task.order.current_amount}/{task.order.target_amount}
                                </p>
                                {task.rejection_cause_name!==null && (
                                    <p style={{color:'red'}}>
                                        <span>Rejection Cause:</span> {task.rejection_cause_name}
                                    </p>
                                )}
                            </div>
                            <div className="tasks-tasksButtons">
                                {task.status === 'pending' || task.status === 'in_progress' || task.status === 'failed' ? (
                                    <p
                                        className="tasks-tasksViewTask"
                                        onClick={() => {
                                            if(checkTaskStatus(task) === 'completed'){
                                                toast.error('Sorry Task is completed');
                                                return;
                                            }
                                            if(checkTaskStatus(task) === 'expired'){
                                                toast.error('Sorry Task is expired');
                                                return;
                                            }
                                            if (task.service_code === 'yt_videos') {
                                                openModal(task.data.videoId, task.id, task.order, closeModal);
                                            } else if (task.service_type === 'manual') {
                                                openManualModal(task.id, task.description, task.instructions, task.fields);
                                            } else {
                                                toast.error('Task is not a supported type');
                                            }
                                        }}
                                    >
                                        View Task
                                    </p>
                                ) : (
                                    <p className="tasks-tasksViewTask">View Task</p>
                                )}
                                <button className="tasks-tasksCancelled">
                                    {task.status.replace('_', ' ').toUpperCase()}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative w-[75%] h-[95%]">
                        <div className="absolute top-[0px] right-[1px]">
                            <div className="bg-[#E8F0F7] rounded-full p-1">
                                <XMarkIcon
                                    className="w-6 h-6 cursor-pointer text-red-600"
                                    onClick={closeModal}
                                />
                            </div>
                        </div>
                        <div className="relative overflow-hidden mt-1 h-[100%]">
                            <YouTubePlayer videoId={videoId} taskId={TaskId} order={order} onTaskCompleted={closeModal} fields={fields} />
                        </div>
                    </div>
                </div>
            )}
            {manualModalOpen && (
                <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative w-[75%] h-[95%]">
                        <div className="absolute top-[0px] right-[1px]">
                            <div className="bg-[#E8F0F7] rounded-full p-1">
                                <XMarkIcon
                                    className="w-6 h-6 cursor-pointer text-red-600"
                                    onClick={closeManualModal}
                                />
                            </div>
                        </div>
                        <div className="relative overflow-hidden mt-4 h-[100%] overflow-y-scroll">
                            <ManualTask taskId={TaskId} description={description} instructions={instructions} onTaskCompleted={closeManualModal} fields={fields} />
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Tasks;
