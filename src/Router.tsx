import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CoinDetail from './routes/CoinDetail';
import Coins from './routes/Coins';
import Chart from './routes/Chart';
import Price from './routes/Price';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Coins />,
      },
      {
        path: ':coinId',
        element: <CoinDetail />,
        children: [
          {
            path: 'chart',
            element: <Chart />,
          },
          {
            path: 'price',
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
