import ProductList from "@/components/ProductList";
import { Product, Meta } from '@/types';

interface PayloadProducts {
  data: Product[];
  // meta: Meta;
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_HOST}/products`);
  const products: Product[] = await res.json();

  return {
    props: { products },
  };
}


export default function ProductsPage({ products }: { products: Product[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
      <ProductList products={products} />
    </div>
  );
}
