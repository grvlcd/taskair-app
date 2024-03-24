"use client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getUserData } from "@/lib/fetchUser";
import { TUser } from "@/lib/models/user/TUser";
import { isEmpty } from "lodash";
import DashboardLayout from "@/components/layout/DashboardLayout";

type BoardProps = {
  user: TUser;
};

const BoardPage: NextPage<BoardProps> = ({ user }: BoardProps) => {
  const isUserAuthenticated = !isEmpty(user);
  return (
    <DashboardLayout isAuthenticated={isUserAuthenticated}>
      <h1>This is where we display the boards {user.name}</h1>
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

export default BoardPage;
