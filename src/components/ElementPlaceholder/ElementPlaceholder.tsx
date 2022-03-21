import { useEffect, useState, useRef } from 'react';
import ContentLoader from 'react-content-loader'
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
        <div className={styles.elementPlaceholder__container} ref={gridRef}>
            <div
                className={styles.elementPlaceholder__gradient}
                style={{ height: `${elementSize.height}px`, width: `${elementSize.width}px` }}
            />
            <ContentLoader
                speed={1}
                width={200}
                height={250}
                viewBox="0 0 200 250"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"

            >
                <circle cx="100" cy="112" r="94" />
                <rect x="46" y="218" rx="2" ry="2" width="112" height="8" />
                <rect x="31" y="233" rx="2" ry="2" width="143" height="36" />
            </ContentLoader>
        </div>
    );
}

export default ElementPlaceholder;