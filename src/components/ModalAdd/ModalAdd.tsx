import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataContext from '../../contexts/dataContext';
import { IModalAdd } from '../../models';
import { formattedUppercaseName, prepareName, prepareSourceName } from '../../utilities/utils';
import Modal from '../Modal/Modal';
import styles from './ModalAdd.module.scss';

const ModalAdd = ({ onModalClose, addCharacter }: IModalAdd) => {
    const { addMember, addQuote } = useContext(DataContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dataSave, setDataSave] = useState('');

    const handleAddNew = (firstName: string, lastName: string, addCharacter: boolean, dataSave: string) => {
        let member: any;

        if (addCharacter) {
            const characterId = uuidv4();
            member = {
                id: characterId,
                name: prepareName(firstName, lastName),
                firstName: formattedUppercaseName(firstName),
                lastName: formattedUppercaseName(lastName),
                source: prepareSourceName(firstName, lastName),
                isCreated: true,
                isCrewMember: false
            };

            const quoteToAdd = {
                id: uuidv4(),
                characterId: characterId,
                quote: dataSave
            };

            console.log(member, quoteToAdd);
            addQuote(quoteToAdd);
        } else {
            member = {
                id: uuidv4(),
                name: prepareName(firstName, lastName),
                firstName: formattedUppercaseName(firstName),
                lastName: formattedUppercaseName(lastName),
                source: prepareSourceName(firstName, lastName),
                role: dataSave,
                isCreated: true,
                isCrewMember: false
            };
        };
        addMember(member, addCharacter);
        cleanFields();
        handleClose();
    }

    const cleanFields = (): void => {
        setFirstName('');
        setLastName('');
        setDataSave('');
    }

    const handleFirstName = (e: any) => setFirstName(e.target.value);

    const handleLastName = (e: any) => setLastName(e.target.value);

    const handleData = (e: any) => setDataSave(e.target.value);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        handleAddNew(firstName, lastName, addCharacter, dataSave);
    }

    const handleClose = () => onModalClose(false);

    const handleDisable = (): boolean | undefined => !(firstName && lastName && dataSave) ? true : false;

    return (
        <Modal onModalClose={onModalClose}>
            <div className={styles.modalAdd__container}>
                <div className={styles.modalAdd__leftPanel}>
                    <form onSubmit={handleSubmit}>
                        <h4 className={styles.modalAdd__title}>Add first name: {firstName}</h4>
                        <textarea
                            value={firstName}
                            onChange={handleFirstName}
                            className={styles.modalAdd__name}
                        />
                        <h4 className={styles.modalAdd__title}>Add last name: {lastName}</h4>
                        <textarea
                            value={lastName}
                            onChange={handleLastName}
                            className={styles.modalAdd__name}
                        />
                        <h4 className={styles.modalAdd__title}>Add {addCharacter ? "quote" : "information"}:</h4>
                        {(addCharacter && dataSave)
                            ?
                            (dataSave ? <q className={styles.modalAdd__dataSave}>{dataSave}</q> : '')
                            :
                            (dataSave ? <p className={styles.modalAdd__dataSave}>{dataSave}</p> : '')
                        }
                        <textarea
                            value={dataSave}
                            onChange={handleData}
                            className={styles.modalAdd__add}
                        />
                        <button
                            disabled={handleDisable()}
                            style={{ opacity: handleDisable() ? ".5" : "1" }}
                            type="submit"
                            value="Submit"
                            className={styles.modalAdd__submit}
                        >
                            create
                        </button >
                    </form>
                </div>
                <div className={styles.modalAdd__rightPanel}>
                    <img alt='not_found' className={styles.modalAdd__image} style={{ backgroundImage: `url("/assets/not_found.jpeg")` }} />
                </div>
            </div>
        </Modal >
    );
}

export default ModalAdd;