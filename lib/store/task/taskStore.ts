import { create } from 'zustand';
import { TBoardTask } from '@/lib/models/board/task';

type TTaskStore = {
	data: any;
	isLoading: boolean;
	modal: boolean;
	form: TBoardTask | null;
	toggle: (payload: boolean) => void;
	setForm: (payload: TBoardTask | null) => void;
	error: string;
};

const useTaskStore = create<TTaskStore>(set => ({
	data: [],
	isLoading: false,
	form: null,
	modal: false,
	error: '',
	toggle: payload =>
		set(state => ({
			...state,
			modal: payload
		})),
	setForm: payload => set(state => ({ ...state, form: payload }))
}));

export default useTaskStore;
