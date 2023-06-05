import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { toast } from "react-hot-toast";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

import useProduct from "@/hooks/Products/useProduct";
import useProductModal from "@/hooks/Products/useProductModal";

import { Categories } from "@prisma/client";
import { data } from "autoprefixer";

const ProductModal = () => {
  const router = useRouter();
  const productModal = useProductModal();
  const { productId } = router.query;
  const { data: fetchedPost } = useProduct(productId as string);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [currentInventory, setCurrentInventory] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/products", {
        name,
        price,
        thumbnail,
        brand,
        category,
        currentInventory,
        description,
      });

      toast.success("Product created");
      setName("");
      setPrice("");
      setThumbnail("");
      setBrand("");
      setCategory(""), setCurrentInventory("");
      setDescription("");
      productModal.onClose();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    name,
    price,
    thumbnail,
    brand,
    category,
    currentInventory,
    description,
    productModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <ImageUpload
        disabled={isLoading}
        value={thumbnail}
        onChange={(thumbnail) => setThumbnail(thumbnail)}
        label="Upload cover thumbnail"
      />
      <select
        id="category"
        name="category"
        onChange={(e) => setCategory(e.target.value as Categories)}
      >
        {[Categories.General, Categories.Men, Categories.Women].map(
          (category: Categories) => {
            return <option key={category} value={category}>{category}</option>;
          }
        )}
      </select>

      <Input
        disabled={isLoading}
        placeholder="Current Invetory"
        value={currentInventory}
        onChange={(e) => setCurrentInventory(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={productModal.isOpen}
      title="Create a product"
      actionLabel="Create"
      onClose={productModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ProductModal;
