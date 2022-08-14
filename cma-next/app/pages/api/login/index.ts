import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import CHECK_USER from "../../../components/auth/Login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.query({
      query: CHECK_USER,
      fetchPolicy: "no-cache",
      variables: {
        arguments: req.body.name,
      },
    });
    res.status(200).json(data.com_psddev_cms_db_ToolUserQuery.items[0]);
  } catch (error: any) {
    console.error("error finding user", error);
    return res.status(400).json("failed");
  }
}
