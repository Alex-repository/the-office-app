import { ISearchContainer } from '../../models';
import styles from './SearchContainer.module.scss';

function SearchContainer({ children }: ISearchContainer) {

    return (
        <div className={styles.searchContainer__container}>
            {children}
        </div>
    )
}

export default SearchContainer;