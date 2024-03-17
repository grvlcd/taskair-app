import { setCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";

type Token = {
  access_token?: string;
  refresh_token?: string;
};

type ServerCookie = {
  req: (IncomingMessage & {
        cookies?: {
              [key: string]: string;
            }
          | Partial<{ [key: string]: string }> | undefined
      }) | undefined,
    res: ServerResponse<IncomingMessage> | undefined
};

type Args = {
    token: Token,
    fetcher: (access_token: string) => Promise<{status: number, [key: string]: any}>,
    server: ServerCookie
}

export const fetchOrRefresh = async({token, fetcher, server}: Args) => {
    if(!token.access_token || !token.refresh_token) return [];
    
    const data = await fetcher(token.access_token!);

    if(data.status === 401) {
        const refreshTokenRequest = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                refresh_token: token.refresh_token!,
                grant_type: 'refresh_token'
            })
        });

        const refreshTokenResponse = await refreshTokenRequest.json();

        if(!refreshTokenRequest.ok) return [];

        setCookie('access_token', refreshTokenResponse.access_token, {
            req: server.req,
            res: server.res,
            maxAge: parseInt(refreshTokenResponse.expires_in.toString()),
            httpOnly: true
        });

        setCookie('refresh_token', refreshTokenResponse.refresh_token, {
            req: server.req,
            res: server.res,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true
        });

        const data = await fetcher(refreshTokenResponse.access_token);

        return data;
    }
    return data;
}
