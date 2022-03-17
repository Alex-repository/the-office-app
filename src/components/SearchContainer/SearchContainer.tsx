import { useContext, useEffect, useState } from 'react';

import styles from './SearchContainer.module.scss';

function SearchContainer({ children }: any) {

    return (
        <div className={styles.searchContainer__container}>
            {children}
        </div>
    )
}

export default SearchContainer;