import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useProducts = (userId?: string) => {
  const url = userId ? `/api/products?userId=${userId}` : "api/products";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProducts;
