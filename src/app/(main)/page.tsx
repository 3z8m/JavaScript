import TaskEditButton from "@/components/TaskCard/TaskEditButton/TaskEditButton";
import TaskDeleteButton from "@/components/TaskCard/TaskDeleteButton/TaskDeleteButton";
import { TaskDocument } from "@/models/task";
import Link from "next/link";
import { MdAddTask } from "react-icons/md";

const getAllTasks = async (): Promise<TaskDocument[]> => {
	
	// fetch("http://localhost:3000/tasks") 
	// ⇒ Next.js が自動的に /app/api/tasks/route.ts の GET 処理を呼び出す
	const response = await fetch(`${process.env.API_URL}/tasks`, {
		cache: 'no-store',		// データが頻繁に更新されるため、cacheを無効化
	});

	// リクエストに失敗した場合はエラーを返す
	if (response.status !== 200) {
		throw new Error();
	}

	const data = await response.json();
	return data.tasks as TaskDocument[];
};


export default async function MainPage() {
	const allTasks = await getAllTasks();

	return (
		<div className="text-gray-800 p-8 h-full overflow-auto pb-24">
		
			<header className="flex justify-between items-center">
				<h1 className="text-2xl font-bold flex items-center">All Tasks</h1>

				<Link href='/new' className="flex items-center gap-1 font-semibold border px-4
					py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700">
					<MdAddTask className="size-5"/>
					<div>Add Task</div>
				</Link>
			</header>

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
					{allTasks.map((task) => (
						<tr key={task._id}>
							<td>{ task.title }</td>
							<td>{ task.description }</td>
							<td>{ task.dueDate }</td>
							<td>
								<div className={`mt-1 text-sm px-2 py-1 w-24 text-center text-white
								rounded-full shadow-sm ${task.isCompleted ? 'bg-green-500': 'bg-red-500'}`}>
									{task.isCompleted ? 'Completed': 'Incompleted'}
								</div>
							</td>
							<td>
								<div className="flex items-center gap-2 justify-end">
									<TaskEditButton id={ task._id } />
									<TaskDeleteButton id={ task._id } />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
