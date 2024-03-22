import { ReactNode } from "react";
import Navbar from "./Nav";
import SideNav from "./SideNav";
import { fetchOrRefresh } from "@/lib/refresh";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { MouseEventHandler, useEffect } from "react";
import { isEmpty } from "lodash";
import useUserStore, { TUser } from "@/lib/store/user";

type DashboardProps = {
  children: ReactNode;
  auth: boolean;
  onLogout?: () => void;
  user?: TUser;
};

const DashboardLayout: NextPage<DashboardProps> = ({
  auth,
  onLogout,
  children,
  user,
}) => {
  const router = useRouter();
  const isUserAuthenticated = isEmpty(user);

  const onLogoutHandler = async () => {
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({ access_token: user?.access_token }),
    });
    router.replace("/auth/login");
  };

  return (
    <main>
      <div className="flex flex-col h-screen">
        <Navbar
          authenticated={isUserAuthenticated}
          /* ts-ignore */
          onLogout={onLogoutHandler}
        />
        <div className="flex flex-row h-screen">
          <SideNav />
          <div className="p-4 space-y-4">{children}</div>
        </div>
      </div>
    </main>
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
      user: {
        ...user,
        access_token,
      },
    },
  };
};

export default DashboardLayout;
