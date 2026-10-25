import {ProductFormData} from '@/components/ProductLayout';

export const onCreateProduct = async (data: ProductFormData): Promise<boolean> => {
    try {
        const { ok, status, statusText } = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!ok) {
            console.error('Error deleting product:', status, statusText);
        }
        return ok;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
    return false;
};

export default onCreateProduct;


