import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    maxVisiblePages = 5 
}) => {
    const getPageNumbers = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);
        
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <BootstrapPagination className="justify-content-center mt-4">
            {/* First Page */}
            <BootstrapPagination.First
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            />

            {/* Previous Page */}
            <BootstrapPagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />

            {/* Page Numbers */}
            {pageNumbers[0] > 1 && (
                <>
                    <BootstrapPagination.Item onClick={() => onPageChange(1)}>
                        1
                    </BootstrapPagination.Item>
                    {pageNumbers[0] > 2 && <BootstrapPagination.Ellipsis disabled />}
                </>
            )}

            {pageNumbers.map(number => (
                <BootstrapPagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </BootstrapPagination.Item>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                        <BootstrapPagination.Ellipsis disabled />
                    )}
                    <BootstrapPagination.Item onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </BootstrapPagination.Item>
                </>
            )}

            {/* Next Page */}
            <BootstrapPagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />

            {/* Last Page */}
            <BootstrapPagination.Last
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            />
        </BootstrapPagination>
    );
};

export default Pagination; 