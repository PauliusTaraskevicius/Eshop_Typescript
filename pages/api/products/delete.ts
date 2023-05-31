import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const productId = req.query.id;

    if (typeof productId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!productId) {
      throw new Error("Invalid ID");
    }

    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
