import { Product } from '@/types';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-gray-200 rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-2">
            {product.description ?? "Sin descripción"}
          </p>
          <p className="text-green-600 font-bold mt-4">
            {product.price !== null ? `$${product.price}` : "Precio no disponible"}
          </p>
        </div>
      ))}
    </div>
  );
}
