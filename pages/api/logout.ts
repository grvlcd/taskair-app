import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  deleteCookie("access_token", {
    req,
    res,
  });

  deleteCookie("refresh_token", {
    req,
    res,
  });

  await fetch(process.env.BACKEND_URL + "/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${req.body.access_token}`,
    },
  });

  return res.status(200).end();
}
