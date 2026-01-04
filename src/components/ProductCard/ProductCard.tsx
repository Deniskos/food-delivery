// import type { ProductCardProps } from './ProductCard.props';
import cn from 'classnames'
import { Link } from 'react-router-dom'
import type { ProductCardProps } from './ProductCard.props'
import styles from './styles.module.css'

function ProductCard(props: ProductCardProps) {
        return (
                <Link to={`/product/${props.id}`}>
                        <div className={styles['card']}>
                                <div className={styles['price']}>
                                        {props.price}&nbsp;
                                        <span className={styles['rub']}> &#8381;</span>
                                </div>
                                <button className={cn(styles['cartButton'])}>
                                        <img src='./cart-icon-light.svg' alt='Добавить в корзину' />
                                </button>
                                <div className={styles['rating']}>
                                        {props.rating}
                                        <img src='./star.svg' alt='Изображение звезды' />
                                </div>

                                <div className={styles['dish-img-wrapper']}>
                                        <img src={props.image} alt='Изображение блюда' />
                                </div>

                                <h3 className={styles['dish-name']}>{props.title}</h3>
                                <p className={styles['description']}>{props.description}</p>
                        </div>
                </Link>
        )
}

export default ProductCard
