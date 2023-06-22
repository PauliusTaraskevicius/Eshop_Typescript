import { useRouter } from "next/router";
import { useState, useCallback } from "react";

import Image from "next/image";
import Button from "../Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useDeleteModal from "@/hooks/useDeleteModal";

import useProducts from "@/hooks/Products/useProducts";
import Carousel from "../Carousel/Carousel";

import SlideRightAnimation from "../ui/SlideRightAnimation";
import FadeInAnimation from "../ui/FadeInAnimation";

interface ProductItemProps {
  data: Record<string, any>;
  userId?: string;
}

const Product: React.FC<ProductItemProps> = ({ data = {}, userId }) => {
  const [shippingOpen, setShippingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { data: products = [] } = useProducts(userId);

  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();
  const deleteModal = useDeleteModal();

  const goToProduct = useCallback(() => {
    router.push(`/products/${data.id}`);
  }, [router, data.id]);

  const shippingHandler = () => setShippingOpen(!shippingOpen);
  const contactHandler = () => setContactOpen(!contactOpen);

  return (
    <div className="md:flex items-start justify-center py-12 pt-[150px] lg:pt-[300px] px-6">
      {/* Mobile pics */}
      <div className="md:hidden">
        <img
          className="w-full"
          alt="image of a girl posing"
          src="https://i.ibb.co/QMdWfzX/component-image-one.png"
        />
        <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
          <img
            alt="image-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
          />
          <img
            alt="image-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
          />
          <img
            alt="image-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
          />
          <img
            alt="image-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
          />
        </div>
      </div>

      <div className="xl:w-2/5 md:w-1/2 md:mt-0 mt-6">
        <p className="text-sm lg:text-lg pb-2">{data.category}</p>
        <h1 className="lg:text-[48px] text-xl mt-10">{data.name}</h1>

        <p className="xl:pr-48 text-base lg:text-lg lg:leading-7 leading-normal mt-10 md:mt-[100px] opacity-[70%]">
          {data.description}
        </p>

        <button className="flex items-center justify-center text-sm md:text-base leading-none text-white hover:text-black bg-purple-700  hover:bg-gray-200 transition ease-in rounded-full mt-10 md:mt-[100px] w-3/4 py-6">
          ADD TO BAG
          <span className="px-2 lg:px-4">{data.price}€</span>
        </button>

        {currentUser ? (
          <div className="flex gap-x-5">
            <Button secondary label="Edit" onClick={editModal.onOpen} />
            <Button secondary label="Delete" onClick={deleteModal.onOpen} />
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <div className="py-4 mt-10 md:mt-[100px]">
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
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                contactOpen
                  ? " pt-4 text-base leading-normal pr-12 mt-4 opacity-[54%]"
                  : "hidden pt-4 text-base leading-normal pr-12 mt-4 "
              }
              id="sect"
            >
              If you have any questions on how to return your item to us,
              contact us.
            </div>
          </div>
        </div>
        {/* Carousel */}
        <Carousel loop>
          <div className="relative flex justify-center items-center flex-[0_0_100%] mt-10">
            <Image
              src={data.thumbnail}
              width={320}
              height={962}
              loading="lazy"
              className="object-cover rounded-lg max-h-[600px] w-full mx-2 lg:mx-10"
              alt={data.title}
              quality={100}
            />
            <Image
              src={data.thumbnail}
              width={320}
              height={962}
              loading="lazy"
              className="object-cover rounded-lg max-h-[600px] w-full mx-2 lg:mx-10"
              alt={data.title}
              quality={100}
            />
            <Image
              src={data.thumbnail}
              width={320}
              height={962}
              loading="lazy"
              className="object-cover rounded-lg max-h-[600px] w-full mx-2 lg:mx-10"
              alt={data.title}
              quality={100}
            />
            <Image
              src={data.thumbnail}
              width={320}
              height={962}
              loading="lazy"
              // max-h-96
              className="object-cover rounded-lg max-h-[600px] w-full mx-2 lg:mx-10"
              alt={data.title}
              quality={100}
            />
          </div>
        </Carousel>
      </div>

      <div className="product xl:w-2/6 lg:w-2/5 w-80 md:block hidden overflow-scroll mx-10 h-[100rem]">
        <SlideRightAnimation>
          <Image
            width={720}
            height={962}
            loading="lazy"
            className="w-full"
            // className="object-cover rounded-lg max-h-[600px] w-full px-6 lg:mx-10"
            alt={data.title}
            quality={100}
            src={data.thumbnail}
          />

          <Image
            width={720}
            height={962}
            loading="lazy"
            className="mt-6 w-full"
            // className="object-cover rounded-lg max-h-[600px] w-full px-6 mt-6 lg:mx-10"
            alt={data.title}
            quality={100}
            src={data.thumbnail}
          />

          <Image
            width={720}
            height={962}
            className="mt-6 w-full"
            // className="object-cover rounded-lg max-h-[600px] w-full px-6 mt-6 lg:mx-10"
            alt={data.title}
            quality={100}
            src={data.thumbnail}
          />
        </SlideRightAnimation>
      </div>
    </div>
  );
};

export default Product;
