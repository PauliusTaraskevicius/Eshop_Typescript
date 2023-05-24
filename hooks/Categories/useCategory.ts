import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCategory = (categoryId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    categoryId ? `/api/categories/${categoryId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCategory;
