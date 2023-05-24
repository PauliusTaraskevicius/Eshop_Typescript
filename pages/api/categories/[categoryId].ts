import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!userId) {
      throw new Error("Invalid ID"); 
    }

    const category = await prisma.category.findUnique({
      where: {
        id: userId,
      },
    });

    if (!category) {
      throw new Error("Invalid ID");
    }

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}