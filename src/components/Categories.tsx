import React from "react";
import { useAppSelector, useAppDispatch } from "redux/store";
// import { useWhyDidYouUpdate } from 'ahooks';

import { setActiveCategory } from "../redux/slices/category/categorySlice";
import { setPage } from '../redux/slices/pagination/paginationSlice';
import { selectorCategory } from "redux/selectors";

const Categories: React.FC = () => {
    const { categories, activeCategory } = useAppSelector(selectorCategory);
    const categoriesList = Object.keys(categories)
    const dispatch = useAppDispatch();

    const handleClick = (category: string) => {
        dispatch(setActiveCategory(category))
        dispatch(setPage(1));
    }
    // console.log('rerender category')
    // useWhyDidYouUpdate('Categories', {categories, activeCategory})

    return (
        <div className="categories">
            <ul>
                {categoriesList.map((category) => (
                    <li
                        className={category === activeCategory ? 'active' : ''}
                        onClick={() => handleClick(category)}
                        key={category}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Categories;
