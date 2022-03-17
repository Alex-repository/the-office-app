import { useContext, useEffect, useState, useRef } from 'react';
import { debounce } from '../../utilities/utils';
import ModalAdd from '../ModalAdd/ModalAdd';
import styles from './GridAdd.module.scss';


function GridAdd({ view }: any) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [elementSize, setElementSize] = useState({ height: 0, width: 0 });
    const gridRef = useRef<any>(null);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "scroll";
    }, [isModalOpen])

    useEffect(() => {
        setElementSize({ height: gridRef?.current.clientHeight, width: gridRef?.current.clientWidth })
    }, [gridRef])

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setElementSize({ height: gridRef?.current.clientHeight, width: gridRef?.current.clientWidth })
        }, 10)
        window.addEventListener('resize', debouncedHandleResize)
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    const handlerModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            <button
                ref={gridRef}
                className={styles.gridAdd__container}
                style={{ backgroundImage: `url("/assets/not_found.jpeg")` }}
                onClick={() => handlerModal()}
            >
                <div
                    className={styles.gridAdd__gradient}
                    style={{ height: `${elementSize.height}px`, width: `${elementSize.width}px` }}
                />
                <h4 className={styles.gridAdd__name}>Add new</h4>
            </button>
            {isModalOpen && <ModalAdd onModalClose={setIsModalOpen} addCharacter={view === 'characters'} />}
        </>
    );
}

export default GridAdd;