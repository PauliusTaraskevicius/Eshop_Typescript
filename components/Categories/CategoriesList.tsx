import useCategories from "@/hooks/useCategories";

const CategoriesList = () => {
  const { data: categories = [] } = useCategories();

  return (
    <div>
      {categories.map((category: Record<string, any>) => (
        <h1>{category.name}</h1>
      ))}
    </div>
  );
};

export default CategoriesList;
