import ProductList from "../../src/components/ProductList";
export interface Product     {
  "id": number;
  "documentId": string;
  "name": string;
  "description": string | null;
  "price": number | null;
  "createdAt": string;
  "updatedAt": string;
  "publishedAt": string;
  "locale": string;
}
interface PayloadProducts {
  data: Product[]
  "meta": {
    "pagination": {
      "page": number;
      "pageSize": number;
      "pageCount": number;
      "total": number;
    }
  }
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:1337/api/products");
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
