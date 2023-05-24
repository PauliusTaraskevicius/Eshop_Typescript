import { useCallback, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import Input from "../Input";
import Modal from "../Modal";

import useCategoryModal from "@/hooks/Categories/useCategoryModal";

const CategoryModal = () => {
  const categoryModal = useCategoryModal();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/categories", {
        name,
      });

      toast.success("Category created");
      setName("");
      categoryModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [name, categoryModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      isOpen={categoryModal.isOpen}
      title="Create a category"
      actionLabel="Create"
      onClose={categoryModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default CategoryModal;
