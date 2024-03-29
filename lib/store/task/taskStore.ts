import { create } from 'zustand';
import { TBoardTask } from '@/lib/models/board/task';

type TTaskStore = {
	data: any;
	isLoading: boolean;
	createModal: boolean;
	modal: boolean;
	form: TBoardTask | null;
	error: string;
	toggle: (payload: boolean) => void;
	toggleCreate: (payload: boolean) => void;
	setForm: (payload: TBoardTask | null) => void;
};

const useTaskStore = create<TTaskStore>(set => ({
	data: [],
	isLoading: false,
	form: null,
	createModal: false,
	modal: false,
	error: '',
	toggle: payload =>
		set(() => ({
			modal: payload
		})),
	toggleCreate: payload =>
		set(() => ({
			createModal: payload
		})),
	setForm: payload => set(() => ({ form: payload }))
}));

export default useTaskStore;
