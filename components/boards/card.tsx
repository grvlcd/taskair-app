type TBoardCard = {
  title: string;
  description: string;
};

const BoardCard = ({ title, description }: TBoardCard) => {
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
      <a
        href="#"
        aria-describedby="tier-enterprise"
        className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
      >
        View Board
      </a>
    </div>
  );
};

export default BoardCard;
