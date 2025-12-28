import type { LabelHTMLAttributes } from 'react';

export interface InputProps extends LabelHTMLAttributes<HTMLLabelElement> {
        isValid: boolean;
	kind: string;
}