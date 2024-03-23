"use client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { isEmpty } from "lodash";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getUserData } from "@/lib/fetchUser";
import { TUser } from "@/lib/models/user/TUser";

type HomeProps = {
  user: TUser;
};

const Home: NextPage<HomeProps> = ({ user }: HomeProps) => {
  const isUserAuthenticated = !isEmpty(user);
  typeof window !== "undefined" &&
    localStorage.setItem("token", JSON.stringify(user.access_token));

  return (
    <DashboardLayout isAuthenticated={isUserAuthenticated}>
      <div className="p-4 space-y-4">
        <h1 className="text-lg font-bold">You&apos;re logged in.</h1>
        <div className="text-lg">
          <p>Name: {user.name}</p>
          <p>Email: {user.email} </p>
        </div>
      </div>
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

export default Home;
