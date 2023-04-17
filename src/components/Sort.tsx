import React from 'react';
import classNames from 'classnames'

import { selectorSort } from 'redux/selectors';
import { useAppSelector, useAppDispatch } from 'redux/store';
import { setActiveSortMethod } from '../redux/slices/sort/sortSlice';

const Sort = () => {
    const { sortMethods, activeSortMethod } = useAppSelector(selectorSort);
    const sortMethodList = Object.keys(sortMethods);
    const dispatch = useAppDispatch();
    const sortLabelRef = React.useRef<HTMLDivElement | null>(null);

    const [activePopup, setActivePopup] = React.useState(false);

    const sortLabelClassName = classNames(
        'sort__label',
        activePopup ? 'active' : '',
    );

    const handleFilterClick = (sortMethod: string) => {
        dispatch(setActiveSortMethod(sortMethod))
        setActivePopup(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sortLabelRef.current) {
                const path = e.composedPath().includes(sortLabelRef.current);
                if (!path) setActivePopup(false);
            }
        };
        document.body.addEventListener('click', handleClickOutside);
        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="sort">
            <div className={sortLabelClassName} ref={sortLabelRef}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setActivePopup(!activePopup)}>{activeSortMethod}</span>
            </div>
            <div className="sort__popup">
                <ul>
                    {sortMethodList.map(sortMethod => (
                        <li
                            className={activeSortMethod === sortMethod ? 'active' : ''}
                            onClick={() => handleFilterClick(sortMethod)}
                            key={sortMethod}
                        >
                            {sortMethod}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Sort;
