import styled from 'styled-components';
import CoinItem from './CoinItem';
import { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 0px 10px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
`;

const Loader = styled.div``;

// only use for the dev purpose
const coins = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 62601,
    market_cap: 1233398111599,
    market_cap_rank: 1,
    fully_diluted_valuation: 1315844009835,
    total_volume: 45070682801,
    high_24h: 66353,
    low_24h: 61714,
    price_change_24h: -3659.9522322724224,
    price_change_percentage_24h: -5.52356,
    market_cap_change_24h: -72512797918.14624,
    market_cap_change_percentage_24h: -5.55266,
    circulating_supply: 19684218.0,
    total_supply: 21000000.0,
    max_supply: 21000000.0,
    ath: 73738,
    ath_change_percentage: -15.02442,
    ath_date: '2024-03-14T07:10:36.635Z',
    atl: 67.81,
    atl_change_percentage: 92305.48978,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-04-16T11:23:37.405Z',
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    current_price: 3057.3,
    market_cap: 366727982133,
    market_cap_rank: 2,
    fully_diluted_valuation: 366727982133,
    total_volume: 23789072006,
    high_24h: 3252.45,
    low_24h: 3014.6,
    price_change_24h: -195.15841846837202,
    price_change_percentage_24h: -6.00034,
    market_cap_change_24h: -24167423551.470337,
    market_cap_change_percentage_24h: -6.18258,
    circulating_supply: 120070407.696719,
    total_supply: 120070407.696719,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -37.3086,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: 706227.68523,
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 64.3662631281095,
      currency: 'btc',
      percentage: 6436.62631281095,
    },
    last_updated: '2024-04-16T11:23:38.404Z',
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    current_price: 1.0,
    market_cap: 108134007371,
    market_cap_rank: 3,
    fully_diluted_valuation: 108134007371,
    total_volume: 78717436847,
    high_24h: 1.003,
    low_24h: 0.996768,
    price_change_24h: -0.001705510172081093,
    price_change_percentage_24h: -0.17025,
    market_cap_change_24h: 258126505,
    market_cap_change_percentage_24h: 0.23928,
    circulating_supply: 108100162510.754,
    total_supply: 108100162510.754,
    max_supply: null,
    ath: 1.32,
    ath_change_percentage: -24.41451,
    ath_date: '2018-07-24T00:00:00.000Z',
    atl: 0.572521,
    atl_change_percentage: 74.67797,
    atl_date: '2015-03-02T00:00:00.000Z',
    roi: null,
    last_updated: '2024-04-16T11:20:02.288Z',
  },
];

interface ICoin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

function Coins() {
  const [coinList, setCoinList] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(
  //       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1'
  //     );
  //     const json = await response.json();
  //     setCoinList(json);
  //     setLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        // <CoinsList>
        //   {coinList.map((coin: ICoin) => (
        //     <CoinItem key={coin.id} {...coin}></CoinItem>
        //   ))}
        // </CoinsList>
        <CoinsList>
          {coins.map((coin: ICoin) => (
            <CoinItem key={coin.id} {...coin}></CoinItem>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
