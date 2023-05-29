import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useProduct from "@/hooks/Products/useProduct";

import Product from "@/components/Products/Product";

const PostView = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data: fetchedPost, isLoading } = useProduct(productId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Product data={fetchedPost} />
    </>
  );
};

export default PostView;
