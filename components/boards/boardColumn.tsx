import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { TBoardColumn } from '@/lib/models/board/board';
import { TBoardTask } from '@/lib/models/board/task';
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
		<div ref={setNodeRef} className="bg-gray-200 w-[230px] max-w-[240px] h-[860px] max-h-[860px] rounded-md flex flex-col">
			<div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
				<div className="flex gap-2">
					{column.title}
					<div className=" flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full ">
						{tasks.length}
					</div>
				</div>
			</div>

			<div className="flex flex-grow flex-col gap-2 p-1 overflow-x-hidden overflow-y-auto">
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
