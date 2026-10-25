// src/pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import { Box, Container, Typography } from '@mui/material';
import ProductLayout from '@/components/ProductLayout';
import { Product } from '@/types';

interface ProductDetailPageProps {
  product: Product | null;
  mode: 'new' | 'view' | 'edit';
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
    <Container>
      <ProductLayout mode={mode} product={product} />
    </Container>
  );
}

// SSR para el Pages Router
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const mode = (context.query.mode as 'view' | 'edit' | 'new') || 'view';
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products/${id}`);
    
    if (!res.ok) {
      return { props: { product: null, mode, id } };
    }

    const product: Product = await res.json();
    return { props: { product, mode, id } };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null, mode: 'new', id } };
  }
};