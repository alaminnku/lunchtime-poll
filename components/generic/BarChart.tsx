'use client';

import { Poll } from '@prisma/client';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface ChartRef extends HTMLCanvasElement {
  chart: Chart;
}

type Props = {
  poll: Poll;
};

export default function BarChart({ poll }: Props) {
  const chartRef = useRef<ChartRef | null>(null);

  const voteMap: Record<string, number> = {};
  for (const vote of poll.votes) {
    if (!voteMap[vote.answer]) {
      voteMap[vote.answer] = 0;
    }
    voteMap[vote.answer] += 1;
  }

  const voteGroups: { vote: string; count: number }[] = [];
  for (const key in voteMap) {
    voteGroups.push({ vote: key, count: voteMap[key] });
  }

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) chartRef.current.chart.destroy();
      const context = chartRef.current.getContext('2d');
      if (context) {
        const newChart = new Chart(context, {
          type: 'bar',
          data: {
            labels: voteGroups.map((group) => group.vote),
            datasets: [
              {
                label: poll.question,
                data: voteGroups.map((group) => group.count),
                backgroundColor: ['#A87676', '#CA8787', '#E1ACAC'],
              },
            ],
          },
        });
        chartRef.current.chart = newChart;
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
}
