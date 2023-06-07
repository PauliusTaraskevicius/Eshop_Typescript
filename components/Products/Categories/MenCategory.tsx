import { useEffect, useState } from "react";
import Image from "next/image";

import useProducts from "@/hooks/Products/useProducts";
import Product from "../Product";

interface MenCategoryProductProps {
  userId?: string;
  TOP_OFFSET: string;
}

const MenCategory: React.FC<MenCategoryProductProps> = ({
  userId,
  TOP_OFFSET,
}) => {
  const { data: products = [] } = useProducts(userId);
  const [scalePic, setScalePic] = useState(false);

  const scaleOnScroll = () => {
    if (window.scrollY >= +TOP_OFFSET) {
      setScalePic(true);
    } else {
      setScalePic(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scaleOnScroll);
  }, []);

  const menProducts = products.filter((product: Record<string, any>) =>
    product.category.includes("Men")
  );

  return (
    <div>
      {menProducts.map((product: Record<string, any>) => (
        <div>
          <section className="relative flex flex-col md:flex-row  items-center justify-between">
            <div className="relative lg:block w-full md:w-1/2 xl:w-[50%] overflow-hidden inline-block">
              <div className="w-full">
                <Image
                  src={product.thumbnail}
                  width={720}
                  height={962}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>

              <div>
                <div className="absolute left-0 right-0 top-[13%] text-black text-center text-xs xl:text-base ">
                  <div className="pb-3.5">{product.name}</div>
                </div>
                <div className="absolute left-0 right-0 bottom-[5%] text-black text-center text-xs xl:text-base ">
                  <div className="inline-block xl:w-1/4">
                    <div className="pb-8">{product.description}</div>
                  </div>
                  <div className="underline underline-offset-4">Shop</div>
                </div>
              </div>
            </div>
            <div className=" lg:block w-full md:w-1/2 xl:w-[50%] overflow-hidden inline-block">
              <Image
                src="/../public/images/products/combo_watch.jpg"
                width={720}
                height={962}
                alt="thumbnail"
                className={
                  scalePic
                    ? "w-full object-cover scale-125 ease-in duration-500"
                    : "w-full object-cover ease-out duration-500"
                }
                quality={100}
              />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default MenCategory;
