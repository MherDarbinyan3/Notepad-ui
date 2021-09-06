import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button} from 'antd';

import { useQueryGistList } from '../../queries/gist/hooks/useQueryGistList';

import LineChart from '../../components/shared/LineChart/LineChart';

import './stats.scss';

interface IStatsProps {}

export const Stats: React.FunctionComponent<IStatsProps> = () => {
  const history = useHistory();
  const itemPerPage = 5;
  const [page, setPage] = useState<number>(0);
  const { data: gistData, loading } = useQueryGistList();

  const getDateRanges = (start: any, end: any) => {
    const startDate = start;
    let dateRanges: any = [];
    let range: any = start;

    const dif = end.getTime() - start.getTime();
    const secondsBetweenDates = Math.abs(dif / 1000);

    for (let i = 0; i <= Math.round(secondsBetweenDates / 5); i++) {
      if (!dateRanges.length) {
        dateRanges.push(new Date(startDate.setSeconds(startDate.getSeconds())));
      }
      const nextRange = range.setSeconds(range.getSeconds() + 5);
      dateRanges.push(new Date(nextRange));
      range = new Date(nextRange);
    }

    return dateRanges.splice(1);
  }

  const getData = (gists: any, page: number) => {
    const dates = gists.map((gist: any) => {
      return new Date(gist.created_at);
    });

    let data: any = [];
    const sortedDates = dates.sort();
    const start = sortedDates[0];
    const end = sortedDates[dates.length - 1];
    const ranges = getDateRanges(start, end);

    sortedDates.map((item: any) => {
      for (let i = 0; i < ranges.length - 1; i++) {
        const current = ranges[i];
        const next = ranges[i + 1];
        if (item.getTime() >= current.getTime() && item.getTime() <= next.getTime()) {
          if (data[current]) {
            data[current].push(current);
          } else {
            data[current] = [current]
          }
        }
      }
    });
    let chartData: any = [];
    Object.keys(data).map((item: any) => {
      const date = new Date(item);
      chartData.push({
        time: date.toLocaleTimeString(),
        value: data[item].length
      });
    });

    return chartData.slice(page, page + itemPerPage);
  }

  const getConfigs = (gists: any, page: number) => {
    return {
      data: getData(gists, page),
      height: 400,
      xField: 'time',
      yField: 'value',
      point: {
        size: 5,
        shape: 'circle',
      },
      label: {
        style: {
          fill: '#333',
        },
      },
    };
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='stats'>
      <div className='verticalLabel'>Number of Gists</div>
      <LineChart config={getConfigs(gistData.gists, page)} />
      <Button
        disabled={!getData(gistData.gists, page).length}
        size='large'
        className='viewStat'
        onClick={() => setPage(page + itemPerPage)}
      >
        Load More
      </Button>
      <div className='actionButton'>
        <Button
          size='large'
          className='viewStat'
          onClick={() => history.goBack()}
        >
          Close Stats
        </Button>
      </div>
    </div>
  );
}

export default Stats;
