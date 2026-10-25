import {ProductFormData} from '@/components/ProductLayout';

export const onUpdateProduct = async (id: number, data: Partial<Omit<ProductFormData, 'id'>>): Promise<boolean> => {
    try {
        const { ok, status, statusText } = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!ok) {
            console.error('Error updating product:', status, statusText);
        }
        return ok;
    } catch (error) {
        console.error('Error updating product:', error);
    }
    
    return false;
};

export default onUpdateProduct;


