import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Product from "./Product";

import WomenCategory from "./Categories/WomenCategory";
import MenCategory from "./Categories/MenCategory";
import GenerallCategory from "./Categories/GeneralCategory";
import Carousel from "../Carousel/Carousel";

import useProducts from "@/hooks/Products/useProducts";
import { data } from "autoprefixer";

interface ProductsListProps {
  userId?: string;
}

const TOP_OFFSET = 70;

const ProductsList: React.FC<ProductsListProps> = ({ userId }) => {
  const [picZoom, setPicZoom] = useState(false);

  const { data: products = [] } = useProducts(userId);

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
      <WomenCategory TOP_OFFSET={TOP_OFFSET} />
      <MenCategory TOP_OFFSET="2300" />
      <GenerallCategory TOP_OFFSET="3000" />
      <div className=" w-full mt-28 lg:mt-0">
        <div className="flex justify-center items-center h-40">
          <h2>All PRODUCTS</h2>
        </div>
        <div className="flex justify-center items-center text-center px-4">
          <p>
            We are committed to the environment and sustainability therefore our
            watches are crafted in limited quantities and are available only
            through this digital flagship.
          </p>
        </div>
        <Carousel loop>
          {products.map((product: Record<string, any>, i: string) => (
            // 👇 style each individual slide.
            // relative - needed since we use the fill prop from next/image component
            // h-64 - arbitrary height
            // flex[0_0_100%]
            //   - shorthand for flex-grow:0; flex-shrink:0; flex-basis:100%
            //   - we want this slide to not be able to grow or shrink and take up 100% width of the viewport.
            <div className="relative h-64 xl:h-[400px] flex-[0_0_100%]" key={i}>
              {/* use object-cover + fill since we don't know the height and width of the parent */}
              <Link href={`products/${product.id}`}>
                <Image
                  src={product.thumbnail}
                  fill
                  // width={500}
                  // height={250}
                  loading="lazy"
                  className="object-contain"
                  // className="h-screen bg-cover bg-center bg-no-repeat"
                  alt={product.title}
                  quality={100}
                />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsList;
