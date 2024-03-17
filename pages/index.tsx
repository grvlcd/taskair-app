import Navbar from "@/components/layout/Nav";
import { fetchOrRefresh } from "@/lib/refresh";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { isEmpty } from "lodash";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token, refresh_token } = context.req.cookies;
  const user = await fetchOrRefresh({
    token: {
      access_token,
      refresh_token,
    },
    fetcher: async (access_token) => {
      if (!access_token) return { status: 401, user: [] };

      const getUserRequest = await fetch(process.env.BACKEND_URL + "/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

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

type Props = {
  user: any;
  access_token: string;
};

const Home: NextPage<Props> = ({ user, access_token }: Props) => {
  const router = useRouter();

  const isUserAuthenticated = !isEmpty(user);

  const onLogoutHandler: MouseEventHandler = async (event) => {
    event.preventDefault();

    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({ access_token }),
    });

    router.replace("/auth/login").then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      {/* @ts-ignore */}
      <Navbar authenticated={isUserAuthenticated} onLogout={onLogoutHandler} />
      <div className="p-4 space-y-4">
        <h1 className="text-lg font-bold">You&apos;re logged in.</h1>
        <div className="text-lg">
          <p>Name: {user.name}</p>
          <p>Email: {user.email} </p>
        </div>
      </div>
    </>
  );
};

export default Home;
