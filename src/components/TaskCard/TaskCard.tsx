import { TaskDocument } from "@/models/task";
import TaskDeleteButton from "./TaskDeleteButton/TaskDeleteButton";
import TaskEditButton from "./TaskEditButton/TaskEditButton";

// taskプロパティを props に持つことを明示
interface TaskCardProps {
    task: TaskDocument;
}

// TaskCardProps型のpropsを受け取るReactの関数コンポーネントを宣言
// propsオブジェクトの中からtaskプロパティだけを分割代入して受け取る
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>dueDate</th>
                    <th>isCompleted</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{ task.title }</td>
                    <td>{ task.description }</td>
                    <td>{ task.dueDate }</td>
                    <td>{task.isCompleted ? 'Completed': 'Incompled'}</td>
                    <td className="action-buttons">
                        <TaskEditButton id={ task._id } />
                        <TaskDeleteButton id={ task._id } />
                    </td>
                </tr>
            </tbody>
        </table>
    )
};

export default TaskCard;