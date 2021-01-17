import React from 'react';
import styles from './Paginator.module.css';

let Paginator = ({ totalUsersCount, pageSize, currentPage, onChangePage }) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map((p) => {
                    return (
                        <span
                            className={currentPage === p && styles.currentPage}
                            onClick={() => onChangePage(p)}
                        >
                            {p}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Paginator;
