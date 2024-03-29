import { TBoardId } from './board';

export type TBoardTask = {
	id: string;
	columnId: TBoardId;
	content: string;
};
