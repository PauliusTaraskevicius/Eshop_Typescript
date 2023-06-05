import { useEffect, useState } from "react";

import Image from "next/image";

import useProducts from "@/hooks/Products/useProducts";

import Product from "./Product";

interface ProductsListProps {
  userId?: string;
}

const TOP_OFFSET = 70;

const ProductsList: React.FC<ProductsListProps> = ({ userId }) => {
  const { data: products = [] } = useProducts(userId);

  const [picZoom, setPicZoom] = useState(false);

  const zoomOnScroll = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setPicZoom(true);
    } else {
      setPicZoom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", zoomOnScroll);
  }, []);

  return (
    <div>
      {products.map((product: Record<string, any>) => (
        // <Product userId={userId} key={product.id} data={product} />

        <section className="relative flex flex-col md:flex-row  items-center justify-between">
          <div className=" lg:block w-full md:w-1/2 xl:w-[50%] overflow-hidden inline-block">
            <Image
              src="/../public/images/products/mens_watch.jpg"
              width={720}
              height={962}
              alt="thumbnail"
              className={
                picZoom
                  ? "w-full object-cover  scale-125 ease-in duration-500"
                  : "w-full object-cover"
              }
              quality={100}
            />
          </div>

          <div
          // buvo w-1/2
            className="relative w-full md:max-w-md lg:max-w-full md:mx-auto md:w-[40%] xl:w-[40%] px-6 py-6 lg:py-0 lg:px-0 
        flex items-center justify-center"
          >
            <div className="w-full">
              <Image
                src={product.thumbnail}
                width={526}
                height={692}
                alt="thumbnail"
                className="w-full h-full object-cover"
                quality={100}
              />
            </div>

            <div>
              <div className="absolute left-0 right-0 bottom-[13%] text-white text-center text-xs xl:text-base ">
                <div className="pb-3.5">{product.name}</div>
                <div className="inline-block xl:w-1/4">
                  <div className="pb-8">{product.description}</div>
                </div>
                <div className="underline underline-offset-4">Shop</div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductsList;
