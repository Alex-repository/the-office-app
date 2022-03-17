import { useEffect, useState, useRef } from 'react';
import { BulletList } from 'react-content-loader'
import { debounce } from '../../utilities/utils';
import styles from './ElementPlaceholder.module.scss';

function ElementPlaceholder() {
    const [elementSize, setElementSize] = useState<{ height: number, width: number }>({ height: 0, width: 0 });
    const gridRef = useRef<any>(null);

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

    return (
        <>
            <div className={styles.elementPlaceholder__container} ref={gridRef}>
                <div
                    className={styles.elementPlaceholder__gradient}
                    style={{ height: `${elementSize.height}px`, width: `${elementSize.width}px` }}
                >
                </div>
                <BulletList />
                <BulletList />
            </div>
        </>
    );
}

export default ElementPlaceholder;