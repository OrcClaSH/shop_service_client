import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'redux/store';

import {
    Sort,
    Skeleton,
    Pagination,
    Categories,
    ErrorOnPage,
    ProductBlock,
} from 'components';

import { makeUrl } from '../utils';
import { selectorProducts } from 'redux/selectors';
import { setPage } from '../redux/slices/pagination/paginationSlice';
import { setActiveSortMethod } from '../redux/slices/sort/sortSlice';
import { fetchProducts } from '../redux/slices/product/productsSlice';
import { setActiveCategory } from '../redux/slices/category/categorySlice';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const rootState = useAppSelector(state => state);
    const { products, isLoading, error } = useAppSelector(selectorProducts);
    const url = makeUrl(rootState);

    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams);
    const isMountedRef = React.useRef(false);

    const handleParamsToStore = () => {
        if (params.page) dispatch(setPage(+params.page));
        if (params.sort) dispatch(setActiveSortMethod(params.sort));
        if (params.category) dispatch(setActiveCategory(params.category));
    }

    React.useEffect(() => {
        if (Object.entries(params).length) {
            handleParamsToStore();
        }
    }, []);

    React.useEffect(() => {
        if (isMountedRef.current) {
            setSearchParams({
                category: rootState.category.activeCategory,
                sort: rootState.sort.activeSortMethod,
                page: rootState.pagination.page.toString(),
            });
        }
        isMountedRef.current = true;
    }, [url]);

    React.useEffect(() => {
        dispatch(fetchProducts(url))
    }, [url]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Рулоны для кассовых аппаратов</h2>
            {error && <ErrorOnPage error={error} />}
            <div className="content__items">
                {isLoading
                    ? [...Array(4)].map((_, i) => <Skeleton key={i} />)
                    : products.map(product => (
                        <ProductBlock
                            {...product}
                            key={product.id}
                        />
                    ))}
            </div>
            <Pagination />
        </div>
    )
};

export default Home;
