import { useEffect, useState } from "react";
import Link from "next/link";

import useCart from "@/hooks/useCart";

import { IoIosArrowBack } from "react-icons/io";

import Container from "@/components/Cart/Container";
import Summary from "@/components/Cart/Summary";
import CartItem from "@/components/Cart/CartItem";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-4">
            <Link
              href="/"
              className="hover:bg-gray-200 rounded-full px-2 py-2 transition"
            >
              <IoIosArrowBack size={20} />
            </Link>
            <h1 className="text-sm: md:text-3xl font-bold text-black">Shopping Cart</h1>
          </div>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
