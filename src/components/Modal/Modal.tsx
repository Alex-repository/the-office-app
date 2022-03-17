import { useContext, useEffect, useState, useRef } from 'react';
import { IModal } from '../../models/index'
import styles from './Modal.module.scss';

function Modal({ children, onModalClose }: IModal) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: any) => ref.current && !ref.current.contains(event.target) && handleClose();

  const handleClose = () => onModalClose(false);

  return (
    <div className={styles.modal__overlay} >
      <button className={styles.modal__close} onClick={handleClose} />
      <div className={styles.modal__container} ref={ref}>
        {children}
      </div>
    </div>
  );
}

export default Modal;