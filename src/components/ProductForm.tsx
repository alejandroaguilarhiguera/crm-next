'use client';

import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SaveIcon } from 'lucide-react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export type ProductFormData = {
  id?: string;
  name: string;
  description?: string;
  price: number;
};

type ProductFormProps = {
  mode?: 'view' | 'edit';
  defaultValues?: Partial<ProductFormData>;
  isLoading?: boolean;
};

export default function ProductForm({
  mode = 'edit',
  defaultValues: product,
  isLoading = false,
}: ProductFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,

  } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price ?? 0,
    },
  });
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`${process.env.API_HOST}/products/${product?.id}`, {
          method: 'DELETE',
        });
        router.push('/products');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSaveSubmit = async (data: ProductFormData) => {
    try {
      const res = await fetch(`${process.env.API_HOST}/products/${product?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push(`/products/${product?.id}?mode=view`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12 }} >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'right',
            alignItems: 'right',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Stack direction="row" spacing={2} sx={{ m: 2 }}>
              <>
                <Button
                  sx={{ visibility: mode === 'view' ? 'visible' : 'hidden' }}
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => router.push(`/products/${product?.id}?mode=edit`)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ visibility: mode === 'view' ? 'hidden' : 'visible' }}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  disabled={isDirty}
                  onClick={handleDelete}
                >
                </Button>
                <Button
                  sx={{ visibility: mode === 'view' ? 'hidden' : 'visible' }}

                  onClick={() => reset()}
                  form="product-form"
                  variant="contained"
                  color="primary"
                  disabled={!isDirty}
                >
                  Reset
                </Button>
                <Button
                  sx={{ visibility: mode === 'view' ? 'hidden' : 'visible' }}
                  type="submit"
                  form="product-form"
                  variant="contained"
                  color="success"
                  disabled={!isDirty}
                >
                  Save
                </Button>
                <Button
                  sx={{ visibility: mode === 'view' ? 'hidden' : 'visible' }}
                  form="product-form"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    reset();
                    router.push(`/products/${product?.id}?mode=view`);
                  }}
                >
                  View
                </Button>
              </>
            
          </Stack>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSaveSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: 500,
            mx: 'auto',
            p: 4,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} component="h2">
            Product Details
          </Typography>

          {/* Product Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Product name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                variant="outlined"
                fullWidth
                required
                slotProps={{
                  input: {
                    readOnly: mode === 'view',
                  },
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                slotProps={{
                  input: {
                    readOnly: mode === 'view',
                  },
                }}
                fullWidth
                multiline
                rows={3}
              />
            )}
          />

          {/* Price */}
          <Controller
            name="price"
            control={control}
            rules={{
              required: 'Price is required',
              min: { value: 0, message: 'Price cannot be negative' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price ($)"
                type="number"
                variant="outlined"
                fullWidth
                required
                error={!!errors.price}
                helperText={errors.price?.message}
                slotProps={{
                  input: {
                    readOnly: mode === 'view',
                  },
                  htmlInput: { step: '0.01' }
                }}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Saving...' : 'Save Product'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}