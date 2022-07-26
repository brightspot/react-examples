import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client"
import SEARCH from "../../../queries/Search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query
    const { data } = await client.query({
      query: SEARCH,
      fetchPolicy: "no-cache",
      variables: {
        arguments: query,
      },
    });
    res.status(200).json(data);
  } catch (error: any) {
    console.error("error finding user", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
