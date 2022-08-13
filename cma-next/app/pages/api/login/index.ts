import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import CHECK_USER from "../../../queries/Login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("USERNAME ", req.body.name);
    const { data } = await client.query({
      query: CHECK_USER,
      fetchPolicy: "no-cache",
      variables: {
        arguments: req.body.name,
      },
    });
    console.log(
      "DATA FOR LOGIN",
      data.com_psddev_cms_db_ToolUserQuery.items[0].username
    );
    res
      .status(200)
      .json(data.com_psddev_cms_db_ToolUserQuery.items[0].username);
  } catch (error: any) {
    console.error("error finding user", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error.message);
    }
    return res.status(400).json("failed");
  }
}
