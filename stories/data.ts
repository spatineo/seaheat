import * as echarts from 'echarts';
const d =  [
  [100, 302, 301, 334, 390, 330, 320, 400, 300, 200, 210, 310],
  [320, 132, 101, 134, 90, 230, 210, 200, 210, 310, 300, 200],
  [220, 182, 191, 234, 290, 330, 310, 200, 210, 310, 600, 100],
  [150, 212, 201, 154, 190, 330, 410, 150, 170, 200, 210, 310],
  [820, 832, 901, 200, 210, 310, 934, 1290, 1330, 1320, 300, 120],
  [220, 182, 11, 234, 290, 200, 210, 310, 230, 310, 120, 150],
  [820, 332, 901, 934, 200, 210, 310, 1290, 1330, 1320, 180, 140],
];

const totalData: number[] = [];
for (let i = 0; i < d[0].length; ++i) {
  let sum = 0;
  for (let j = 0; j < d.length; ++j) {
    sum += d[j][i];
  }
  totalData.push(sum);
}

const series: echarts.SeriesOption | echarts.SeriesOption[] | undefined = [
  'Direct',
  'Mail Ad',
  'Affiliate Ad',
  'Video Ad',
  'Search Engine',
].map((name, sid) => {
  return {
    name,
    type: 'bar',
    stack: 'total',
    data: d[sid].map((d, did) =>
      totalData[did] <= 0 ? 0 : d / totalData[did]
    )
  };
});

const option: echarts.EChartsOption = {
  yAxis: {
    type: 'value'
  },
  xAxis: {
    position: 'top',
    type: 'category',
    data: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ]
  },
  series
};

export const data = {
  option,
  arg: [
    { color: '#671bcd', value: '< 0°C' },
    { color: '#285db3', value: '0 - 4°C' },
    { color: '#64d96e', value: '5 - 10°C' },
    { color: '#f7d147', value: '11 - 15°C' },
    { color: '#e48b32', value: '16 - 20°C' },
    { color: '#e43222', value: '21 - 25°C' },
    { color: '#80170e', value: '> 25°C' },
    { color: '#666666', value: 'No Data' },
  ],
  position: [55.893856, 19.051956]
}