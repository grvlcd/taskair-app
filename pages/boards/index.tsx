"use client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { isEmpty } from "lodash";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getUserData } from "@/lib/fetchUser";
import { TUser } from "@/lib/models/user/TUser";
import useBoardStore from "@/lib/store/boards/boardStore";
import BoardModal from "@/components/boards/modals/boardModal";

type BoardProps = {
  user: TUser;
};

const BoardsPage: NextPage<BoardProps> = ({ user }: BoardProps) => {
  const { toggle } = useBoardStore();
  const isUserAuthenticated = !isEmpty(user);

  return (
    <DashboardLayout isAuthenticated={isUserAuthenticated}>
      <div className="p-4 space-y-4">
        <button
          type="button"
          onClick={() => {
            toggle(true);
          }}
          className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <p>Create Board</p>
        </button>
        <h1 className="text-lg font-bold">You&apos;re logged in.</h1>
        <div className="text-lg">
          <p>Name: {user.name}</p>
          <p>Email: {user.email} </p>
        </div>
      </div>
      <BoardModal />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = context.req.cookies;
  const user = await getUserData({ context });

  if (!user || !access_token)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      user,
      access_token,
    },
  };
};

export default BoardsPage;
