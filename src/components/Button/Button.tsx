import styles from './styles.module.css';
import type { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ 
	children, 
	className, 
	size = 'small', 
	...props 
}: ButtonProps) {
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
