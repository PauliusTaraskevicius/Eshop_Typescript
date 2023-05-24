import { useEffect, useState } from "react";

import Image from "next/image";

const men = [
  {
    model: "N.52 26 Watch",
    title: "Tossil",
    year_made: 2022,
    price: 2000,
    thumbail: "/images/thumbnail.jpg",
    picture_1: "/images/pictures_1_test.jpg",
    picture_2: "https://img.icons8.com/color/180/null/apple-calculator.png",
    picture_3: "https://img.icons8.com/color/180/null/apple-calculator.png",
    picture_4: "https://img.icons8.com/color/180/null/apple-calculator.png",
  },
];

const women = [
  {
    model: "Mark Veum",
    title: "Tossil",
    year_made: 2023,
    price: 1500,
    thumbail: "/images/thumbnail_1.jpg",
    picture_1: "/images/picture_1.jpg",
    picture_2: "https://img.icons8.com/color/180/null/apple-calculator.png",
    picture_3: "https://img.icons8.com/color/180/null/apple-calculator.png",
    picture_4: "https://img.icons8.com/color/180/null/apple-calculator.png",
  },
];

const featured_product = [
  {
    model: "Quartz",
    year_made: 2022,
    price: 1280,
    thumbail: "/images/thumbnail_1.jpg",
    picture_1: "/images/picture_1.jpg",
    picture_2: "https://img.icons8.com/color/180/null/apple-calculator.png",
    picture_3: "https://img.icons8.com/color/180/null/apple-calculator.png",
    picture_4: "https://img.icons8.com/color/180/null/apple-calculator.png",
  },
];

const TOP_OFFSET = 400;

const ProductFeed = () => {
  const [scaleDownThumbnail, setScaleDownThumbnail] = useState(false);

  const scaleDown = () => {
    if (window.scrollY >= TOP_OFFSET) {
      setScaleDownThumbnail(true);

    } else {
      setScaleDownThumbnail(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scaleDown);
  }, []);

  return (
    <div>
      {men.map((post) => (
        <div className="w-full ">
          <div className="flex flex-col justify-between items-center  md:flex-row">
            <div className=" md:w-1/2 ">
              <div className="block overflow-hidden">
                <Image
                  className={
                    scaleDownThumbnail
                      ? "transition duration-1000 ease-in-out scale-125"
                      : "transition duration-1000 ease-in-out "
                  }
                  width="1280"
                  height="720"
                  src={post.thumbail}
                  alt="thumbnail"
                  unoptimized
                />
              </div>
            </div>
            <div className="md:w-2/5">
              <div className="relative flex justify-center">
                <Image
                  width="1280"
                  height="720"
                  src={post.picture_1}
                  alt="thumbnail"
                  unoptimized
                />
                <div className="absolute bottom-6 lg:bottom-20">
                  <p className="text-white text-md lg:text-xl text-center pb-[14px]">
                    {post.model}
                  </p>
                  <p className="text-white text-md lg:text-xl text-center">
                    A TIMELESS WATCH
                  </p>
                  <p className="text-white text-md lg:text-xl pb-[30px]">
                    DESIGNED TO ETERNITY
                  </p>

                  <p className="text-white underline text-md lg:text-xl text-center">
                    Shop
                  </p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}

      {women.map((post) => (
        <div className="w-full">
          <div className="flex flex-col justify-between items-center md:flex-row">
            <div></div>

            <div className="md:w-1/2">
              <div className="block ">
                <Image
                  width="1280"
                  height="720"
                  src={post.thumbail}
                  alt="thumbnail"
                  unoptimized
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="relative flex justify-center overflow-hidden">
                <Image
                
                  width="1280"
                  height="720"
                  src={post.picture_1}
                  alt="thumbnail"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductFeed;
