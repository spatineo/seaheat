
export const depth =  [
  0.5016462, 1.515992, 2.548084, 3.602298, 4.684081, 5.8002, 6.959055, 8.171057, 9.449085, 10.80904, 
  12.27047, 13.85737, 15.59901, 17.53092, 19.69594, 22.14526, 24.93938, 28.14896, 31.85507, 36.14899, 41.13091, 46.90754, 53.58818, 61.27954, 70.07922, 80.06874, 
  91.30695, 103.8247, 117.622, 132.668, 148.9038, 166.248, 184.6028, 203.8617, 223.9153, 
  244.6568, 265.9862, 287.8122, 310.0536, 332.6397, 355.5102, 378.6138, 401.9077, 425.3563, 448.9304, 472.6059, 496.3634]

export const data = {
  one:  {
    axes: {
      x: {
        label: 'Month',
        values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      },
      y: {
        label: 'Depth',
        values: [ -10, -20, -30, -40, -50, -60]
      }
    },
    data: [
      { x: 'Jan', y: -10, value: 1 },
      { x: 'Jan', y: -20, value: 1 },
      { x: 'Jan', y: -30, value: 3 },
      { x: 'Jan', y: -40, value: 4},
      { x: 'Jan', y: -50, value: 4},
      { x: 'Jan', y: -60, value: 60},

      { x: 'Feb', y: -10, value: -1},
      { x: 'Feb', y: -20, value: 4},
      { x: 'Feb', y: -30, value: 2},
      { x: 'Feb', y: -40, value: 4},
      { x: 'Feb', y: -50, value: 4},
      { x: 'Feb', y: -60, value: 60},

      { x: 'Mar', y: -10, value: 4},
      { x: 'Mar', y: -20, value: 4},
      { x: 'Mar', y: -30, value: 4},
      { x: 'Mar', y: -40, value: 4},
      { x: 'Mar', y: -50, value: 4},
      { x: 'Mar', y: -60, value: 60},

      { x: 'Apr', y: -10, value: 6},
      { x: 'Apr', y: -20, value: 10},
      { x: 'Apr', y: -30, value: 4},
      { x: 'Apr', y: -40, value: 4},
      { x: 'Apr', y: -50, value: 4},
      { x: 'Apr', y: -60, value: 60},
      { x: 'May', y: 0, value: 11},
      { x: 'May', y: -10, value: 12},
      { x: 'May', y: -20, value: 15},
      { x: 'May', y: -30, value: 1},
      { x: 'May', y: -40, value: 4},
      { x: 'May', y: -50, value: 4},
      { x: 'May', y: '-6', value: 60},
      { x: 'Jun', y: -10, value: 11},
      { x: 'Jun', y: -20, value: 9},
      { x: 'Jun', y: -30, value: 4},
      { x: 'Jun', y: -40, value: 4},
      { x: 'Jun', y: -50, value: 4},
      { x: 'Jun', y: -60, value: 60},
      { x: 'Jul', y: -10, value: 24},
      { x: 'Jul', y: -20, value: 20},
      { x: 'Jul', y: -30, value: 15},
      { x: 'Jul', y: -40, value: 1},
      { x: 'Jul', y: -50, value: 4},
      { x: 'Jul', y: -60, value: 60},
      { x: 'Aug', y: -10, value: 21},
      { x: 'Aug', y: -20, value: 16},
      { x: 'Aug', y: -30, value: 11},
      { x: 'Aug', y: -40, value: 9},
      { x: 'Aug', y: -50, value: 4},
      { x: 'Aug', y: -60, value: 60},
      { x: 'Sept', y: -10, value: 16},
      { x: 'Sept', y: -20, value: 20},
      { x: 'Sept', y: -30, value: 11},
      { x: 'Sept', y: -40, value: 10},
      { x: 'Sept', y: -50, value: 4},
      { x: 'Sept', y: -60, value: 60},
      { x: 'Oct', y: -10, value: 11},
      { x: 'Oct', y: -20, value: 12},
      { x: 'Oct', y: -30, value: 5},
      { x: 'Oct', y: -40, value: 8},
      { x: 'Oct', y: -50, value: 4},
      { x: 'Oct', y: -60, value: 60},
      { x: 'Nov', y: -10, value: 13},
      { x: 'Nov', y: -20, value: 8},
      { x: 'Nov', y: -30, value: 4},
      { x: 'Nov', y: -40, value: 4},
      { x: 'Nov', y: -50, value: 4},
      { x: 'Nov', y: -60, value: 60},
      { x: 'Dec', y: -10, value: 5},
      { x: 'Dec', y: -20, value: 3},
      { x: 'Dec', y: -30, value: 3},
      { x: 'Dec', y: -40, value: 4},
      { x: 'Dec', y: -50, value: 4},
      { x: 'Dec', y: -60, value: 70},
    ],    legend: [
      { minValue: -2, maxValue: -1, color: '#5721AE' }, 
      { minValue: 0, maxValue: 4, color: '#435caf' }, 
      { minValue: 5, maxValue: 10, color: '#8cd67a' }, 
      { minValue: 11, maxValue: 15, color: '#eed323' }, 
      { minValue: 16, maxValue: 20, color: '#ca8c3b' }, 
      { minValue: 21, maxValue: 25, color: '#D50101' }, 
      { minValue: 26, maxValue: 50, color: '#770000' },
    ],
    seabedDepth: -51,
   },
   two:{
    axes: {
      x: {
        label: 'Month',
        values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      y: {
        label: 'Depth',
        values: [-10, -20, -30, -40, -50, -60]
      }
    },
    data: [   
    { x: 'Jan', y: -10, value: 1 },
    { x: 'Jan', y: -20, value: 1 },
    { x: 'Jan', y: -30, value: 3 },
    { x: 'Jan', y: -40, value: 4},
    { x: 'Jan', y: -50, value: 4},
    { x: 'Jan', y: -60, value: 60},

    { x: 'Feb', y: -10, value: -1},
    { x: 'Feb', y: -20, value: 4},
    { x: 'Feb', y: -30, value: 2},
    { x: 'Feb', y: -40, value: 4},
    { x: 'Feb', y: -50, value: 4},
    { x: 'Feb', y: -60, value: 60},

    { x: 'Mar', y: -10, value: 4},
    { x: 'Mar', y: -20, value: 4},
    { x: 'Mar', y: -30, value: 4},
    { x: 'Mar', y: -40, value: 4},
    { x: 'Mar', y: -50, value: 4},
    { x: 'Mar', y: -60, value: 60},

    { x: 'Apr', y: -10, value: 6},
    { x: 'Apr', y: -20, value: 10},
    { x: 'Apr', y: -30, value: 4},
    { x: 'Apr', y: -40, value: 4},
    { x: 'Apr', y: -50, value: 4},
    { x: 'Apr', y: -60, value: 60},
    { x: 'May', y: 0, value: 11},
    { x: 'May', y: -10, value: 12},
    { x: 'May', y: -20, value: 15},
    { x: 'May', y: -30, value: 1},
    { x: 'May', y: -40, value: 4},
    { x: 'May', y: -50, value: 4},
    { x: 'May', y: -60, value: 60},
    { x: 'Jun', y: -10, value: 11},
    { x: 'Jun', y: -20, value: 9},
    { x: 'Jun', y: -30, value: 4},
    { x: 'Jun', y: -40, value: 4},
    { x: 'Jun', y: -50, value: 4},
    { x: 'Jun', y: -60, value: 60},
    { x: 'Jul', y: -10, value: 24},
    { x: 'Jul', y: -20, value: 20},
    { x: 'Jul', y: -30, value: 15},
    { x: 'Jul', y: -40, value: 1},
    { x: 'Jul', y: -50, value: 4},
    { x: 'Jul', y: -60, value: 60},
  ],
  legend: [
    { minValue: -2, maxValue: -1, color: '#5721AE' }, 
    { minValue: 0, maxValue: 4, color: '#435caf' }, 
    { minValue: 5, maxValue: 10, color: '#8cd67a' }, 
    { minValue: 11, maxValue: 15, color: '#eed323' }, 
    { minValue: 16, maxValue: 20, color: '#ca8c3b' }, 
    { minValue: 21, maxValue: 25, color: '#D50101' }, 
    { minValue: 26, maxValue: 50, color: '#770000' },
  ],
    seabedDepth: -51
   },
   three:{
    axes: {
      x: {
        label: 'Month',
        values: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
      },
      y: {
        label: 'Depth',
        values: ['-10m', '-20m', '-30m', '-40m', '-50m', '-60m']
      }
    },
    data: [   
      { x: 'Jan', y: '-10m', value: 1 },
    { x: 'Jan', y: '-20m', value: 1 },
    { x: 'Jan', y: '-30m', value: 3 },
    { x: 'Jan', y: '-40m', value: 4},
    { x: 'Jan', y: '-50m', value: 4},
    { x: 'Jan', y: '-60m', value: 60},

    { x: 'Feb', y: '-10m', value: -1},
    { x: 'Feb', y: '-20m', value: 4},
    { x: 'Feb', y: '-30m', value: 2},
    { x: 'Feb', y: '-40m', value: 4},
    { x: 'Feb', y: '-50m', value: 4},
    { x: 'Feb', y: '-60m', value: 60},

    { x: 'Mar', y: '-10m', value: 4},
    { x: 'Mar', y: '-20m', value: 4},
    { x: 'Mar', y: '-30m', value: 4},
    { x: 'Mar', y: '-40m', value: 4},
    { x: 'Mar', y: '-50m', value: 4},
    { x: 'Mar', y: '-60m', value: 60},

    { x: 'Apr', y: '-10m', value: 6},
    { x: 'Apr', y: '-20m', value: 10},
    { x: 'Apr', y: '-30m', value: 4},
    { x: 'Apr', y: '-40m', value: 4},
    { x: 'Apr', y: '-50m', value: 4},
    { x: 'Apr', y: '-60m', value: 60},
    { x: 'May', y: '0m', value: 11},
    { x: 'May', y: '-10m', value: 12},
    { x: 'May', y: '-20m', value: 15},
    { x: 'May', y: '-30m', value: 1},
    { x: 'May', y: '-40m', value: 4},
    { x: 'May', y: '-50m', value: 4},
    { x: 'May', y: '-60m', value: 60},],
    seabedDepth: -51,
    legend: [
      { minValue: -2, maxValue: -1, color: '#5721AE' }, 
      { minValue: 0, maxValue: 4, color: '#435caf' }, 
     ]
   },
  
}

// max value is less than 0