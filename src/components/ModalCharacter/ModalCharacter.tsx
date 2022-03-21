import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataContext from '../../contexts/dataContext';
import { IModalCharacter, IQuote } from '../../models/index'
import { selectSorce } from '../../utilities/utils';
import Modal from '../Modal/Modal';
import styles from './ModalCharacter.module.scss';

function ModalCharacter({ onModalClose, character }: IModalCharacter) {
    const ref = useRef<any>(null);
    const refGrid = useRef<any>(null);
    const { findCharacterQuote, updateQuote, addQuote } = useContext(DataContext);
    const [isUpdateInfo, setIsUpdateInfo] = useState<string | boolean>(false);
    const [dataToUpdate, setDataToUpdate] = useState<string>('');
    const [newData, setNewData] = useState<string>('');

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        updateQuote(isUpdateInfo, dataToUpdate);
    }, [dataToUpdate])

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsUpdateInfo(false);
            setDataToUpdate('')
        }
    };

    const handleUpdate = (id: string) => setIsUpdateInfo(id);

    const handleUpdateQuote = (e: any) => setDataToUpdate(e.target.value);

    const handleNewQuote = (e: any) => setNewData(e.target.value);

    const handleAddNewQuote = () => {
        const quoteToAdd: IQuote = {
            id: uuidv4(),
            characterId: character.id,
            quote: newData
        };
        addQuote(quoteToAdd);
        scrollToBottom();
        setNewData('');
    };

    const handleKeyDown = (e: any, isUpdate?: boolean) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            isUpdate ? setIsUpdateInfo(false) : handleAddNewQuote();
        };
    };

    const scrollToBottom = () => {
        const scrollTo: number = refGrid.current.scrollHeight + 100;
        refGrid.current.scroll({ top: scrollTo, behavior: 'smooth' });
    };

    const render = useCallback((character: any) => {
        return character.isCrewMember
            ?
            <p>Role: {character.role} </p>
            :
            findCharacterQuote(character.id).sort().map((quote: any, index: number) => {
                return isUpdateInfo && (quote.id === isUpdateInfo)
                    ?
                    <textarea
                        key={index}
                        ref={ref}
                        value={dataToUpdate || quote.quote}
                        onChange={handleUpdateQuote}
                        onKeyDown={(e: any) => handleKeyDown(e, true)}
                        className={styles.modalCharacter__update} />
                    :
                    <q key={index} onDoubleClick={() => handleUpdate(quote.id)} className={styles.modalCharacter__quote}>
                        {quote.quote}
                    </q>
            })
    }, [character, isUpdateInfo, dataToUpdate, newData]);

    return (
        <Modal onModalClose={onModalClose}>
            <div className={styles.modalCharacter__container}>
                <div className={styles.modalCharacter__leftPanel}>
                    <h4>By {character.name}</h4>
                    <div ref={refGrid} className={styles.modalCharacter__flowContainer}>
                        {render(character)}
                    </div>
                    {!character.isCrewMember &&
                        <div className={styles.modalCharacter__wrapperNewQuote}>
                            <textarea
                                ref={ref}
                                value={newData}
                                onChange={handleNewQuote}
                                onKeyDown={(e: any) => handleKeyDown(e)}
                                className={styles.modalCharacter__add}
                                placeholder="Add a new quote"
                            />
                            <button
                                onClick={handleAddNewQuote}
                                className={styles.modalCharacter__addNewQuote} />
                        </div>
                    }
                </div>
                <div className={styles.modalCharacter__rightPanel}>
                    <img
                        alt={character.name}
                        className={styles.modalCharacter__image}
                        style={{ backgroundImage: selectSorce(character) }} />
                    {!character.isCrewMember && <p className={styles.modalCharacter__description}>*Double click to edit a quote</p>}
                </div>
            </div>
        </Modal>
    );
}

export default ModalCharacter;