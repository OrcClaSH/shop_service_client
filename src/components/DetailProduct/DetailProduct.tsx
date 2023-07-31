import React, { useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { addItem } from '../../redux/slices/cart/cartSlice';
import { countProductId, urlBase } from '../../utils';
import ErrorOnPage from '../ErrorOnPage/ErrorOnPage';
import { typesProduct } from '../ProductBlock/ProductBlock';
import Skeleton from '../ProductBlock/Skeleton';

import st from './DetailProduct.module.scss';

import ButtonToHome from 'components/ButtonToHome/ButtonToHome';
import { selectorCartById } from 'redux/selectors';
import { useAppSelector, useAppDispatch } from 'redux/store';

interface IProduct {
  title: string;
  price: number;
  imageUrl: string;
  types: [0, 1];
  sizes: number[];
  full_data: string;
}

const DetailProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id: idStr } = useParams();
  const idNumber = +idStr!;
  const url = `${urlBase}/${idNumber}`;
  const [error, setError] = useState('');
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeType, setActiveType] = useState(0);
  const [activeSizeId, setActiveSizeId] = useState(0);
  const cartFilteredProducts = useAppSelector(selectorCartById(idNumber));
  const count = countProductId(cartFilteredProducts, idNumber);
  const productDescription = product?.full_data ? product.full_data.split(';') : [];

  const onClickAdd = (): void => {
    if (product) {
      dispatch(
        addItem({
          id: idNumber,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          sizes: product.sizes,
          activeType,
          activeSizeId,
          count: 1,
          idProduct: `${idNumber}_${activeType}_${activeSizeId}`,
        }),
      );
    }
  };

  React.useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);

        setProduct(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (!idStr) setError('Не указан ID продукта');
  if (error) {
    return <ErrorOnPage error={error} />;
  }

  return (
    <div className={st.container}>
      {isLoading || !product ? (
        <Skeleton />
      ) : (
        <div className={st['product-block']}>
          <img
            className={st['product-block__image']}
            src={product.imageUrl}
            alt="Cash Tape"
          />

          <div className={st['product-block__description-wrapper']}>
            <h4 className={st['product-block__title']}>{product.title}</h4>
            <div className={st['product-block__about']}>
              {productDescription.map((about) => (
                <p className={st['product-block__about-text']} key={about}>
                  {about}
                </p>
              ))}
            </div>

            <div className={st['product-block__bottom']}>
              <div className={st['product-block__selector']}>
                <ul>
                  {product.types.map((type, typeId) => (
                    <li
                      className={typeId === activeType ? st.active : ''}
                      onClick={() => setActiveType(typeId)}
                      key={type}
                      role="menuitem"
                      tabIndex={0}
                      onKeyPress={(event) =>
                        event.key === 'Enter' ? setActiveType(typeId) : undefined
                      }
                    >
                      {typesProduct[type]}
                    </li>
                  ))}
                </ul>
                <ul>
                  {product.sizes.map((size, sizeId) => (
                    <li
                      className={sizeId === activeSizeId ? st.active : ''}
                      onClick={() => setActiveSizeId(sizeId)}
                      key={size}
                      role="menuitem"
                      tabIndex={0}
                      onKeyPress={(event) =>
                        event.key === 'Enter' ? setActiveSizeId(sizeId) : undefined
                      }
                    >
                      {size} см.
                    </li>
                  ))}
                </ul>
              </div>
              <div className={st['product-block__price']}>{product.price} ₽</div>
              <button
                className={`button button--outline button--add ${st['product-block__button']}`}
                onClick={onClickAdd}
                type="button"
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
            <ButtonToHome />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
