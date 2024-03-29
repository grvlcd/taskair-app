import useTaskStore from '@/lib/store/task/taskStore';
import ModalWrapper from '@/components/modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const CreateTaskModal = () => {
	const { createModal, toggleCreate } = useTaskStore();
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors }
	// } = useForm<TTask>({
	// 	resolver: zodResolver(TaskSchema)
	// });

	function uuidv4() {
		return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
			(+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
		);
	}

	const handleClose = () => {
		toggleCreate(false);
	};

	// const onSubmit = async (data: TTask) => {
	// 	const payload = {
	// 		id: uuidv4(),
	// 		...data,
	// 		status: 'TODO' as const
	// 	};

	// 	createTask(payload);
	// };

	return (
		<ModalWrapper modal={createModal} handleClose={handleClose}>
			<h1>hello world</h1>
			{/* <form onSubmit={handleSubmit(onSubmit)}>
				<label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
					Title
				</label>
				<input
					{...register('title')}
					className={`appearance-none block w-full bg-gray-200 ${
						errors.title && 'border-red-500'
					} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					id="grid-first-name"
					type="text"
				/>
				<div className="h-4">
					{errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
				</div>

				<label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
					Description
				</label>
				<textarea
					{...register('description')}
					className={`appearance-none block w-full bg-gray-200 ${
						errors.description && 'border-red-500'
					} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					id="grid-first-name"
					cols={40}
					rows={10}></textarea>
				<div className="h-4">
					{errors.description && <p className="text-red-500 text-xs italic">{errors.description?.message}</p>}
				</div>

				<label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
					Tag
				</label>
				<input
					{...register('tag')}
					className={`appearance-none block w-full bg-gray-200 ${
						errors.tag && 'border-red-500'
					} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					id="grid-first-name"
					type="text"
				/>
				<div className="h-4">
					{errors.tag && <p className="text-red-500 text-xs italic">{errors.tag.message}</p>}
				</div>

				<label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
					Complexity
				</label>
				<input
					{...register('complexity')}
					className={`appearance-none block w-full bg-gray-200 ${
						errors.complexity && 'border-red-500'
					} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					id="grid-first-name"
					type="text"
				/>
				<div className="h-4">
					{errors.complexity && <p className="text-red-500 text-xs italic">{errors.complexity.message}</p>}
				</div>

				<label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
					Type
				</label>
				<input
					{...register('type')}
					className={`appearance-none block w-full bg-gray-200 ${
						errors.type && 'border-red-500'
					} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
					id="grid-first-name"
					type="text"
				/>
				<div className="h-4">
					{errors.type && <p className="text-red-500 text-xs italic">{errors.type.message}</p>}
				</div>

				<div className="flex flex-row justify-end mt-4 space-x-2">
					<button
						type="submit"
						className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
						Submit
					</button>
				</div>
			</form> */}
		</ModalWrapper>
	);
};

export default CreateTaskModal;
