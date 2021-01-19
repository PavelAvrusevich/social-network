import React, { useState } from 'react';
import styles from './Paginator.module.css';

let Paginator = ({ totalItemsCount, pageSize, currentPage, onChangePage, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let [portionNumber, setPortionNumber] = useState(1);
    let portionsCount = Math.ceil(pagesCount / portionSize);
    let leftItemInPortionNumber = portionSize * (portionNumber - 1) + 1;
    let rightItemInPortionNumber = portionSize * portionNumber;

    return (
        <div>
            {portionNumber > 1 && (
                <button onClick={() => setPortionNumber(portionNumber - 1)}> {'<'} </button>
            )}
            {pages
                .filter((p) => p >= leftItemInPortionNumber && p <= rightItemInPortionNumber)
                .map((p) => {
                    let className = styles.pageNumber;
                    if (currentPage === p) {
                        className += ` ${styles.selected}`;
                    }
                    return (
                        <span className={className} onClick={() => onChangePage(p)}>
                            {p}
                        </span>
                    );
                })}
            {portionNumber < portionsCount && (
                <button onClick={() => setPortionNumber(portionNumber + 1)}> {'>'} </button>
            )}
        </div>
    );
};

export default Paginator;
