import { useContext, useEffect, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { typeView } from '../../models';
import styles from './Header.module.scss';

function Header({ onChangeView }: any) {
    const { sendGetCrew } = useContext(DataContext);
    const [viewOption, setViewOption] = useState<typeView>("characters");

    const handlerCharacterOption = () => {
        setViewOption("characters");
        onChangeView("characters");
    };

    const handlerCrewOption = () => {
        sendGetCrew();
        setViewOption("crew")
        onChangeView("crew");
    };

    return (
        <div className={styles.header__container}>
            <button
                className={`${styles.header__option} ${styles[(viewOption === "crew") ? "header__option-disable" : ""]}`}
                onClick={() => handlerCrewOption()}
            >
                Crew
            </button>
            <button
                className={`${styles.header__option} ${styles[(viewOption === "characters") ? "header__option-disable" : ""]}`}
                onClick={() => handlerCharacterOption()}
            >
                Character
            </button>
        </div>
    );
}

export default Header;