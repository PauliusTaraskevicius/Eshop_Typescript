import useCategories from "@/hooks/useCategories";

import CategoryItem from "./CategoryItem";

interface CategoriesListProps {
  userId?: string;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ userId }) => {
  const { data: categories = [] } = useCategories(userId);

  return (
    <div>
      {categories.map((category: Record<string, any>) => (
        <CategoryItem userId={userId} key={category.id} data={category} />
      ))}
    </div>
  );
};

export default CategoriesList;
