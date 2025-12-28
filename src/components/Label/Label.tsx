import type { LabelProps } from './Label.props';
import styles from './styles.module.css';

function Label({children, ...props }: LabelProps) {
	return (
		<label className={styles.label} {...props} >{children}</label>
	);
}

export default Label;
