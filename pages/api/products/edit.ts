import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prismadb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
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
      image1,
      image2,
      image3,
      image4,
      image5,
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
        image1,
        image2,
        image3,
        image4,
        image5,
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
