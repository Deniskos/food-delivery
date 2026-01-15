import { useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/product.interface';

export function Product() {
        const { product } = useLoaderData() as { product: Product };

        return (
                <div>
                        Product - {product.id} {product.name}
                </div>
        );
}
