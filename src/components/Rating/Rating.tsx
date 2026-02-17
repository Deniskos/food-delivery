import cn from 'classnames';
import styles from './styles.module.css';

interface RatingProps {
        rating: number;
        position: string;
}

function Rating({ rating, position }: RatingProps) {
        return (
                <div
                        className={cn(styles['rating'], {
                                [styles['absolute']]: position == 'absolute',
                                [styles['static']]: position == 'static',
                        })}
                >
                        {rating}
                        <img src='/star.svg' alt='Изображение звезды' />
                </div>
        );
}

export default Rating;
