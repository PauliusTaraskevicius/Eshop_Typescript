import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "../../../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {

    const productId = req.query.id;

    if (typeof productId !== "string") {
        console.log(productId)
      throw new Error("Invalid ID");
    }

    if (!productId) {
        console.log(productId)
      throw new Error("Invalid ID");
    }

    const {
      name,
      price,
      thumbnail,
      brand,
      currentInventory,
      description,
      category
    } = req.body;

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        name,
        price: parseFloat(price),
        thumbnail,
        brand,
        currentInventory: parseInt(currentInventory),
        description,
        category,
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
