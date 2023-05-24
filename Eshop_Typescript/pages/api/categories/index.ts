import { NextApiRequest, NextApiResponse } from "next";

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
      const { name } = req.body;

      const category = await prisma.category.create({
        data: {
          name,
        }
      })

      return res.status(200).json(category);
    }

    if(req.method === 'GET') {
      const categories = await prisma.category.findMany();

      return res.status(200).json(categories);
    }
    // if (req.method === "GET") {
    //   const categories = await prisma.category.findMany({
    //     select: {
    //       id: true,
    //       name: true,
    //       products: {
    //         orderBy: {
    //           createdAt: "desc",
    //         },
    //         take: 8,
    //         select: {
    //           name: true,
    //           description: true,
    //           price: true,
    //           brand: true,
    //           thumbnail: true,
    //           image1: true,
    //           image2: true,
    //           image3: true,
    //           image4: true,
    //         },
    //       },
    //     },

    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });

    //   return res.status(200).json({ categories });
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
