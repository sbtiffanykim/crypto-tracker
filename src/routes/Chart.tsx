import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useOutletContext } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IOutletProps {
  coinId?: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);

  const coinId = useOutletContext() as IOutletProps;
  // data: ['timestamp', 'open', 'high', 'low', 'close']
  const { isLoading, data } = useQuery({
    queryKey: ['ohlc', coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <>
      {isLoading ? (
        'loading a chart'
      ) : (
        <>
          <ApexChart
            type='line'
            series={[
              {
                name: 'Price',
                data: data?.map((price) => [price[0], price[4]]),
              },
            ]}
            options={{
              chart: {
                height: 'auto',
                width: 'auto',
                toolbar: { show: false },
                background: 'transparent',
              },
              stroke: { curve: 'smooth' },
              theme: { mode: 'dark' },
              xaxis: {
                type: 'datetime',
                labels: { show: true },
                categories: data?.map((price) => [price[0]]),
              },

              grid: { show: false },
              yaxis: { show: true },
              fill: {
                type: 'gradient',
                gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
              },
              colors: ['#0fbcf9'],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(3)}`,
                },
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default Chart;
