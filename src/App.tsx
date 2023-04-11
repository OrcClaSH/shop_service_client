import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DetailProduct from './components/DetailProduct';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<Suspense fallback={<h2>Загрузка...</h2>}><Cart /></Suspense>} />
        <Route path='product/:id' element={<DetailProduct />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

// TODO при вводе поискового запроса переключить страницу на 1
// TODO params на остальных страницах
