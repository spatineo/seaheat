export const data = {
  one:  {
    axes: {
      x: {
        label: 'Month',
        values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      y: {
        label: 'Depth',
        values: [  
          0.5016462, 1.515992, 2.548084, 3.602298, 4.684081, 5.8002, 6.959055, 8.171057, 9.449085, 10.80904, 
          12.27047, 13.85737, 15.59901, 17.53092, 19.69594, 22.14526, 24.93938, 28.14896, 31.85507, 36.14899, 41.13091, 
          46.90754, 53.58818, 61.27954, 70.07922, 80.06874, 91.30695, 103.8247, 117.622, 132.668, 148.9038, 166.248, 184.6028, 
          203.8617, 223.9153, 244.6568, 265.9862, 287.8122, 310.0536, 332.6397, 355.5102, 378.6138, 401.9077, 425.3563, 448.9304, 472.6059, 496.3634
        ]
      }
    },
    data: [
      { x: 0, y: 0, value: 1 },
      { x: 0, y: 1, value: 1 },
      { x: 0, y: 2, value: 3 },
      { x: 0, y: 3, value: 4},
      { x: 0, y: 4, value: 4},
      { x: 0, y: 5, value: 60},

      { x: 1, y: 0, value: -1},
      { x: 1, y: 1, value: 4},
      { x: 1, y: 2, value: 2},
      { x: 1, y: 3, value: 4},
      { x: 1, y: 4, value: 4},
      { x: 1, y: 5, value: 60},

      { x: 2, y: 0, value: 4},
      { x: 2, y: 1, value: 4},
      { x: 2, y: 2, value: 4},
      { x: 2, y: 3, value: 4},
      { x: 2, y: 4, value: 4},
      { x: 2, y: 5, value: 60},

      { x: 3, y: 0, value: 6},
      { x: 3, y: 1, value: 10},
      { x: 3, y: 2, value: 4},
      { x: 3, y: 3, value: 4},
      { x: 3, y: 4, value: 4},
      { x: 3, y: 5, value: 60},

      { x: 4, y: 0,value: 11},
      { x: 4, y: 1, value: 12},
      { x: 4, y: 2, value: 15},
      { x: 4, y: 3, value: 1},
      { x: 4, y: 4, value: 4},
      { x: 4, y: 5, value: 60},

      { x: 5, y: 0, value: 11},
      { x: 5, y: 1, value: 9},
      { x: 5, y: 2, value: 4},
      { x: 5, y: 3, value: 4},
      { x: 5, y: 4, value: 4},
      { x: 5, y: 5, value: 60},

      { x: 6, y: 0, value: 24},
      { x: 6, y: 1, value: 20},
      { x: 6, y: 2, value: 15},
      { x: 6, y: 3, value: 1},
      { x: 6, y: 4, value: 4},
      { x: 6, y: 5, value: 60},

      { x: 7, y: 0, value: 4},
      { x: 7, y: 1, value: 21},
      { x: 7, y: 2, value: 16},
      { x: 7, y: 3, value: 11},
      { x: 7, y: 4, value: 9},
      { x: 7, y: 5, value: 60},

      { x: 8, y: 0, value: 16},
      { x: 8, y: 1, value: 20},
      { x: 8, y: 2, value: 11},
      { x: 8, y: 3, value: 10},
      { x: 8, y: 4, value: 4},
      { x: 8, y: 5, value: 60},

      { x: 9, y: 0, value: 11},
      { x: 9, y: 1, value: 12},
      { x: 9, y: 2, value: 5},
      { x: 9, y: 3, value: 8},
      { x: 9, y: 4, value: 4},
      { x: 9, y: 5, value: 60},

      { x: 10, y: 0, value: 13},
      { x: 10, y: 1, value: 8},
      { x: 10, y: 2, value: 4},
      { x: 10, y: 3, value: 4},
      { x: 10, y: 4, value: 4},
      { x: 10, y: 5, value: 60},

      { x: 11, y: 0, value: 5},
      { x: 11, y: 1, value: 3},
      { x: 11, y: 2, value: 3},
      { x: 11, y: 3, value: 4},
      { x: 11, y: 4, value: 4},
      { x: 11, y: 5, value: 70},
      
    ],    legend: [
      { minValue: -2, maxValue: -1, color: '#5721AE' }, 
      { minValue: 0, maxValue: 4, color: '#435caf' }, 
      { minValue: 5, maxValue: 10, color: '#8cd67a' }, 
      { minValue: 11, maxValue: 15, color: '#eed323' }, 
      { minValue: 16, maxValue: 20, color: '#ca8c3b' }, 
      { minValue: 21, maxValue: 25, color: '#D50101' }, 
      { minValue: 26, maxValue: 50, color: '#770000' },
    ],
    seabedDepth: 51,
   },
   /*
   two:{
    axes: {
      x: {
        label: 'Month',
        values: ['Jar', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      y: {
        label: 'Depth',
        values: [-10, -20, -30, -40, -50, -60]
      }
    },
    data: [   
    { x: 0, y: -10, value: 1 },
    { x: 0, y: -20, value: 1 },
    { x: 0, y: -30, value: 3 },
    { x: 0, y: -40, value: 4},
    { x: 0, y: -50, value: 4},
    { x: 0, y: -60, value: 60},

    { x: 'Feb', y: -10, value: -1},
    { x: 'Feb', y: -20, value: 4},
    { x: 'Feb', y: -30, value: 2},
    { x: 'Feb', y: -40, value: 4},
    { x: 'Feb', y: -50, value: 4},
    { x: 'Feb', y: -60, value: 60},

    { x: 2, y: -10, value: 4},
    { x: 2, y: -20, value: 4},
    { x: 2, y: -30, value: 4},
    { x: 2, y: -40, value: 4},
    { x: 2, y: -50, value: 4},
    { x: 2, y: -60, value: 60},

    { x: 3, y: -10, value: 6},
    { x: 3, y: -20, value: 10},
    { x: 3, y: -30, value: 4},
    { x: 3, y: -40, value: 4},
    { x: 3, y: -50, value: 4},
    { x: 3, y: -60, value: 60},
    { x: 4, y: 0, value: 11},
    { x: 4, y: -10, value: 12},
    { x: 4, y: -20, value: 15},
    { x: 4, y: -30, value: 1},
    { x: 4, y: -40, value: 4},
    { x: 4, y: -50, value: 4},
    { x: 4, y: -60, value: 60},
    { x: 6, y: -10, value: 11},
    { x: 6, y: -20, value: 9},
    { x: 6, y: -30, value: 4},
    { x: 6, y: -40, value: 4},
    { x: 6, y: -50, value: 4},
    { x: 6, y: -60, value: 60},
    { x: 6, y: -10, value: 24},
    { x: 6, y: -20, value: 20},
    { x: 6, y: -30, value: 15},
    { x: 6, y: -40, value: 1},
    { x: 6, y: -50, value: 4},
    { x: 6, y: -60, value: 60},
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
    seabedDepth: 51
   },
   three:{
    axes: {
      x: {
        label: 'Month',
        values: ['Jar', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      y: {
        label: 'Depth',
        values: ['-10m', '-20m', '-30m', '-40m', '-50m', '-60m']
      }
    },
    data: [   
      { x: 0, y: '-10m', value: 1 },
    { x: 0, y: '-20m', value: 1 },
    { x: 0, y: '-30m', value: 3 },
    { x: 0, y: '-40m', value: 4},
    { x: 0, y: '-50m', value: 4},
    { x: 0, y: '-60m', value: 60},

    { x: 1, y: '-10m', value: -1},
    { x: 1, y: '-20m', value: 4},
    { x: 1, y: '-30m', value: 2},
    { x: 1, y: '-40m', value: 4},
    { x: 1, y: '-50m', value: 4},
    { x: 1, y: '-60m', value: 60},

    { x: 2, y: '-10m', value: 4},
    { x: 2, y: '-20m', value: 4},
    { x: 2, y: '-30m', value: 4},
    { x: 2, y: '-40m', value: 4},
    { x: 2, y: '-50m', value: 4},
    { x: 2, y: '-60m', value: 60},

    { x: 3, y: '-10m', value: 6},
    { x: 3, y: '-20m', value: 10},
    { x: 3, y: '-30m', value: 4},
    { x: 3, y: '-40m', value: 4},
    { x: 3, y: '-50m', value: 4},
    { x: 3, y: '-60m', value: 60},
    { x: 4, y: '0m', value: 11},
    { x: 4, y: '-10m', value: 12},
    { x: 4, y: '-20m', value: 15},
    { x: 4, y: '-30m', value: 1},
    { x: 4, y: '-40m', value: 4},
    { x: 4, y: '-50m', value: 4},
    { x: 4, y: '-60m', value: 60},],
    seabedDepth: 51,
    legend: [
      { minValue: -2, maxValue: -1, color: '#5721AE' }, 
      { minValue: 0, maxValue: 4, color: '#435caf' }, 
     ]
   },
  */
}

// max value is less than 0