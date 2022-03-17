import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataContext from '../../contexts/dataContext';
import { prepareName, prepareSourceName } from '../../utilities/utils';
import Modal from '../Modal/Modal';
import styles from './ModalAdd.module.scss';

function ModalAdd({ onModalClose, addCharacter }: any) {
    const { addMember } = useContext(DataContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dataSave, setDataSave] = useState('');

    const handleAddNew = () => {
        let member: any;
        if (addCharacter) {
            member = {
                id: uuidv4(),
                name: prepareName(firstName, lastName),
                firstName,
                lastName,
                source: prepareSourceName(firstName, lastName),
                isCreated: true,
                isCrewMember: false
            }
        } else {
            member = {
                id: uuidv4(),
                firstName,
                lastName,
                name: prepareName(firstName, lastName),
                source: prepareSourceName(firstName, lastName),
                role: dataSave,
                isCreated: true,
                isCrewMember: false
            }
            addMember(member, addCharacter)
        };
    }
    const handleFirstName = (e: any) => setFirstName(e.target.value);

    const handleLastName = (e: any) => setLastName(e.target.value);

    const handleData = (e: any) => setDataSave(e.target.value);

    return (
        <Modal onModalClose={onModalClose}>
            <div className={styles.modalAdd__container}>
                <div className={styles.modalAdd__leftPanel}>
                    <>
                        <h4 className={styles.modalAdd__title}>Add first name: {firstName}</h4>
                        <textarea
                            onChange={handleFirstName}
                            className={styles.modalAdd__name}
                        />
                        <h4 className={styles.modalAdd__title}>Add last name: {lastName}</h4>
                        <textarea
                            onChange={handleLastName}
                            className={styles.modalAdd__name}
                        />
                        <h4 className={styles.modalAdd__title}>Add {addCharacter ? "quote" : "information"}:</h4>
                        {(addCharacter && dataSave)
                            ?
                            <q className={styles.modalAdd__dataSave}>{dataSave}</q>
                            :
                            <p className={styles.modalAdd__dataSave}>{dataSave}</p>
                        }
                        <textarea
                            onChange={handleData}
                            className={styles.modalAdd__add}
                        />
                    </>
                </div>
                <div
                    className={styles.modalAdd__rightPanel}
                    style={{ backgroundImage: `url("/assets/not_found.jpeg")` }}
                >
                </div>
            </div>
        </Modal>
    );
}

export default ModalAdd;