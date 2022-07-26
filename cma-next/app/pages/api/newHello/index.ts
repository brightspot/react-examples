import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/apollo-client";
import HELLO_WORLD_NEW from "../../../queries/HelloWorldNew";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.log("verify the request is a post request");
    return;
  }
  try {
    const { data } = await client.mutate({
      mutation: HELLO_WORLD_NEW,
      fetchPolicy: "no-cache",
      variables: {
        toolUser: req.body.userName,
        title: req.body.title,
        text: req.body.text,
      },
    });
    res.status(200).json(data);
  } catch (error: any) {
    console.error("error in creating new hello world", error);
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message);
      console.error(error);
    }
  }
}
