import type { HTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';
import cn from 'classnames';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode,
}

function Title({children, className, ...props}: TitleProps) {
	return (
        <h1 {...props} className={cn(className, styles.title)}>{children}</h1>
	);
}


export default Title;
