import Link from 'next/link';
import { Product } from '@/types';

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 text-sm uppercase tracking-wider">
            <th className="py-4 px-6 font-semibold">Product</th>
            <th className="py-4 px-6 font-semibold">Description</th>
            <th className="py-4 px-6 font-semibold text-right">Price</th>
            <th className="py-4 px-6 font-semibold text-center">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {products.map((product) => (
            <tr 
              key={product.id} 
              className="hover:bg-gray-50/80 transition duration-150"
            >
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {product.name}
              </td>
              <td className="py-4 px-6 text-gray-600 max-w-xs truncate">
                {product.description ?? "No description"}
              </td>
              <td className="py-4 px-6 text-right font-semibold text-green-600 whitespace-nowrap">
                {product.price !== null ? `$${product.price}` : "N/A"}
              </td>
              <td className="py-4 px-6 text-center whitespace-nowrap">
                <div className="flex items-center justify-center space-x-2">
                  <Link
                    href={`/products/${product.id}?mode=view`}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-150"
                  >
                    View
                  </Link>
                  <Link
                    href={`/products/${product.id}?mode=edit`}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}