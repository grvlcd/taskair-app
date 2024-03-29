import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useTaskStore from '@/lib/store/task/taskStore';
import ModalWrapper from '@/components/modal';

const TaskModal = () => {
	const { form, modal, toggle, setForm } = useTaskStore();

	const handleClose = () => {
		setForm(null);
		toggle(false);
	};

	return (
		<ModalWrapper title={form?.title} modal={modal} handleClose={handleClose}>
			<h1>hello world</h1>
		</ModalWrapper>
	);
};

export default TaskModal;
