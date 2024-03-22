"use client";
import { fetchOrRefresh } from "@/lib/refresh";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { isEmpty } from "lodash";
import DashboardLayout from "@/components/layout/DashboardLayout";

type Props = {
  user: any;
  access_token: string;
};

const Home: NextPage<Props> = ({ user, access_token }: Props) => {
  const isUserAuthenticated = !isEmpty(user);
  typeof window !== "undefined" &&
    localStorage.setItem("token", JSON.stringify(access_token));

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
  const { access_token, refresh_token } = context.req.cookies;
  const user = await fetchOrRefresh({
    token: {
      access_token,
      refresh_token,
    },
    fetcher: async (access_token) => {
      if (!access_token) return { status: 401, user: [] };

      const getUserRequest = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/users",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const getUserResponse = await getUserRequest.json();

      return {
        status: getUserRequest.status,
        ...getUserResponse,
      };
    },
    server: {
      req: context.req,
      res: context.res,
    },
  });

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
