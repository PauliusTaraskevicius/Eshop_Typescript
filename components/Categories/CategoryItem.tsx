import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

interface CategoryItemProps {
  data: Record<string, any>;
  userId?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();

  const goToCategory = useCallback(() => {
    router.push(`/categories/${data.id}`);
  }, [router, data.id]);

  return (
    <div
    onClick={goToCategory}
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
        <div className="text-white mt-1">{data.body}</div>
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
   
            <p>{data.name}</p>
          </div>
         
        </div>
      </div>
    </div>
  </div>
  )

};

export default CategoryItem;
