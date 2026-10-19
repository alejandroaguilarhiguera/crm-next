// src/pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ProductForm, { ProductFormData } from '@/components/ProductForm';
import { Box, Button, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProductDetailPageProps {
  product: ProductFormData | null;
  mode: 'view' | 'edit';
  id: string;
}

export default function ProductDetailPage({ product, mode, id }: ProductDetailPageProps) {

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          Product not found (ID: {id})
        </Typography>
      </Box>
    );
  }



  return (
    <Box>
      <ProductForm
        mode={mode}
        defaultValues={product}
      />
    </Box>
  );
}

// SSR para el Pages Router
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const mode = (context.query.mode as 'view' | 'edit') || 'view';
  console.log('id___'+id)
  try {
    const res = await fetch(`${process.env.API_HOST}/products/${id}`);
    
    if (!res.ok) {
      return { props: { product: null, mode, id } };
    }

    const product: ProductFormData = await res.json();
    return { props: { product, mode, id } };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null, mode, id } };
  }
};