import { Link, Outlet, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/16/solid';
import { fetchCoinDetail } from '../api';
import { useQuery } from '@tanstack/react-query';

interface IRouteParams {
  coinId?: string;
}

// interface ILocationParams {
//   state?: string;
// }

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
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
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
}

const Container = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.textColor};
  padding: 10px;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
const Overview = styled.div`
  display: flex;
  gap: 10px;
`;

const OverviewLeft = styled(Box)`
  flex: 0 0 60%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
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
      margin: 0px 5px 0px 1px;
    }
  }
`;

const Rank = styled.span`
  border: 1px solid #4cd137;
  border-radius: 5px;
  padding: 3px;
  margin-left: 7px;
  color: #4cd137;
  font-weight: 500;
  font-size: 13px;
`;

const DailyPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DailyPriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-right: 40px;
  }
`;

const Percent = styled.div<{ changeDirection: string }>`
  display: flex;
  align-items: center;
  span {
    color: ${(props) => (props.changeDirection === 'up' ? '#0984e3' : '#e17055')};
  }
`;

const StyledArrowTrendingUpIcon = styled(ArrowTrendingUpIcon)`
  height: 15px;
  width: 15px;
  margin-right: 2px;
`;
const StyledArrowTrendingDownIcon = styled(ArrowTrendingDownIcon)`
  height: 15px;
  width: 15px;
`;

const OverviewRight = styled.div`
  flex: 0 0 40%;
  display: flex;
  align-items: stretch;
  gap: 5px;
`;
const RightDetail = styled.div`
  padding: 10px;
  h1 {
    font-size: 14px;
  }
  span {
    font-weight: 500;
  }
  border-radius: 5px;
  &:nth-child(1) {
    background-color: #0984e3;
  }
  &:nth-child(2) {
    background-color: #00cec9;
  }
  &:nth-child(3) {
    background-color: #ff7675;
  }
`;

const RightDetailWrap = styled.div`
  margin-bottom: 7px;
`;

const Charts = styled(Box)`
  height: 50vh;
`;

const Tabs = styled.div`
  margin: 20px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  background-color: #d2d4da;
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
    font-weight: 600;
  }
  p {
    a {
      text-decoration: underline;
    }
  }
`;

function CoinDetail() {
  const { coinId } = useParams() as IRouteParams;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading, data: coinInfo } = useQuery<ICoinInfo>({
    queryKey: ['coinId', coinId],
    queryFn: () => fetchCoinDetail(coinId),
  });

  if (!coinInfo || isLoading) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Container>
      <Overview>
        <OverviewLeft>
          <Detail>
            <div>
              <img src={coinInfo.image.thumb} alt={coinInfo.name} />
              <span>
                {coinInfo.name} / {coinInfo.symbol.toUpperCase()}
              </span>
              <Rank>#{coinInfo.market_cap_rank}</Rank>
            </div>
            <div>
              <h2>${coinInfo.market_data?.current_price?.usd?.toLocaleString()}</h2>
            </div>
          </Detail>
          <DailyPrice>
            <DailyPriceDetail>
              <h1>24h %</h1>
              <Percent
                changeDirection={
                  coinInfo.market_data?.price_change_percentage_24h > 0 ? 'up' : 'down'
                }
              >
                <span>
                  {coinInfo.market_data?.price_change_percentage_24h > 0 ? (
                    <StyledArrowTrendingUpIcon className='h-6 w-6 text-gray-500' />
                  ) : (
                    <StyledArrowTrendingDownIcon className='h-6 w-6 text-gray-500' />
                  )}
                </span>
                <span>
                  {coinInfo.market_data?.price_change_percentage_24h
                    ? coinInfo.market_data?.price_change_percentage_24h.toFixed(2)
                    : ''}
                  %
                </span>
              </Percent>
            </DailyPriceDetail>
            <DailyPriceDetail>
              <h1>24h High</h1>
              <span>${coinInfo.market_data?.high_24h.usd?.toLocaleString()}</span>
            </DailyPriceDetail>
            <DailyPriceDetail>
              <h1>24h Low</h1>
              <span>${coinInfo.market_data?.low_24h.usd?.toLocaleString()}</span>
            </DailyPriceDetail>
          </DailyPrice>
        </OverviewLeft>
        <OverviewRight>
          <RightDetail>
            <RightDetailWrap>
              <h1>Market Cap</h1>
              <span>${coinInfo.market_data?.market_cap.usd?.toLocaleString()}</span>
            </RightDetailWrap>
            <RightDetailWrap>
              <h1>Fully Diluted Valuation</h1>
              <span>
                ${coinInfo.market_data?.fully_diluted_valuation.usd?.toLocaleString()}
              </span>
            </RightDetailWrap>
          </RightDetail>
          <RightDetail>
            <RightDetailWrap>
              <h1>Total Volume</h1>
              <span>${coinInfo.market_data?.total_volume.usd?.toLocaleString()}</span>
            </RightDetailWrap>
            <RightDetailWrap>
              <h1>Total Supply</h1>
              <span>${coinInfo.market_data?.total_supply?.toLocaleString()}</span>
            </RightDetailWrap>
          </RightDetail>
          <RightDetail>
            <RightDetailWrap>
              <h1>Max Supply</h1>
              <span>${coinInfo.market_data?.max_supply?.toLocaleString()}</span>
            </RightDetailWrap>
            <RightDetailWrap>
              <h1>Circulating Supply</h1>
              <span>${coinInfo.market_data?.circulating_supply?.toLocaleString()}</span>
            </RightDetailWrap>
          </RightDetail>
        </OverviewRight>
      </Overview>

      <Charts>
        <Tabs>
          <Tab isActive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>
          <Tab isActive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </Tab>
          <Outlet context={coinId} />
        </Tabs>
      </Charts>

      <Description>
        <h1>{coinInfo.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: coinInfo.description.en }} />
      </Description>
    </Container>
  );
}

export default CoinDetail;
