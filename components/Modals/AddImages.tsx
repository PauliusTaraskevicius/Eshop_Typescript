import { useCallback, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import useProduct from "@/hooks/Products/useProduct";
import useAddImages from "@/hooks/useAddImages";

import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

import { useRouter } from "next/router";

const AddImages = () => {
  const addImagesModal = useAddImages();

  const router = useRouter();
  const { productId } = router.query;
  const { data: fetchedPost } = useProduct(productId as string);

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/products/addImages?id=" + productId, {
        image1,
        image2,
        image3,
        image4,
        image5,
      });

      toast.success("Imaged added");
      setImage1("");
      setImage2("");
      setImage3("");
      setImage4("");
      setImage5("");
      addImagesModal.onClose();
      // router.push("/");
      router.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [image1, image2, image3, image4, image5]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        disabled={isLoading}
        value={image1}
        onChange={(image) => setImage1(image)}
        label="Upload image"
      />
      <ImageUpload
        disabled={isLoading}
        value={image2}
        onChange={(image) => setImage2(image)}
        label="Upload image"
      />
      <ImageUpload
        disabled={isLoading}
        value={image3}
        onChange={(image) => setImage3(image)}
        label="Upload image"
      />
      <ImageUpload
        disabled={isLoading}
        value={image4}
        onChange={(image) => setImage4(image)}
        label="Upload image"
      />
      <ImageUpload
        disabled={isLoading}
        value={image5}
        onChange={(image) => setImage5(image)}
        label="Upload image"
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
      isOpen={addImagesModal.isOpen}
      title="Add images"
      actionLabel="Submit"
      onClose={addImagesModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddImages;
