import { ISearch } from '../../models';
import styles from './SearchOption.module.scss';

function SearchOption({ onSearchOrder }: ISearch) {

    return (
        <div className={styles.searchOption__container} >
            <select onChange={(e: any) => onSearchOrder(e.target.value)} className={styles.searchOption__select}>
                <option value="firstName">First Name</option>
                <option value="lastName">Last name</option>
            </select>
        </div>
    )
}

export default SearchOption;