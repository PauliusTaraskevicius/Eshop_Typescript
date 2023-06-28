import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

import useProduct from "@/hooks/Products/useProduct";

import Product from "@/components/Products/Product";

const PostView = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data: fetchedPost, isLoading } = useProduct(productId as string);

  const fadeIn = {
    hidden: {
      // y: "-100vh",
      // scale: 0,
      opacity: 0,
    },
    visible: {
      // y: "0",
      // scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 100,
        stiffness: 500,
      },
    },
    exit: {
      // y: "100vh",
      // scale: 0,
      opacity: 0,
    },
  };

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="blue" size={100} />
      </div>
    );
  }

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Product data={fetchedPost} />
    </motion.div>
  );
};

export default PostView;
