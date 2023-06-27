import { useCallback, useState, useEffect } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import useProduct from "@/hooks/Products/useProduct";
import useDeleteModal from "@/hooks/useDeleteModal";

import Modal from "../Modal";

import { useRouter } from "next/router";

const DeleteProductModal = () => {
  const deleteModal = useDeleteModal();

  const router = useRouter();
  const { productId } = router.query;
  const { data: fetchedPost } = useProduct(productId as string);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.delete("/api/products/delete?id=" + productId);

      toast.success("Product deleted");

      deleteModal.onClose();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [deleteModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-center">
        Are you sure you want to delete this product?
      </h1>
    </div>
  );

  const footerContent = <div className="pb-4"></div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteModal.isOpen}
      title="Delete product"
      actionLabel="Submit"
      onClose={deleteModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default DeleteProductModal;
