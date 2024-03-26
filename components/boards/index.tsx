import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ColumnContainer from './boardColumn';
import { TBoardColumn, TBoardTask } from './boardTypes';
import TaskCard from './taskCard';

const defaultCols: TBoardColumn[] = [
	{
		id: 'todo',
		title: 'Todo'
	},
	{
		id: 'inProgress',
		title: 'In progress'
	},
	{
		id: 'review',
		title: 'Technical Review'
	},
	{
		id: 'testing',
		title: 'Testing'
	},
	{
		id: 'done',
		title: 'Done'
	}
];

const defaultTasks: TBoardTask[] = [
	{
		id: '1',
		columnId: 'todo',
		content: 'List admin APIs for dashboard'
	},
	{
		id: '2',
		columnId: 'todo',
		content:
			'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation'
	},
	{
		id: '3',
		columnId: 'doing',
		content: 'Conduct security testing'
	},
	{
		id: '4',
		columnId: 'doing',
		content: 'Analyze competitors'
	},
	{
		id: '5',
		columnId: 'done',
		content: 'Create UI kit documentation'
	},
	{
		id: '6',
		columnId: 'done',
		content: 'Dev meeting'
	},
	{
		id: '7',
		columnId: 'done',
		content: 'Deliver dashboard prototype'
	},
	{
		id: '8',
		columnId: 'todo',
		content: 'Optimize application performance'
	},
	{
		id: '9',
		columnId: 'todo',
		content: 'Implement data validation'
	},
	{
		id: '10',
		columnId: 'todo',
		content: 'Design database schema'
	},
	{
		id: '11',
		columnId: 'todo',
		content: 'Integrate SSL web certificates into workflow'
	},
	{
		id: '12',
		columnId: 'doing',
		content: 'Implement error logging and monitoring'
	},
	{
		id: '13',
		columnId: 'doing',
		content: 'Design and implement responsive UI'
	}
];

const Board = () => {
	const [columns, setColumns] = useState<TBoardColumn[]>(defaultCols);
	const [tasks, setTasks] = useState<TBoardTask[]>(defaultTasks);

	const [activeTask, setActiveTask] = useState<TBoardTask | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10
			}
		})
	);

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === 'TBoardTask') {
			setActiveTask(event.active.data.current.task);
			return;
		}
	};

	const onDragEnd = (event: DragEndEvent) => {
		setActiveTask(null);
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveATask = active.data.current?.type === 'TBoardTask';
		const isOverATask = over.data.current?.type === 'TBoardTask';

		if (!isActiveATask) return;

		if (isActiveATask && isOverATask) {
			setTasks(tasks => {
				const activeIndex = tasks.findIndex(t => t.id === activeId);
				const overIndex = tasks.findIndex(t => t.id === overId);

				if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
					tasks[activeIndex].columnId = tasks[overIndex].columnId;
					return arrayMove(tasks, activeIndex, overIndex - 1);
				}

				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		const isOverAColumn = over.data.current?.type === 'TBoardColumn';

		if (isActiveATask && isOverAColumn) {
			setTasks(tasks => {
				const activeIndex = tasks.findIndex(t => t.id === activeId);

				tasks[activeIndex].columnId = overId;
				console.log('DROPPING TASK OVER COLUMN', { activeIndex });
				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	};

	return (
		<div className="m-auto flex w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
				<div className="m-auto flex gap-4">
					<div className="flex gap-4">
						{columns.map(col => (
							<ColumnContainer
								key={col.id}
								column={col}
								tasks={tasks.filter(task => task.columnId === col.id)}
							/>
						))}
					</div>
				</div>

				{typeof window !== 'undefined' &&
					createPortal(
						<DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>,
						document.body
					)}
			</DndContext>
		</div>
	);
};

export default Board;
