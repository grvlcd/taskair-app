import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { TBoardColumn, TBoardTask } from './boardTypes';
import { useMemo } from 'react';
import TaskCard from './taskCard';

type TBoardColumnProps = {
	column: TBoardColumn;
	tasks: TBoardTask[];
};

const BoardColumn = ({ column, tasks }: TBoardColumnProps) => {
	const tasksIds = useMemo(() => {
		return tasks.map(task => task.id);
	}, [tasks]);

	const { setNodeRef } = useSortable({
		id: column.id,
		data: {
			type: 'TBoardColumn',
			column
		}
	});

	return (
		<div ref={setNodeRef} className="bg-gray-300 w-[300px] h-[860px] max-h-[860px] rounded-md flex flex-col">
			<div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
				<div className="flex gap-2">
					<div className=" flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full ">
						0
					</div>
					{column.title}
				</div>
			</div>

			<div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
				<SortableContext items={tasksIds}>
					{tasks.map(task => (
						<TaskCard key={task.id} task={task} />
					))}
				</SortableContext>
			</div>
		</div>
	);
};

export default BoardColumn;
