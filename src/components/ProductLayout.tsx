import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Breadcrumbs,
    Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useState } from 'react';
import Link from "next/link";
import ProductForm from './ProductForm';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Product } from '@/types/Product';
import { onDeleteProduct } from '@/lib/onDeleteProduct';
import { onCreateProduct } from '@/lib/onCreateProduct';
import { onUpdateProduct } from '@/lib/onUpdateProduct';

export interface ProductViewProps {
    mode: 'view' | 'edit' | 'new';
    product?: Product | null;
}

export type ProductFormData = {
    id?: number;
    name: string;
    description?: string;
    price: number;
};



const ProductLayout: React.FC<ProductViewProps> = (props) => {
    const { product } = props;
    const [mode, setMode] = useState<'view' | 'edit' | 'new'>(props.mode);
    const router = useRouter();

    const form = useForm<ProductFormData>({
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price ?? 0,
            id: product?.id,
        },
    });
    const { reset, handleSubmit, formState: { isDirty } } = form;

    const id = form.getValues('id');
    const handleDelete = async () => {
        if (!id) return;
        if (await onDeleteProduct(id)) {
            router.back();
        }
    };

    const handleSaveSubmit = async (data: ProductFormData) => {
        
        let textAlert = 'Are you sure you want to edit this product?'
        if (mode === 'new') {
            textAlert = 'Are you sure you want to create a product?'
        }

        if (!confirm(textAlert)) {
            return;
        }

        if (mode === 'new') {
            if (await onCreateProduct(data)) {
                router.back();
            } else {
                // TODO: Handle error
            }
        } else {
            if (!id) return;
            if (await onUpdateProduct(id, data)) {
                setMode('view');
            } else {
                // TODO: Handle error
            }
        }
        
    };
    const onCancelOrReset = () => {
        let hasChanges = false;
        if (isDirty) {
            if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
                hasChanges = true;
            } else {
                return;
            }
        }

        if (mode === 'new') {
            if (hasChanges) {
                reset();
            } else {
                router.back();
            }
        } else {
            if (hasChanges) {
                reset();
            } else {
                if (props.mode === 'edit') {
                    router.back();
                } else {
                    setMode('view');

                }

            }
        }
    }
    const onSubmit = handleSubmit(handleSaveSubmit);

    let deleteButtonVisibility: 'inline-flex' | 'none' = 'inline-flex';
    if (mode === 'new' || mode === 'view' || !id) {
        deleteButtonVisibility = 'none';
    }

    let viewButtonVisibility: 'inline-flex' | 'none' = 'inline-flex';
    if (mode === 'new' || !id || mode === 'view') {
        viewButtonVisibility = 'none';
    }
    if (isDirty && mode === 'edit') {
        viewButtonVisibility = 'none';
    }
    if (!isDirty && props.mode === 'view' && mode === 'edit') {
        viewButtonVisibility = 'none';
    }

    let editButtonVisibility: 'inline-flex' | 'none' = 'inline-flex';
    if (mode === 'new' || mode === 'edit') {
        editButtonVisibility = 'none';
    }

    let cancelButtonVisibility: 'inline-flex' | 'none' = 'none';
    if (mode === 'edit' || mode === 'new') {
        cancelButtonVisibility = 'inline-flex';
    }


    let saveButtonVisibility: 'inline-flex' | 'none' = 'inline-flex';
    if (mode === 'view') {
        saveButtonVisibility = 'none';
    }


    return (
        <Box sx={{ width: '100%', p: 1 }}>
            <Card variant="elevation">
                <CardContent>

                    <Typography style={{ textTransform: 'uppercase' }} variant="h6">
                        {mode === 'new' && 'New Product'}
                        {mode === 'edit' && 'Edit Product'}
                        {mode === 'view' && 'Product Details'}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'stretch', sm: 'center' },
                    }}>

                        <Breadcrumbs aria-label="breadcrumb">
                            <Link href="/products">
                                Products
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>Details</Typography>
                        </Breadcrumbs>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
                            spacing={2}
                            useFlexGap
                        >
                            <Button
                                sx={{ display: viewButtonVisibility }}
                                form="product-form"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    reset();
                                    setMode('view');
                                }}
                            >
                                View
                            </Button>

                            <Button
                                sx={{ display: cancelButtonVisibility }}
                                onClick={onCancelOrReset}
                                form="product-form"
                                variant="contained"
                                color="primary"
                                startIcon={isDirty ? (<RestoreIcon fontSize='small' />):(<BackspaceIcon fontSize='small' />)}
                            >
                                
                                {isDirty ? 'reset': 'cancel'}

                            </Button>
                            <Button
                                sx={{ display: editButtonVisibility }}
                                form="product-form"
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon fontSize='small' />}
                                onClick={() => {
                                    reset();
                                    setMode('edit');
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                sx={{ display: deleteButtonVisibility }}
                                disabled={isDirty}
                                color="error"
                                variant="contained"
                                startIcon={<DeleteIcon fontSize='small' />}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>

                            <Button
                                sx={{ display: saveButtonVisibility }}
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon fontSize='small' />}
                                form="product-form"
                                color="success"
                                disabled={!isDirty}
                                onClick={onSubmit}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Box>

                    <ProductForm mode={mode} form={form} />

                </CardContent>
            </Card>
        </Box>
    )
}

export default ProductLayout;
