import { useCallback, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import useProduct from "@/hooks/Products/useProduct";
import useEditModal from "@/hooks/useEditModal";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

import { Categories } from "@prisma/client";
import { useRouter } from "next/router";

const EditProductModal = () => {
  const editModal = useEditModal();

  const router = useRouter();
  const { productId } = router.query;
  const { data: fetchedPost } = useProduct(productId as string);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [homepage, setHomepage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [currentInventory, setCurrentInventory] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/products/edit?id=" + productId, {
        name,
        price,
        homepage,
        thumbnail,
        brand,
        category,
        currentInventory,
        description,
      });

      toast.success("Product updated");
      setName("");
      setPrice("");
      setHomepage("");
      setThumbnail("");
      setBrand("");
      setCategory(""), setCurrentInventory("");
      setDescription("");
      editModal.onClose();
      // router.push("/");
      router.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    price,
    homepage,
    thumbnail,
    brand,
    category,
    currentInventory,
    description,
    editModal,
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
        value={homepage}
        onChange={(homepage) => setHomepage(homepage)}
        label="Upload homepage image"
      />
      <ImageUpload
        disabled={isLoading}
        value={thumbnail}
        onChange={(thumbnail) => setThumbnail(thumbnail)}
        label="Upload cover thumbnail"
      />
      <Input
        disabled={isLoading}
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <select
        id="category"
        name="category"
        className="
        w-full
        p-4 
        text-sm
        lg:text-xl 
        bg-black 
        border-2
        border-neutral-800 
        rounded-md
        outline-none
        text-gray-400
        focus:border-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-60
        disabled:cursor-not-allowed"
        onChange={(e) => setCategory(e.target.value as Categories)}
      >
        {[Categories.General, Categories.Men, Categories.Women].map(
          (category: Categories) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
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
    <div className="text-neutral-400 text-center pb-4">
      {/* <p>
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
      </p> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit product info"
      actionLabel="Submit"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default EditProductModal;
