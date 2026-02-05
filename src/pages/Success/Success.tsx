import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

export function Success() {
        const navigate = useNavigate();
        return (
                <div className={styles['success-root']}>
                        <div className={styles['image']}>
                                <img src='./success.svg' alt='Изображение пиццы' />
                        </div>
                        <h1 className={styles['title']}>Ваш заказ успешно оформлен!</h1>
                        <Button onClick={() => navigate('/')} size='big'>
                                Сделать новый
                        </Button>
                </div>
        );
}
