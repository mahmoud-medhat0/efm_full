import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import styles from './Task.module.css';
import DashboardLayout from '../../../Layout/DashboardLayout';
const Tasks = () => {
    const { tasks, categories } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoId, setVideoId] = useState("");
    const [taskId, setTaskId] = useState("");
    const [order, setOrder] = useState({});
    
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredTasks =
        selectedCategory === "All"
            ? tasks
            : tasks.filter((task) => task.service_name === selectedCategory);

    return (
        <DashboardLayout>
        <div className={styles.tasksContainer}>
            <h2 className={styles.tasksTitle}>Tasks</h2>
            <div className={styles.tasksFilterButtons}>
                <button
                    className={`${styles.tasksButton} ${selectedCategory === "All" ? styles.tasksButtonActive : ""}`}
                    onClick={() => handleCategoryClick("All")}
                >
                    All
                </button>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category.service_id}
                            className={`${styles.tasksButton} ${selectedCategory === category.service_name ? styles.tasksButtonActive : ""}`}
                            onClick={() => handleCategoryClick(category.service_name)}
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
                    <div className={styles.tasksCard} key={task.id}>
                        <img src="https://via.placeholder.com/100" alt="Task" className={styles.tasksImage} />
                        <div className={styles.tasksDetails}>
                            <h3>{task.order.service.name.en}</h3>
                            <p>
                                <span>Commission:</span> {task.reward}
                            </p>
                            <p>
                                <span>Category:</span> {task.service_name}
                            </p>
                            <p>
                                <span>Time:</span> {task.order.created_at_human}
                            </p>
                            <p>
                                <span>Link:</span> <a href={task.order.link} target="_blank" rel="noopener noreferrer">Watch Video</a>
                            </p>
                        </div>
                        <div className={styles.tasksButtons}>
                            <button className={styles.tasksViewTask}>View Task</button>
                            <button className={styles.tasksCancelled}>Cancelled</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
        </DashboardLayout>
    );
};

export default Tasks;
