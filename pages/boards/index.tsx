'use client';
import BoardCard from '@/components/boards/card';
import BoardModal from '@/components/boards/modals/boardModal';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getUserData } from '@/lib/fetchUser';
import { TUser } from '@/lib/models/user/TUser';
import useBoardStore, { TBoard } from '@/lib/store/boards/boardStore';
import { isEmpty } from 'lodash';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';

type BoardProps = {
	user: TUser;
};

const BoardsPage: NextPage<BoardProps> = ({ user }: BoardProps) => {
	const { data, isLoading, getBoards, toggle } = useBoardStore();
	const isUserAuthenticated = !isEmpty(user);

	useEffect(() => {
		getBoards();
	}, []);

	return (
		<DashboardLayout isAuthenticated={isUserAuthenticated}>
			<button
				type="button"
				onClick={() => {
					toggle(true);
				}}
				className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
				<p>Create Board</p>
			</button>
			<div className="flex flex-row space-x-5">
				{!isEmpty(data) &&
					data.shared.map((board: TBoard) => (
						<BoardCard
							key={board.id}
							boardId={board.id}
							title={board.name}
							description={board.description}
						/>
					))}
			</div>
			<BoardModal />
		</DashboardLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { access_token } = context.req.cookies;
	const user = await getUserData({ context });

	if (!user || !access_token)
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false
			}
		};

	return {
		props: {
			user,
			access_token
		}
	};
};

export default BoardsPage;
