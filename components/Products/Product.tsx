import { useRouter } from "next/router";
import { useCallback } from "react";

import Image from "next/image";
import Button from "../Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useDeleteModal from "@/hooks/useDeleteModal";


interface ProductItemProps {
  data: Record<string, any>;
  userId?: string;
}

const Product: React.FC<ProductItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();
  const deleteModal = useDeleteModal()

  const goToProduct = useCallback(() => {
    router.push(`/products/${data.id}`);
  }, [router, data.id]);

  return (
    <div
      onClick={goToProduct}
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
      cursor-pointer 
      hover:bg-neutral-900 
      transition
    "
    >
      <div className="flex flex-row items-start gap-3">
        <div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-neutral-500 text-sm">{data.createdAt}</span>
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <Image
              width={250}
              height={250}
              alt="thumbnail"
              style={{ width: '250px', height: '250px' }}
              src={data.thumbnail}
            />
            <div
              className="
              flex 
              flex-row 
              items-center 
              text-neutral-500 
              gap-2 
              cursor-pointer 
              transition 
              hover:text-sky-500
          "
            >
              <p>
                {data.name} - Category: {data.category}
              </p>
            </div>
            {currentUser ? (
              <div>
              <Button secondary label="Edit" onClick={editModal.onOpen} />
              <Button secondary label="Delete" onClick={deleteModal.onOpen} />
              </div>
            ) : (
              <div></div>
            )}
            <div>{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
