'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TBoardTask } from '@/lib/models/board/task';
import useTaskStore from '@/lib/store/task/taskStore';

type TBoardTaskProps = {
	task: TBoardTask;
};

const BoardTaskCard = ({ task }: TBoardTaskProps) => {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: task.id,
		data: {
			type: 'TBoardTask',
			task
		}
	});
	const { toggle, setForm } = useTaskStore();

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	};

	const handleViewTask = () => {
		setForm(task);
		toggle(true);
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="opacity-40 bg-white p-2.5 h-[160px] min-h-[160px] items-center flex rounded-md border-2 border-indigo-700  cursor-grab relative"
			/>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white shadow-sm p-2.5 h-[160px] min-h-[160px] items-center flex text-left rounded-md hover:ring-2 hover:ring-inset hover:ring-indigo-700 cursor-grab relative task"
			onClick={handleViewTask}>
			<p className="my-auto h-[90%] w-full overflow-y-hidden overflow-x-hidden whitespace-pre-wrap">
				{task.content}
			</p>
		</div>
	);
};

export default BoardTaskCard;
