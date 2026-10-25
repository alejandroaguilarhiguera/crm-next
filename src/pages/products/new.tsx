// src/pages/products/[id].tsx
import { Container } from '@mui/material';
import ProductLayout from '@/components/ProductLayout';

export default function NewProduct() {
  return (
    <Container>
      <ProductLayout mode={'new'} />
    </Container>
  );
}
