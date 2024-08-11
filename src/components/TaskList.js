const TaskList = ({ tasks }) => {
    return (
        <div>
            {tasks.map((task) => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Assigned to: {task.assignedTo.name}</p>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
