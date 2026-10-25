import ProductList from "@/components/ProductList";
import { Product } from '@/types';
import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
} from '@mui/material';
import Link from "next/link";

interface PayloadProducts {
  products: Product[];
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products`);
  const products: Product[] = await res.json();

  return {
    props: { products },
  };
}


export default function ProductsPage({ products }: PayloadProducts) {
  const [productList, setProductList] = useState(products);

  const handleDelete = (id: number) => {
    setProductList((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };
  return (
    <Container>
      <Typography variant="h4" className="text-xl font-bold mb-4">
        List of products
      </Typography>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center',  mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ color: 'text.primary' }}>Products</Typography>
        </Breadcrumbs>
        <Link href="/products/new">
          <Button variant="contained">New Product</Button>
        </Link>
      </Grid>
      <ProductList handleDelete={handleDelete} products={productList} />
    </Container>
  );
}
