import useCategories from "@/hooks/useCategories";

import CategoryItem from "./CategoryItem";

const CategoriesList = () => {
  const { data: categories = [] } = useCategories();

  return (
    <div>
      {categories.map((category: Record<string, any>) => (
        <CategoryItem  key={category.id} data={category} />
      ))}
    </div>
  );
};

export default CategoriesList;
