import useProducts from "@/hooks/Products/useProducts";

import Product from "./Product";

interface ProductsListProps {
  userId?: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ userId }) => {
  const { data: products = [] } = useProducts(userId);

  return (
    <div>
      {products.map((product: Record<string, any>) => (
        <Product userId={userId} key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductsList;
