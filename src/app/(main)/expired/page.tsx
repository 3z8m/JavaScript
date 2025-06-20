import TaskEditButton from "@/components/TaskCard/TaskEditButton/TaskEditButton";
import TaskDeleteButton from "@/components/TaskCard/TaskDeleteButton/TaskDeleteButton";
import { TaskDocument } from "@/models/task";


const getExpiredTasks = async (): Promise<TaskDocument[]> => {
	const response = await fetch(`${process.env.API_URL}/tasks/expired`, {
		cache: 'no-store',
	});
	if (response.status !== 200) {
		throw new Error();
	}

	const data = await response.json();
	return data.tasks as TaskDocument[];
};


const ExpiredTaskPage = async () => {
	const expiredTasks = await getExpiredTasks();

	return (
		<div className="text-gray-800 p-8 h-full overflow-auto pb-24">
		
			<header className="flex justify-between items-center">
				<h1 className="text-2xl font-bold flex items-center">Expireded Tasks</h1>
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
					{expiredTasks.map((task) => (
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
};

export default ExpiredTaskPage;