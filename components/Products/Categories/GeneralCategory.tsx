import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useProducts from "@/hooks/Products/useProducts";
import Product from "../Product";

import SlideRightAnimation from "@/components/ui/SlideRightAnimation";
import SlideUpAnimation from "@/components/ui/SlideUpAnimation";

interface GenerallCategoryProductProps {
  userId?: string;
  TOP_OFFSET: string;
}

const GenerallCategory: React.FC<GenerallCategoryProductProps> = ({
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

  const generallProducts = products.filter((product: Record<string, any>) =>
    product.category.includes("General")
  );

  return (
    <div id="general">
      {generallProducts.map((product: Record<string, any>) => (
        <div>
          <section className="flex flex-col md:flex-row  items-center justify-between">
            <div className="relative lg:block w-full md:w-1/2 xl:w-[50%] overflow-hidden inline-block ">
              <SlideRightAnimation>
                <Image
                  src={product.homepage}
                  width={720}
                  height={962}
                  alt="thumbnail"
                  className={
                    scalePic
                      ? "w-full object-cover scale-125 ease-in duration-500"
                      : "w-full object-cover ease-out duration-500"
                  }
                />
              </SlideRightAnimation>

              <div className="absolute top-[50%] left-0 right-0 text-center">
                <p className="text-white">MEMORIES OF MY JOURNEY</p>
              </div>
            </div>

            <div className="relative w-full md:max-w-md lg:max-w-full md:mx-auto md:w-[40%] xl:w-[40%] px-6 py-6 lg:py-0 lg:px-0">
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <SlideUpAnimation>
                    <Link href={`products/${product.id}`}>
                      <Image
                        src={product.thumbnail}
                        width={620}
                        height={548}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </SlideUpAnimation>
                </div>
              </div>
              <div className="absolute mt-10 xl:mt-[110px] text-center md:text-left leading-[125.4%] text-sm xl:text-lg opacity-[54%] w-[90%]">
                <q>{product.description}</q>
                <p className="underline underline-offset-4 mt-6">Discover</p>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default GenerallCategory;
