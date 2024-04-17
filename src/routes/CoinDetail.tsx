import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface IRouteParams {
  coinId?: string;
}

interface ILocationParams {
  state?: string;
}

interface ICoinInfo {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  genesis_date: string;
  market_cap_rank: number;
  market_data: {
    price_change_percentage_24h: number;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    market_cap_rank: number;
    current_price: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    fully_diluted_valuation: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
  };
  last_updated: string;
}

const Container = styled.div`
  margin: 20px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  background-color: #f5f6fa;
  margin: 10px;
  padding: 10px;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;
const Overview = styled.div`
  display: flex;
`;

const OverviewLeft = styled(Box)`
  width: 60%;
  display: flex;
`;
const Detail = styled.div`
  width: 60%;
`;
const DailyPrice = styled.div`
  width: 40%;
`;
const OverviewRight = styled(Box)`
  width: 40%;
`;
const CapInfo = styled.div``;
const SupplyInfo = styled.div``;

const Tabs = styled.div`
  margin: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  background-color: #7f8fa6;
  padding: 8px;
  border-radius: 15px;
  color: ${(props) => (props.$isActive ? props.theme.accentColor : props.theme.textColor)}
    a {
    display: block;
  }
`;

const Description = styled.div`
  margin: 20px 0px;
  h1 {
    margin-bottom: 10px;
  }
  p {
    a {
      text-decoration: underline;
    }
  }
`;

function CoinDetail() {
  const { coinId } = useParams() as IRouteParams;
  const { state } = useLocation() as ILocationParams;
  const [loading, setLoading] = useState(true);
  const [coinInfo, setCoinInfo] = useState<ICoinInfo>({});
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  useEffect(() => {
    (async () => {
      const coinData = await (
        await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`)
      ).json();
      setCoinInfo(coinData);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewLeft>
              <Detail>
                <div>
                  <img src={coinInfo.image.thumb} alt={coinInfo.name} />
                  <span>
                    {coinInfo.name} / {coinInfo.symbol.toUpperCase()}
                    <span>Rank #{coinInfo.market_data.market_cap_rank}</span>
                  </span>
                </div>
                <div>
                  <span>${coinInfo.market_data.current_price.usd}</span>
                  <span>
                    {coinInfo.market_data.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </Detail>
              <DailyPrice>
                <div>
                  <span>High</span>
                  <span>${coinInfo.market_data.high_24h.usd}</span>
                </div>
                <div>
                  <span>Low</span>
                  <span>${coinInfo.market_data.low_24h.usd}</span>
                </div>
              </DailyPrice>
            </OverviewLeft>
            <OverviewRight>
              <CapInfo>
                <div>
                  <span>Market Cap</span>
                  <span>${coinInfo.market_data.market_cap.usd}</span>
                </div>
                <div>
                  <span>Fully Diluted Valuation</span>
                  <span>${coinInfo.market_data.fully_diluted_valuation.usd}</span>
                </div>
                <div>
                  <span>Total Volume</span>
                  <span>${coinInfo.market_data.total_volume.usd}</span>
                </div>
              </CapInfo>
              <SupplyInfo>
                <div>
                  <span>Total Supply</span>
                  <span>${coinInfo.market_data.total_supply}</span>
                </div>
                <div>
                  <span>Max Supply</span>
                  <span>${coinInfo.market_data.max_supply}</span>
                </div>
                <div>
                  <span>Circulating Supply</span>
                  <span>${coinInfo.market_data.circulating_supply}</span>
                </div>
              </SupplyInfo>
            </OverviewRight>
          </Overview>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Outlet />
          </Tabs>

          <Description>
            <h1>{coinInfo.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: coinInfo.description.en }} />
          </Description>
        </>
      )}
    </Container>
  );
}
export default CoinDetail;
