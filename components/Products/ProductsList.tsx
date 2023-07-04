import Image from "next/image";
import Link from "next/link";

import { ClipLoader } from "react-spinners";

import WomenCategory from "./Categories/WomenCategory";
import MenCategory from "./Categories/MenCategory";
import GenerallCategory from "./Categories/GeneralCategory";
import Carousel from "../Carousel/Carousel";

import useProducts from "@/hooks/Products/useProducts";

interface ProductsListProps {
  userId?: string;
}

const TOP_OFFSET = 70;

const ProductsList: React.FC<ProductsListProps> = ({ userId }) => {
  const { data: products = [], isLoading } = useProducts(userId);

  if (isLoading || !products) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="blue" size={100} />
      </div>
    );
  }
  return (
    <div>
      <WomenCategory TOP_OFFSET={TOP_OFFSET} />
      <MenCategory TOP_OFFSET="2300" />
      <GenerallCategory TOP_OFFSET="3000" />

      <div className="w-full mt-28 lg:my-auto">
        <div className="flex justify-center items-center h-40">
          <h2>All PRODUCTS</h2>
        </div>
        <div className="flex justify-center items-center text-center px-4">
          <p className="leading-[125.4%] opacity-[54%]">
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
            <div
              className="relative flex justify-center items-center h-64 xl:h-[600px] flex-[0_0_50%] mt-10 lg:mt-28"
              key={i}
            >
              {/* use object-cover + fill since we don't know the height and width of the parent */}
              <Link href={`products/${product.id}`}>
                <Image
                  src={product.thumbnail}
                  // fill
                  width={720}
                  height={962}
                  loading="lazy"
                  // max-h-96
                  className="object-cover rounded-lg max-h-[600px] w-full mx-auto lg:mx-10"
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
