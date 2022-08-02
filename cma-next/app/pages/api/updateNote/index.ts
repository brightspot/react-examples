import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import { getSession } from "next-auth/react";
import { UPDATE_NOTE } from "../../../queries/UpdateNote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    console.log("verify the request is a patch request");
    return;
  }

  // This is an example of how to protect api routes
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "not authenticated" });
    return;
  }

  try {
    let editVariables: any = {id: req.body.id, toolUser: req.body.toolUser}
    if (req.body.title) {
      editVariables.title = req.body.title
    } 
    if (req.body.text) {
      editVariables.text = req.body.text
    }

      const { data } = await client.mutate({
        mutation: UPDATE_NOTE,
        fetchPolicy: "no-cache",
        variables: editVariables
      });
      res.status(200).json(data);
    } catch (error: any) {
    console.error("error in updating note", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
