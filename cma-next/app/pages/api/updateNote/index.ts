import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import { getSession } from "next-auth/react";
import {
  UPDATE_NOTE_TITLE_AND_TEXT,
  UPDATE_NOTE_TITLE,
  UPDATE_NOTE_TEXT,
} from "../../../queries/UpdateNote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    console.log("verify the request is a patch request");
    return;
  }

  // This is an example of how to protect api routes (by user role, etc)
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "not authenticated" });
    return;
  }

  try {
    if (req.body.title && req.body.text) {
      const { data } = await client.mutate({
        mutation: UPDATE_NOTE_TITLE_AND_TEXT,
        fetchPolicy: "no-cache",
        variables: {
          title: req.body.title,
          text: req.body.text,
          id: req.body.id,
          toolUser: req.body.toolUser
        },
      });
      res.status(200).json(data);
    } else if (req.body.title) {
      const { data } = await client.mutate({
        mutation: UPDATE_NOTE_TITLE,
        fetchPolicy: "no-cache",
        variables: {
          title: req.body.title,
          id: req.body.id,
          toolUser: req.body.toolUser
        },
      });
      res.status(200).json(data);
    } else if (req.body.text) {
      const { data } = await client.mutate({
        mutation: UPDATE_NOTE_TEXT,
        fetchPolicy: "no-cache",
        variables: {
          text: req.body.text,
          id: req.body.id,
          toolUser: req.body.toolUser
        },
      });
      res.status(200).json(data);
    }
  } catch (error: any) {
    console.error("error in updating note", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
