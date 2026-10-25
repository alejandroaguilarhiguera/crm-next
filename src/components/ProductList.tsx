import { Product } from '@/types';
import MenuActions from '@/components/Menu';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { onDeleteProduct } from '@/lib/onDeleteProduct';

export default function ProductList({ products, handleDelete }: { handleDelete: (id: number) => void; products: Product[] }) {
  const router = useRouter();
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Price</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>

            <TableCell align="right">
              <MenuActions
                onViewRedirect={`/products/${product.id}?mode=view`}
                onEditRedirect={`/products/${product.id}?mode=edit`}
                onDelete={() => {
                  onDeleteProduct(product.id).then((ok) => {
                    if (ok) {
                      handleDelete(product.id);
                    }
                  })
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}