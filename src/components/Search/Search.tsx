import type { ReactNode } from 'react';
import styles from './styles.module.css';
import {SearchProps} from './Search.props';

function Search({...props}: SearchProps) {
	return (
        	<input {...props} type='search' className={styles.search}  />
	);
}


export default Search;
