import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

function CoinDetail() {
  const { coinId } = useParams();
  return <h1>Coin: {coinId}</h1>;
}

export default CoinDetail;
