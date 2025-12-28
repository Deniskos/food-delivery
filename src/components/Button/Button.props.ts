import type { MouseEvent, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        children: ReactNode;
        onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	size?: 'big' | 'small';
}