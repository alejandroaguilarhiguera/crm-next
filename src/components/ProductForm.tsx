'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ProductFormData } from './ProductLayout';

type ProductFormProps = {
  mode?: 'new' | 'view' | 'edit';
  form: UseFormReturn<ProductFormData>;
  isLoading?: boolean;
};

export default function ProductForm({
  mode = 'edit',
  form,
  isLoading = false,
}: ProductFormProps) {
  const {
    control,
    formState: { errors },
  } = form;
  
  return (
      <Grid sx={{ my: 4, maxWidth: 500 }}  size={{ xs: 12 }}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >

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
        </Box>
      </Grid>
  );
}