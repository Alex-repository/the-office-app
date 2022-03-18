import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { IModalCharacter } from '../../models/index'
import { selectSorce } from '../../utilities/utils';
import Modal from '../Modal/Modal';
import styles from './ModalCharacter.module.scss';

function ModalCharacter({ onModalClose, character }: IModalCharacter) {
    const ref = useRef<any>(null);
    const { findCharacterQuote, updateQuote } = useContext(DataContext);
    const [isUpdateInfo, setIsUpdateInfo] = useState<string | boolean>(false);
    const [dataToUpdate, setDataToUpdate] = useState('')

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        updateQuote(isUpdateInfo, dataToUpdate);
    }, [dataToUpdate])

    const handleClickOutside = (event: any) => ref.current && !ref.current.contains(event.target) && setIsUpdateInfo(false);

    const handleUpdate = (id: string) => setIsUpdateInfo(id);

    const handleUpdateQuote = (e: any) => setDataToUpdate(e.target.value);

    const render = useCallback((character: any) => {
        return character.isCrewMember
            ?
            <p>Role: {character.role} </p>
            :
            findCharacterQuote(character.id).sort().map((quote: any, index: number) => {
                return isUpdateInfo && (quote.id === isUpdateInfo)
                    ?
                    <textarea key={index} ref={ref} value={dataToUpdate || quote.quote} onChange={handleUpdateQuote} className={styles.modalCharacter__update} />
                    :
                    <q key={index} onDoubleClick={() => handleUpdate(quote.id)} className={styles.modalCharacter__quote}>
                        {quote.quote}
                    </q>
            })
    }, [character, isUpdateInfo, dataToUpdate])

    return (
        <Modal onModalClose={onModalClose}>
            <div className={styles.modalCharacter__container}>
                <div className={styles.modalCharacter__leftPanel}>
                    <>
                        <h4>By {character.name}</h4>
                        {render(character)}
                    </>
                </div>
                <div className={styles.modalCharacter__rightPanel}>
                    <img
                        className={styles.modalCharacter__image}
                        style={{ backgroundImage: selectSorce(character) }}
                    />
                    {!character.isCrewMember && <p className={styles.modalCharacter__description}>*Double click to edit a quote</p>}
                </div>
            </div>
        </Modal>
    );
}

export default ModalCharacter;