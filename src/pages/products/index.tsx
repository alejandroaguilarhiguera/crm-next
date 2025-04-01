import ProductList from "@/components/ProductList";
import { Product, Meta } from '@/types';

interface PayloadProducts {
  data: Product[];
  meta: Meta;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_HOST}/products`);
  const { data: products }: PayloadProducts = await res.json();

  return {
    props: { products },
  };
}


export default function ProductsPage({ products }: { products: Product[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
      <ProductList products={products} />
    </div>
  );
}
