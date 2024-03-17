import { setCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const error_message = "Error";

  const { query } = context;

  if (query.code && query.state) {
    // @ts-ignore
    const params = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      code: query.code,
      state: query.state,
    });

    const url = `${process.env.BACKEND_URL}/callback?${params.toString()}`;

    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  if (!query.error) {
    if (query.access_token && query.refresh_token && query.expires_in) {
      setCookie("access_token", query.access_token, {
        req: context.req,
        res: context.res,
        maxAge: parseInt(query.expires_in.toString()),
        httpOnly: true,
      });
      setCookie("refresh_token", query.refresh_token, {
        req: context.req,
        res: context.res,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      return {
        redirect: {
          destination: "http://localhost:3000/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      error_message,
    },
  };
};

type Props = {
  error_message: string;
};

const Callback: NextPage<Props> = ({ error_message }: Props) => {
  return (
    <div className="p-4">
      <p className="text-red-600">{error_message}</p>
    </div>
  );
};

export default Callback;
