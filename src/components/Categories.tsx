import React from 'react';

import { setActiveCategory } from '../redux/slices/category/categorySlice';
import { setPage } from '../redux/slices/pagination/paginationSlice';

import { selectorCategory } from 'redux/selectors';
import { useAppSelector, useAppDispatch } from 'redux/store';

const Categories: React.FC = () => {
  const { categories, activeCategory } = useAppSelector(selectorCategory);
  const categoriesList = Object.keys(categories);
  const dispatch = useAppDispatch();

  const handleClick = (category: string): void => {
    dispatch(setActiveCategory(category));
    dispatch(setPage(1));
  };

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category) => (
          <li
            className={category === activeCategory ? 'active' : ''}
            onClick={() => handleClick(category)}
            key={category}
            role="menuitem"
            tabIndex={0}
            onKeyPress={(event) =>
              event.key === 'Enter' ? handleClick(category) : undefined
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
