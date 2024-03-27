import { TBoardId } from './board';

export type TBoardTask = {
	id: TBoardId;
	columnId: TBoardId;
	content: string;
};
