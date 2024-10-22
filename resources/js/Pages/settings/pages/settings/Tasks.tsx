import { useState, useEffect } from "react";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from "../../../../Pages/settings/Layout";
import YouTubePlayer from "../../../../components/dashboard/tasks/ytiframeapi";
import { XMarkIcon } from "@heroicons/react/20/solid";
const TasksPage = () => {
    const { tasks, categories } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoId, setVideoId] = useState("");
    const [taskId, setTaskId] = useState("");
    const [order, setOrder] = useState({});
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredTasks =
        selectedCategory === "All"
            ? tasks
            : tasks.filter((task) => task.service_id === selectedCategory);

    const openModal = (videoId: string , taskId: string , order: Object) => {
        setVideoId(videoId);
        setTaskId(taskId);
        setIsModalOpen(true);
        setOrder(order);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVideoId(""); // Reset videoId when closing the modal
        setTaskId("");
        setOrder({});
    };

    return (
        <DashboardLayout>
            <div className="w-full h-auto mt-20">
                <WelcomeTab />
                <div className="w-full px-2 py-12 sm:px-0">
                    <h3 className="text-2xl mb-4">Tasks</h3>
                    <div className="flex space-x-4 mb-8">
                        <button
                            onClick={() => handleCategoryClick("All")}
                            className={`px-4 py-2 rounded-md ${
                                selectedCategory === "All"
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-primary"
                            }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.service_id}
                                onClick={() =>
                                    handleCategoryClick(category.service_id)
                                }
                                className={`px-4 py-2 rounded-md ${
                                    selectedCategory === category.service_id
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 text-primary"
                                }`}
                            >
                                {category.service_name}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-white shadow-md rounded-lg p-4"
                                >
                                    <img
                                        src={`${task.data.thumbnail}`}
                                        alt={`Task ${task.id}`}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                    <h4 className="text-lg font-semibold mb-2">
                                        {task.data.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {task.categories.length > 0
                                            ? task.categories.join(", ")
                                            : "No categories"}
                                        <br />
                                        Points: {task.reward}
                                    </p>
                                    <button
                                        onClick={() =>
                                            openModal(task.data.videoId , task.id , task.order)
                                        }
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Watch Video
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                No tasks available
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
                        <div className="absolute top-[0px] right-[1px]">
                            <div className="bg-[#E8F0F7] rounded-full p-1">
                                <XMarkIcon
                                    className="w-6 h-6 cursor-pointer text-red-600"
                                    onClick={closeModal}
                                />
                            </div>
                        </div>
                        <div className="relative pb-9/16 overflow-hidden mt-1">
                            <YouTubePlayer videoId={videoId} taskId={taskId} order={order} />
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default TasksPage;