import { useContext, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { IHeader, typeView } from '../../models';
import styles from './Header.module.scss';

function Header({ onChangeView }: IHeader) {
    const { sendGetCrew, sendGetCharacters } = useContext(DataContext);
    const [viewOption, setViewOption] = useState<typeView>("characters");

    const handlerCharacterOption = () => {
        sendGetCharacters();
        setViewOption("characters");
        onChangeView("characters");
    };

    const handlerCrewOption = () => {
        sendGetCrew();
        setViewOption("crew")
        onChangeView("crew");
    };

    return (
        <header className={styles.header__container}>
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
        </header>
    );
}

export default Header;