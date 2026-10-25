export const onDeleteProduct = async (id: number): Promise<boolean> => {
    let success = false;
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products/${id}`, {
                    method: 'DELETE',
                });
                success = response.ok
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
        return success;
    };

export default onDeleteProduct;