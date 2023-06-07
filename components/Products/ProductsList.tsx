import { useEffect, useState } from "react";

import Image from "next/image";

import useProducts from "@/hooks/Products/useProducts";

import Product from "./Product";

import WomenCategory from "./Categories/WomenCategory";
import MenCategory from "./Categories/MenCategory";
import GenerallCategory from "./Categories/GeneralCategory";

interface ProductsListProps {
  userId?: string;
}

const TOP_OFFSET = 70;

const ProductsList: React.FC<ProductsListProps> = ({ userId }) => {
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
      {/* <Product userId={userId} key={product.id} data={product}/> */}
      <WomenCategory TOP_OFFSET={TOP_OFFSET} />
      <MenCategory TOP_OFFSET="2300" />
      <GenerallCategory TOP_OFFSET="3000"/>
    </div>
  );
};

export default ProductsList;