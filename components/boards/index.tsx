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
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import ColumnContainer from './boardColumn';
import { TBoardColumn } from '@/lib/models/board/board';
import { TBoardTask } from '@/lib/models/board/task';
import TaskCard from './taskCard';
import useTaskStore from '@/lib/store/task/taskStore';
import { groupBy, isEmpty } from 'lodash';

const defaultCols: TBoardColumn[] = [
	{
		id: 'TODO',
		title: 'Todo'
	},
	{
		id: 'IN_PROGRESS',
		title: 'In Progress'
	},
	{
		id: 'REVIEW',
		title: 'Technical Review'
	},
	{
		id: 'TESTING',
		title: 'Testing'
	},
	{
		id: 'STAGING',
		title: 'Staging'
	},
	{
		id: 'PRODUCTION',
		title: 'Production'
	},
	{
		id: 'DONE',
		title: 'Done'
	}
];

const defaultTasks: TBoardTask[] = [
	{
		id: '1',
		columnId: 'TODO',
		content: 'Test 1'
	},
	{
		id: '2',
		columnId: 'TODO',
		content: 'Test 2'
	},
	{
		id: '3',
		columnId: 'IN_PROGRESS',
		content: 'Test 3'
	},
	{
		id: '4',
		columnId: 'IN_PROGRESS',
		content: 'Test 4'
	},
	{
		id: '5',
		columnId: 'DONE',
		content: 'Test 5'
	},
	{
		id: '6',
		columnId: 'DONE',
		content: 'Test 6'
	},
	{
		id: '7',
		columnId: 'DONE',
		content: 'Test 7'
	},
	{
		id: '8',
		columnId: 'TODO',
		content: 'Test 8'
	},
	{
		id: '9',
		columnId: 'TODO',
		content: 'Test 9'
	},
	{
		id: '10',
		columnId: 'TODO',
		content: 'Test 10'
	},
	{
		id: '11',
		columnId: 'TODO',
		content: 'Test 11'
	},
	{
		id: '12',
		columnId: 'IN_PROGRESS',
		content: 'Test 12'
	},
	{
		id: '13',
		columnId: 'IN_PROGRESS',
		content: 'Test 13'
	},
	{
		id: '14',
		columnId: 'REVIEW',
		content: 'Test 14'
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
				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	};

	return (
		<div className="m-0 p-0 flex w-full items-center overflow-x-auto overflow-y-hidden">
			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
				<div className="m-auto flex gap-4 overflow-y-hidden overflow-x-auto">
					<div className="flex overflow-x-auto scroll-smooth gap-4">
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
