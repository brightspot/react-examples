import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import { getSession } from "next-auth/react";
import HELLO_WORLD_DELETE from "../../../queries/DeleteNote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    console.log("verify the request is a delete request");
    return;
  }

  // This is an example of how to protect api routes (by user role, etc)
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "not authenticated" });
    return;
  }

  try {
    const { data } = await client.mutate({
      mutation: HELLO_WORLD_DELETE,
      fetchPolicy: "no-cache",
      variables: {
        id: req.body.id,
        permanently: true,
      },
    });
    res.status(200).json(data);
  } catch (error: any) {
    console.error("error in deleting hello world", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
