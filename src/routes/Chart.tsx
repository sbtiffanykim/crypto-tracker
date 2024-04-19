interface ChartProps {
  coinId?: string;
}

function Chart({ coinId }: ChartProps) {
  console.log(coinId);
  return <h1>Chart</h1>;
}

export default Chart;
