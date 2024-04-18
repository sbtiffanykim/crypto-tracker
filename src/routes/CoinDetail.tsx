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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const OverviewLeft = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  :nth-child(1) {
    display: flex;
    align-items: center;
    img {
      margin-right: 4px;
    }
  }
  :nth-child(2) {
    h2 {
      font-weight: 700;
      font-size: 30px;
      margin-right: 5px;
    }
  }
`;

const Rank = styled.span`
  border: 1px solid #4cd137;
  border-radius: 5px;
  padding: 3px;
  margin-left: 5px;
  color: #4cd137;
  font-weight: 500;
  font-size: 13px;
`;

const DailyPrice = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const DailyPriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  :first-child {
    margin-right: 25px;
  }
  &:last-child {
    color: #4834d4;
  }
`;

const OverviewRight = styled(Box)`
  display: flex;
`;
const CapInfo = styled.div`
  span {
    display: block;
  }
`;
const SupplyInfo = styled.div`
  span {
    display: block;
  }
`;

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
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)}
    a {
    display: block;
  }
`;

const Description = styled(Box)`
  padding: 20px;
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
  const [loading, setLoading] = useState(true);
  const [coinInfo, setCoinInfo] = useState<ICoinInfo>({});
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  // useEffect(() => {
  //   const fetchCoinInfo = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`
  //       );
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch coin data');
  //       }
  //       const coinData = await response.json();
  //       setCoinInfo(coinData);
  //     } catch (error) {
  //       console.error('Error while fetching coin data: ', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCoinInfo();
  // }, [coinId]);

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`)
      ).json();
      setCoinInfo(response);
      setLoading(false);
    })();
  }, [coinId]);

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
                  </span>
                  <Rank>Rank #{coinInfo.market_data.market_cap_rank}</Rank>
                </div>
                <div>
                  <h2>${coinInfo.market_data?.current_price?.usd?.toLocaleString()}</h2>
                </div>
              </Detail>
              <DailyPrice>
                <DailyPriceDetail>
                  <span>24h %</span>
                  <span>
                    {coinInfo.market_data?.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </DailyPriceDetail>
                <DailyPriceDetail>
                  <span>24h High</span>

                  <span>${coinInfo.market_data?.high_24h.usd?.toLocaleString()}</span>
                </DailyPriceDetail>
                <DailyPriceDetail>
                  <span>24h Low</span>
                  <span>${coinInfo.market_data?.low_24h.usd?.toLocaleString()}</span>
                </DailyPriceDetail>
              </DailyPrice>
            </OverviewLeft>
            <OverviewRight>
              <CapInfo>
                <div>
                  <span>Market Cap</span>
                  <span>${coinInfo.market_data?.market_cap.usd?.toLocaleString()}</span>
                </div>
                <div>
                  <span>Fully Diluted Valuation</span>
                  <span>
                    ${coinInfo.market_data?.fully_diluted_valuation.usd?.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span>Total Volume</span>
                  <span>${coinInfo.market_data?.total_volume.usd?.toLocaleString()}</span>
                </div>
              </CapInfo>
              <SupplyInfo>
                <div>
                  <span>Total Supply</span>
                  <span>${coinInfo.market_data?.total_supply?.toLocaleString()}</span>
                </div>
                <div>
                  <span>Max Supply</span>
                  <span>${coinInfo.market_data?.max_supply?.toLocaleString()}</span>
                </div>
                <div>
                  <span>Circulating Supply</span>
                  <span>
                    ${coinInfo.market_data?.circulating_supply?.toLocaleString()}
                  </span>
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
