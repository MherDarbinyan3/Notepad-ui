import React from 'react';
import { Line } from '@ant-design/charts';

import './lineChart.scss';

interface ILineChartProps {
  config: any;
}

export const LineChart: React.FunctionComponent<ILineChartProps> = ({
  config
}) => {

  return (
    <Line className='lineChart' {...config} />
  );
}

export default LineChart;
