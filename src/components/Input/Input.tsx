import type { InputProps } from './Input.props';
import cn from 'classnames';
import styles from './styles.module.css';

function Input({ isValid, kind = 'regular', ...props }: InputProps) {
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
