import cn from 'classnames';
import type { InputProps } from './Input.props';
import styles from './styles.module.css';

function Input({ isValid = true, kind = 'regular', ...props }: InputProps) {
        console.log('isValid', isValid);
        return (
                <input
                        {...props}
                        className={cn(styles.input, styles[kind], {
                                [styles.invalid]: !isValid,
                        })}
                />
        );
}

export default Input;
