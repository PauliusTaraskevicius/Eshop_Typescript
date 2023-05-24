import CategoriesList from "@/components/Categories/CategoriesList";
import ProductsList from "@/components/Products/ProductsList";


export default function Home() {
  return (
    <div>
      <CategoriesList />
      <ProductsList />
    </div>
  );
}
