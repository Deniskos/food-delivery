import type { SearchProps } from './Search.props';
import styles from './styles.module.css';

function Search({ ...props }: SearchProps) {
        return <input {...props} type='search' className={styles.search} />;
}

export default Search;
