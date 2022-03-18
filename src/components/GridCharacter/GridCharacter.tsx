import { useEffect, useState, useRef } from 'react';
import { IGridCharacter } from '../../models';
import { debounce } from '../../utilities/utils';
import ModalCharacter from '../ModalCharacter/ModalCharacter';
import styles from './GridCharacter.module.scss';

function GridCharacter({ character, view }: IGridCharacter) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [elementSize, setElementSize] = useState({ height: 0, width: 0 });
    const gridRef = useRef<any>(null);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "scroll";
    }, [isModalOpen])

    useEffect(() => {
        setElementSize({ height: gridRef.current.clientHeight, width: gridRef?.current.clientWidth })
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
            <div className={styles.gridCharacater__container}
                ref={gridRef}
                style={{ backgroundImage: (!character.isCreated && !character.isCrewMember) ? `url("/assets/${character.source}.webp")` : `url("/assets/not_found.jpeg")` }}
            >
                <div
                    className={styles.gridCharacater__gradient}
                    style={{ height: `${elementSize.height}px`, width: `${elementSize.width}px` }}
                >
                </div>
                <h4 className={styles.gridCharacater__name}>{character.name}</h4>
                <button
                    className={styles.gridCharacater__button}
                    onClick={() => handlerModal()}>
                    See {view === "characters" ? "quotes" : "information"}
                </button>
            </div>
            {isModalOpen && <ModalCharacter onModalClose={setIsModalOpen} character={character} />}
        </>
    );
}

export default GridCharacter;