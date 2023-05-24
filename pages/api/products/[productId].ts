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
    const { categoryId } = req.query;

    if (!categoryId || typeof categoryId !== "string") {
      throw new Error("Invalid ID");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        user: true,
      },
    });

    if (!product) {
      throw new Error("Invalid ID");
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
