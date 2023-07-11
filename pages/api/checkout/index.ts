import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import prismadb from "@/libs/prismadb";

import { NextApiRequest, NextApiResponse } from "next";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { productIds } = req.body;
      if (!productIds || productIds.length === 0) {
        return res.status(405).end();
      }

      const products = await prismadb.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      products.forEach((product) => {
        line_items.push({
          quantity: 1,
          price_data: {
            currency: "EUR",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
        });
      });

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      });

      res.status(200).json({ url: session.url });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
