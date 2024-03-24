import { useRouter } from "next/router";

type TBoardCard = {
  boardId: number;
  title: string;
  description: string;
};

const BoardCard = ({ boardId, title, description }: TBoardCard) => {
  const navigate = useRouter();

  const handleViewBoard = () => {
    navigate.push(`boards/${boardId}`);
  };

  return (
    <div className="rounded-2xl p-8 w-72 ring-1 xl:p-10 bg-gray-900 ring-gray-900">
      <div>
        <h3
          id="tier-enterprise"
          className="text-lg font-semibold leading-8 text-white"
        >
          {title}
        </h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-300">{description}</p>
      <button
        onClick={handleViewBoard}
        className="w-full mt-6 rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-700 text-white hover:bg-white/20 focus-visible:outline-white"
      >
        View Board
      </button>
    </div>
  );
};

export default BoardCard;
