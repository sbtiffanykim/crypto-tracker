import React from 'react';
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
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 15px;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: color 0.2s ease-in-out;
  display: block;
  &:hover {
    color: ${(props) => props.theme.accentColor};
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
  console.log(coin);
  return (
    <Link to={`/${coin.id}`} state={coin.name}>
      <Coin>
        <Wrapper>
          <CoinImg src={coin.image} alt={coin.id} />
          <div>{coin.name}</div>
        </Wrapper>
        <div>$ {coin.current_price}</div>
        <div>{coin.price_change_24h.toFixed(5)}</div>
        <div>{coin.price_change_percentage_24h.toFixed(2)}%</div>
      </Coin>
    </Link>
  );
}

export default CoinItem;
