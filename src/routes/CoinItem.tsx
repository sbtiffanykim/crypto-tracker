import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ICoinItem {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

const Coin = styled.div`
  background-color: ${(props) => props.theme.surface_mixed_200};
  color: ${(props) => props.theme.surface_mixed_600};
  padding: 15px;
  border-radius: 2px;
  transition: color 0.2s ease-in-out;
  display: block;
  &:hover {
    color: ${(props) => props.theme.primary_500};
  }
`;

const CoinImg = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

function CoinItem({ ...coin }: ICoinItem) {
  return (
    <Link to={`/${coin.id}`} state={coin.name}>
      <Coin>
        <Wrapper>
          <CoinImg src={coin.image} alt={coin.id} />
          <h1>{coin.name}</h1>
        </Wrapper>
        <h2>$ {coin.current_price}</h2>
        <div>{coin.price_change_24h.toFixed(4)}</div>
        <div>{coin.price_change_percentage_24h.toFixed(2)}%</div>
      </Coin>
    </Link>
  );
}

export default CoinItem;
