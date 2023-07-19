import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export const config = {
  api: {
    responseLimit: "30mb",
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};

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
      const {
        name,
        price,
        homepage,
        thumbnail,
        brand,
        currentInventory,
        description,
        category,
      } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          homepage,
          thumbnail,
          brand,
          currentInventory: parseInt(currentInventory),
          description,
          category,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });
      return res.status(200).json(product);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let products;

      if (userId && typeof userId === "string") {
        products = await prisma.product.findMany({
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
        products = await prisma.product.findMany({
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
