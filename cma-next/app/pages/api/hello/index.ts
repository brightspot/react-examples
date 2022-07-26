// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import HELLO_WORLD from "../../../queries/HelloWorld";
import client from "../../../lib/apollo-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.query({
      query: HELLO_WORLD,
      fetchPolicy: "no-cache",
    });
    res.status(200).json(data);
  } catch (error: any) {
    console.error("error in getting hello worlds", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
