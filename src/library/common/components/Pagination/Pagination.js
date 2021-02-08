import React from 'react';

import './pagination.css';

export const Pagination = props => {
    const {currentPage, totalPages, onClickPageNumber, disablePageChange} = props;

    const getPaginationNumbers = () => {
        if (totalPages > 0) {
            if (totalPages <= 6) {
                return Array.from(Array(totalPages).keys()).map(item => item + 1);
            }
            if (currentPage > 3 && currentPage < totalPages - 3) {
                return [currentPage - 1, currentPage, currentPage + 1];
            }
            if (currentPage <= 3) {
                return [1, 2, 3, 4, 5];
            }
            if (currentPage >= totalPages - 3) {
                return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            }
        }
        return [];
    };

    const onChangePage = pageNumber => {
        if (!disablePageChange && pageNumber <= totalPages && pageNumber >= 1)
            onClickPageNumber(pageNumber)
    };

    return (
        <div className="pagination">
            <span
                onClick={e => {
                    e.preventDefault();
                    onChangePage(parseInt(currentPage) - 1);
                }}
                className={`change-page decrement ${currentPage === 1 ? 'disable' : ''}`}
            >
                <i className="fa fa-caret-left"/>
            </span>

            {currentPage > 3 && totalPages > 6 && (
                <>
                    <span
                        className="page-number"
                        onClick={e => {
                            e.preventDefault();
                            onChangePage(1);
                        }}
                    >
                        1
                    </span>
                    <span className="ellipses">...</span>
                </>
            )}

            {getPaginationNumbers().map(pageNumber => (
                <span
                    key={pageNumber}
                    className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={e => {
                        e.preventDefault();
                        onChangePage(pageNumber);
                    }}
                >
                    {pageNumber}
                </span>
            ))}

            {currentPage < totalPages - 3 && totalPages > 6 && (
                <>
                    <span className="ellipses">...</span>
                    <span
                        className="page-number"
                        onClick={e => {
                            e.preventDefault();
                            onChangePage(totalPages);
                        }}
                    >
                        {totalPages}
                    </span>
                </>
            )}

            <span
                onClick={e => {
                    e.preventDefault();
                    onChangePage(parseInt(currentPage) + 1);
                }}
                className={`change-page increment ${currentPage === totalPages ? 'disable' : ''}`}
            >
                <i className="fa fa-caret-right"/>
            </span>
        </div>
    );
};

Pagination.defaultProps = {
    currentPage: 1,
    totalPages: 0,
    onClickPageNumber: () => {
    },
    disablePageChange: false
};
