import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "redux/store";
import { Link } from "react-router-dom";
import { addItem } from '../../redux/slices/cart/cartSlice';
import { countProductId } from "../../utils";
import { selectorCartById } from "redux/selectors";

export const typesProduct = {
    0: 'длина 46 м',
    1: 'длина 37 м',
}

type TProductBlockProps = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    types: [0, 1];
    sizes: number[];
}

const ProductBlock: React.FC<TProductBlockProps> = ({ title, price, imageUrl, types, sizes, id }) => {
    const [activeType, setActiveType] = useState(0);
    const [activeSizeId, setActiveSizeId] = useState(0);
    const cartFilteredGoods = useAppSelector(selectorCartById(id));
    const [productName, productBrand] = title.split('-').map(item => item.trim())
    const count = countProductId(cartFilteredGoods, id);
    const dispatch = useAppDispatch();

    const onClickAdd = () => {
        dispatch(addItem({
            id,
            title,
            price,
            imageUrl,
            activeType,
            sizes,
            activeSizeId,
            count: 1,
            idProduct: `${id}_${activeType}_${activeSizeId}`,
        }));
    };

    return (
        <div className="product-block">
            <Link to={`/product/${id}`} >
                <img
                    className="product-block__image"
                    src={imageUrl}
                    alt="Cash tape"
                />
                <h4 className="product-block__title">{productName}<br/>{productBrand}</h4>
            </Link>
            <div className="product-block__selector">
                <ul>
                    {types.map((type, typeId) => (
                        <li
                            className={typeId === activeType ? 'active' : ''}
                            onClick={() => setActiveType(typeId)}
                            key={type}
                        >
                            {typesProduct[type]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, sizeId) => (
                        <li
                            className={sizeId === activeSizeId ? 'active' : ''}
                            onClick={() => setActiveSizeId(sizeId)}
                            key={size}
                        >
                            {size} мм.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-block__bottom">
                <div className="product-block__price">от {price} ₽</div>
                <button
                    className="button button--outline button--add"
                    onClick={onClickAdd}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {!!count && <i>{count}</i>}
                </button>
            </div>
        </div>
    )
};

export default ProductBlock;
