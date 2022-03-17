import { useEffect, useState } from 'react';

import styles from './Pagination.module.scss';

function Pagination({ paginationLength, onPageChange }: any) {
    const [indexPosition, setIndexPosition] = useState(1);

    const paginationHandler = (position: number) => {
        onPageChange(position);
        setIndexPosition(position);
    }

    const generatePagination = (
        totalItems: number,
        currentPage: number = 1,
        pageSize: number = 5,
        maxPages: number = 5
    ) => {
        let totalPages = Math.ceil(totalItems / pageSize);

        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= maxPages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
//add here return of max page size based of array lenght
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    const renderLinks = (paginationLength: number) => {
        const pages = generatePagination(paginationLength, indexPosition);
        const render = [];
        for (let i = 1; i <= pages.totalPages; i++) {
            render.push(
                <a
                    key={i}
                    onClick={() => paginationHandler(i)}
                    className={indexPosition === i ? styles.active : ''}
                >
                    {i}
                </a >)
        }
        render.unshift(<a
            key={'fistIndex'}
            onClick={() => indexPosition === (pages.startIndex + 1) ? "" : paginationHandler(indexPosition - 1)}
            className={indexPosition === (pages.startIndex + 1) ? styles.disable : ''}>&laquo;</a>);
        render.push(<a
            key={'lastIndex'}
            onClick={() => indexPosition === pages.endPage ? "" : paginationHandler(indexPosition + 1)}
            className={indexPosition === pages.endPage ? styles.disable : ''}>&raquo;</a>);
        return render;
    }

    return (
        <div className={styles.pagination__container}>
            {paginationLength && renderLinks(paginationLength)}
        </div>
    )
}

export default Pagination;