import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (categoryId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    categoryId ? `/api/products/${categoryId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
