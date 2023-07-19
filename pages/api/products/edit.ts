import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prismadb";

export const config = {
  api: {
    responseLimit: "100mb",
    bodyParser: {
      sizeLimit: "100mb", // Set desired value here
    },
  },
};

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
      throw new Error("Invalid ID");
    }

    if (!productId) {
      throw new Error("Invalid ID");
    }

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

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        name,
        price: parseFloat(price),
        homepage,
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
