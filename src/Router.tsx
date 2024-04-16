import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CoinDetail from './routes/CoinDetail';
import Coins from './routes/Coins';

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
      },
    ],
  },
]);

export default router;
