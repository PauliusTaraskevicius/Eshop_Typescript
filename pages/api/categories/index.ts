import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "../../../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { name } = req.body;

      const category = await prisma.category.create({
        data: {
          name,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(category);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      console.log({ userId });

      let categories;

      if (userId && typeof userId === "string") {
        categories = await prisma.category.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        categories = await prisma.category.findMany({
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(categories);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
