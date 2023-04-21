import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import DetailProduct from './components/DetailProduct';

import './scss/app.scss';
import Loader, { LoaderSize } from 'components/Loader/Loader';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<Suspense fallback={<Loader size={LoaderSize.l} />}><Cart /></Suspense>} />
        <Route path='product/:id' element={<DetailProduct />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
