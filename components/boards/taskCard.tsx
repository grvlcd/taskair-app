import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TBoardTask } from './boardTypes';

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

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="opacity-30 bg-gray-700 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative"
			/>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-gray-700 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task">
			<p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
				{task.content}
			</p>
		</div>
	);
};

export default BoardTaskCard;
