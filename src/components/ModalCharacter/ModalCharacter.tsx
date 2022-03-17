import { useContext, useEffect, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { IModalCharacter } from '../../models/index'
import Modal from '../Modal/Modal';
import styles from './ModalCharacter.module.scss';

function ModalCharacter({ onModalClose, character }: IModalCharacter) {
    const { findCharacterQuote } = useContext(DataContext);

    return (
        <Modal onModalClose={onModalClose}>
            <div className={styles.modalCharacter__container}>
                <div className={styles.modalCharacter__leftPanel}>
                    <>
                        <h4>By {character.name}</h4>
                        {character.isCrewMember
                            ?
                            <p>Role: {character.role} </p>
                            :
                            findCharacterQuote(character.id).sort().map((quote: string, index: number) => {
                                return <q key={index} className={styles.modalCharacter__quote}>
                                    {quote}
                                </q>
                            })}
                    </>
                </div>
                <div
                    className={styles.modalCharacter__rightPanel}
                    style={{ backgroundImage: (!character.isCreated && (!character.isCrewMember || !!character?.source)) ? `url("/assets/${character.source}.webp")` : `url("/assets/not_found.jpeg")` }}
                >

                </div>
            </div>
        </Modal>
    );
}

export default ModalCharacter;