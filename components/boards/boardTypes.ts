export type TBoardId = string | number;

export type TBoardColumn = {
  id: TBoardId;
  title: string;
};

export type TBoardTask = {
  id: TBoardId;
  columnId: TBoardId;
  content: string;
};