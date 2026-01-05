import ProductCard from '../../../components/ProductCard/ProductCard';
import type { MenuListProps } from './MenuList.props';

export const MenuLIst = ({ products }: MenuListProps) => {
        return products.map(product => (
                <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        description={product.ingredients.join(', ')}
                        image={product.image}
                        price={product.price}
                        rating={product.rating}
                />
        ));
};
