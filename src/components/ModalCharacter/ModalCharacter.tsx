import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { IModalCharacter } from '../../models/index'
import Modal from '../Modal/Modal';
import styles from './ModalCharacter.module.scss';

function ModalCharacter({ onModalClose, character }: IModalCharacter) {
    const { findCharacterQuote } = useContext(DataContext);
    const [isUpdateInfo, setIsUpdateInfo] = useState<string | boolean>(false)

    const ref = useRef<any>(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event: any) => ref.current && !ref.current.contains(event.target) && setIsUpdateInfo(false);


    const handleUpdate = (id: any) => {
        console.log('double click', id)
        setIsUpdateInfo(id);

    }

    const handleUpdateQuote = (id: any) => {
        console.log('double click', id)
        setIsUpdateInfo(id);
    }

    const render = useCallback((character: any) => {
        return character.isCrewMember
            ?
            <p>Role: {character.role} </p>
            :
            findCharacterQuote(character.id).sort().map((quote: any, index: number) => {
                console.log(quote)
                return isUpdateInfo && (quote.id === isUpdateInfo)
                    ?
                    <textarea ref={ref} value={quote.quote} onChange={handleUpdateQuote} className={styles.modalCharacter__update} />
                    :
                    <q key={index} onDoubleClick={() => handleUpdate(quote.id)} className={styles.modalCharacter__quote}>
                        {quote.quote}
                    </q>
            })
    }, [character, isUpdateInfo])

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
                        style={{ backgroundImage: (!character.isCreated && (!character.isCrewMember || !!character?.source)) ? `url("/assets/${character.source}.webp")` : `url("/assets/not_found.jpeg")` }}
                    />
                    <p className={styles.modalCharacter__description}>*Double click to edit a quote</p>
                </div>
            </div>
        </Modal>
    );
}

export default ModalCharacter;