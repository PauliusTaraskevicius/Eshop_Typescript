import { useEffect, useState } from "react";
import Image from "next/image";

import useProducts from "@/hooks/Products/useProducts";
import Product from "../Product";

interface WomenCategoryProductProps {
  userId?: string;
  TOP_OFFSET: number;
}

const WomenCategory: React.FC<WomenCategoryProductProps> = ({
  userId,
  TOP_OFFSET,
}) => {
  const { data: products = [] } = useProducts(userId);
  const [scalePic, setScalePic] = useState(false);

  const scaleOnScroll = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setScalePic(true);
    } else {
      setScalePic(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scaleOnScroll);
  }, []);

  const womenProducts = products.filter((product: Record<string, any>) =>
    product.category.includes("Women")
  );

  return (
    <div>
      {womenProducts.map((product: Record<string, any>) => (
        <div>
          <section className="relative flex flex-col md:flex-row  items-center justify-between">
            <div className=" lg:block w-full md:w-1/2 xl:w-[50%] overflow-hidden inline-block">
              <Image
                src="/../public/images/products/mens_watch.jpg"
                width={720}
                height={962}
                alt="thumbnail"
                className={
                  scalePic
                    ? "w-full object-cover  scale-125 ease-in duration-500"
                    : "w-full object-cover ease-out duration-500"
                }
                quality={100}
              />
            </div>

            <div
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
        </div>
      ))}
    </div>
  );
};

export default WomenCategory;