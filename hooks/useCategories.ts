import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCategories = () => {
  const url = "/api/categories";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCategories;