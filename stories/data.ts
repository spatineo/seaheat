

export const data = {
  arg:  {
    axes: {
      x: {
        label: 'Month',
        values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      },
      y: {
        label: 'Depth',
        values: ['0m', '-10m', '-20m', '-30m', '-40m', '-50m', '-60m']
      }
    },
    data: [{ x: 'Jan', y: '0m', value: 10 }, { x: 'Jan', y: '-10m', value: 8 }],
    legend: [{ minValue: 10, maxValue: 14, color: '#443388' }],
    seabedDepth: -51
   },
}