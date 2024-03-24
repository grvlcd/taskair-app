"use client";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getUserData } from "@/lib/fetchUser";
import { TUser } from "@/lib/models/user/TUser";
import { useRouter } from "next/router";

type HomeProps = {
  user: TUser;
};

const Home: NextPage<HomeProps> = ({ user }: HomeProps) => {
  const navigate = useRouter();
  const isUserAuthenticated = !isEmpty(user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", user.access_token);
      const token = localStorage.getItem("token");
      if (typeof token === "undefined") {
        navigate.push("/auth/login");
      }
    }
  }, []);

  return (
    <DashboardLayout isAuthenticated={isUserAuthenticated}>
      <div className="p-4 space-y-4"></div>
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
