import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import CHECK_USER from "../../../queries/Login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("USERNAME ", req.body.username);
    const { data } = await client.query({
      query: CHECK_USER,
      fetchPolicy: "no-cache",
      variables: {
        arguments: req.body.username,
      },
    });
    console.log("DATA", data);
    res.status(200).json(data);
  } catch (error: any) {
    console.error("error finding user", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
