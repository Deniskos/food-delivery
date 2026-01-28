import cn from 'classnames';
import type { ButtonProps } from './Button.props';
import styles from './styles.module.css';

function Button({ children, className, size = 'small', ...props }: ButtonProps) {
        return (
                <button
                        className={cn(
                                styles.button,
                                styles.accent,
                                styles[size],
                                {
                                        [styles.exit]: className === 'exit',
                                        [styles.cart]: className === 'cart',
                                },
                                className
                        )}
                        {...props}
                >
                        {children}
                </button>
        );
}

export default Button;
