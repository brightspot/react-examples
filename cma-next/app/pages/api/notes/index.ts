// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GET_NOTES from "../../../queries/GetNotes";
import client from "../../../lib/apollo-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.query({
      query: GET_NOTES,
      fetchPolicy: "no-cache",
    });
    res.status(200).json(data);
  } catch (error: any) {
    console.error("error in getting notes", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
