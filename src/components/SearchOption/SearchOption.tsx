import { useContext, useEffect, useState } from 'react';

import styles from './SearchOption.module.scss';

function SearchOption({ onSearchOrder }: any) {

    return (
        <div
            className={styles.searchOption__container}
        >
            <select onChange={(e) => onSearchOrder(e.target.value)} className={styles.searchOption__select}>
                <option value="firstName">First Name</option>
                <option value="lastName">Last name</option>
            </select>
        </div>
    )
}

export default SearchOption;