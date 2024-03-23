import { GetServerSidePropsContext } from "next";
import { fetchOrRefresh } from "./refresh";

type ServerSideProps = {
  context: GetServerSidePropsContext;
};

export const getUserData = async ({ context }: ServerSideProps) => {
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
        access_token,
        status: getUserRequest.status,
        ...getUserResponse,
      };
    },
    server: {
      req: context.req,
      res: context.res,
    },
  });

  return user;
};
