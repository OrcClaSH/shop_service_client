import React from 'react';
import ReactPaginate from 'react-paginate';
import { selectorPagination, selectorProducts as selectorProducts } from 'redux/selectors';
import { useAppSelector, useAppDispatch } from 'redux/store';

import { setPage } from '../../redux/slices/pagination/paginationSlice';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { itemsPerPage, page } = useAppSelector(selectorPagination);
    const { productsNumber } = useAppSelector(selectorProducts);

    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel=' ... '
            nextLabel='>'
            onPageChange={e => dispatch(setPage(e.selected + 1))}
            pageCount={Math.ceil(productsNumber / itemsPerPage)}
            previousLabel='<'
            // renderOnZeroPageCount={null}
            // forcePage={page}
        />
    )
};

export default Pagination;
