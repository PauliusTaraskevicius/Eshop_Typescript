import { MouseEventHandler, useState, useCallback } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import { StaticImageData } from "next/image";

import Button from "../Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useCart from "@/hooks/useCart";
import useLoginModal from "@/hooks/useLoginModal";

import { Product as ProductType } from "@/types";

import useDeleteModal from "@/hooks/useDeleteModal";

import Carousel from "../Carousel/Carousel";

import SlideRightAnimation from "../ui/SlideRightAnimation";

import image1 from "../../public/images/products/gallery_img.jpg";
import image2 from "../../public/images/products/gallery_img.jpg";
import image3 from "../../public/images/products/gallery_img.jpg";
import image4 from "../../public/images/products/gallery_img.jpg";

interface ProductItemProps {
  // data: Record<string, any>;
  data: ProductType;
  userId?: string;
}

const Product: React.FC<ProductItemProps> = ({ data, userId }) => {
  const [shippingOpen, setShippingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { data: currentUser } = useCurrentUser();

  const editModal = useEditModal();
  const deleteModal = useDeleteModal();
  const cart = useCart();
  const loginModal = useLoginModal();

  const router = useRouter();

  const shippingHandler = () => setShippingOpen(!shippingOpen);
  const contactHandler = () => setContactOpen(!contactOpen);

  const images: string[] | StaticImageData[] = [image1, image2, image3, image4];

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [currentUser, loginModal, router]);

  return (
    <div className="md:flex items-start justify-center py-12 pt-[150px] lg:pt-[300px] px-6">
      {/* Mobile pics */}
      <div className="md:hidden">
        <Carousel>
          {images.map((image: string | StaticImageData, i: number) => (
            <div
              className="relative flex justify-center items-center flex-[0_0_100%]"
              key={i}
            >
              <Image
                src={image ? image : "/../public/images/products/default.jpg"}
                width={320}
                height={962}
                loading="lazy"
                className="object-cover rounded-lg min-w-[33%] max-h-[600px] w-full mx-2 lg:mx-10"
                alt="image"
                quality={100}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="xl:w-2/5 md:w-1/2 md:mt-0 mt-6">
        <p className="text-sm lg:text-lg pb-2">{data.category}</p>
        <h1 className="lg:text-[48px] text-xl mt-10">{data.name}</h1>

        <p className="xl:pr-48 text-base lg:text-lg lg:leading-7 leading-normal mt-10 md:mt-[100px] opacity-[70%]">
          {data.description}
        </p>

        {currentUser ? (
          <div className="flex flex-col md:flex md:flex-row justify-center items-center  gap-x-5 px-2">
            <Button
              secondary
              large
              label="Add to bag"
              onClick={(e) => onAddToCart(e)}
            />
            <Button
              secondary
              large
              label="Edit item"
              onClick={editModal.onOpen}
            />
            <Button
              secondary
              large
              label="Delete item"
              onClick={deleteModal.onOpen}
            />
          </div>
        ) : (
          <div>
            <div className="pt-4 text-base leading-normal mt-8 opacity-[54%] text-center">
              In order to buy product you must be logged in.
            </div>
            <div onClick={onClick} className="flex justify-center items-center">
              <Button
                label="Login"
                secondary
                large
                onClick={loginModal.onOpen}
              />
            </div>
          </div>
        )}

        <div>
          <div className="py-4 mt-10 lg:mt-[100px]">
            <div
              data-menu
              className="flex justify-between items-center cursor-pointer"
            >
              <p onClick={shippingHandler} className="text-base leading-4 ">
                Shipping and returns
              </p>
              <button
                onClick={shippingHandler}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
                role="button"
                aria-label="show or hide"
              >
                <svg
                  className="transform"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                shippingOpen
                  ? "pt-4 text-base leading-normal pr-12 mt-4 opacity-[54%]"
                  : "hidden pt-4 text-base leading-normal pr-12 mt-4 "
              }
              id="sect"
            >
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are nonrefundable
            </div>
          </div>
        </div>
        <div>
          <div className="py-4 ">
            <div
              data-menu
              className="flex justify-between items-center cursor-pointer"
            >
              <p onClick={contactHandler} className="text-base leading-4 ">
                Contact us
              </p>
              <button
                onClick={contactHandler}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
                role="button"
                aria-label="show or hide"
              >
                <svg
                  className="transform  "
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className={
                contactOpen
                  ? " pt-4 text-base leading-normal pr-12 mt-4 opacity-[54%]"
                  : "hidden pt-4 text-base leading-normal pr-12 mt-4"
              }
              id="sect"
            >
              If you have any questions on how to return your item to us,
              contact us.
            </div>
          </div>
        </div>
        {/* Carousel */}
        <Carousel>
          {images.map((image: string | StaticImageData, i: number) => (
            <div
              className="relative hidden md:flex justify-center items-center h-64 flex-[0_0_50%] mt-0 lg:mt-10"
              key={i}
            >
              <Image
                src={image ? image : "/../public/images/products/default.jpg"}
                width={320}
                height={962}
                loading="lazy"
                className="object-cover min-w-[33%] lg:min-w-max rounded-lg max-h-[600px] w-full mx-2 lg:mx-10"
                alt="image"
                quality={100}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="product xl:w-2/6 lg:w-2/5 w-80 md:block hidden overflow-scroll mx-10 h-[100rem]">
        <SlideRightAnimation>
          <Image
            width={720}
            height={962}
            className="w-full"
            alt={data.title}
            src={data.thumbnail}
            quality={100}
          />

          <Image
            width={720}
            height={962}
            className="mt-6 w-full"
            alt={data.title}
            src={data.homepage}
            quality={100}
          />
        </SlideRightAnimation>
      </div>
    </div>
  );
};

export default Product;
