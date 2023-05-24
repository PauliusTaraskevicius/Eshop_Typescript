import { useRouter } from "next/router";
import { useCallback } from "react";

interface ProductItemProps {
  data: Record<string, any>;
  userId?: string;
}

const Product: React.FC<ProductItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();

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
        <div className="text-white mt-1">{data.name}</div>
        <div className="flex flex-row items-center mt-3 gap-10">
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
   
            <p>{data.name} - {data.userId}</p>
          </div>
         
        </div>
      </div>
    </div>
  </div>
  )

};

export default Product;
