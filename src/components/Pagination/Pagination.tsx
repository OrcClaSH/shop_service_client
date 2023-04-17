import React from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector, useAppDispatch } from 'redux/store';

import { setPage } from '../../redux/slices/pagination/paginationSlice';
import { selectorPagination, selectorProducts as selectorProducts } from 'redux/selectors';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { itemsPerPage } = useAppSelector(selectorPagination);
    const { productsNumber } = useAppSelector(selectorProducts);

    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel=' ... '
            nextLabel='>'
            onPageChange={e => dispatch(setPage(e.selected + 1))}
            pageCount={Math.ceil(productsNumber / itemsPerPage)}
            previousLabel='<'
        />
    )
};

export default Pagination;
