import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Navbar from "@/components/layout/Nav";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token, refresh_token } = context.req.cookies;

  if (access_token || refresh_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const ssoURL = `${process.env.BACKEND_URL}/redirect?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`;
const Login: NextPage = () => {
  return (
    <div>
      <Navbar ssoUrl={ssoURL} authenticated={false} />
    </div>
  );
};

export default Login;
