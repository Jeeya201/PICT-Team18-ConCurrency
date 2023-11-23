async function setup() {
  const count = document.getElementById('myChart').getContext('2d');

  let sYear = document.getElementById('sYearear').value;
  if (sYear == undefined) {
    sYear = '2012';
  }
  let eYear = document.getElementById('eYearear').value;
  if (eYear == undefined) {
    eYear = '2018';
  }
  let sMonth = document.getElementById('sMonthonth').value;
  if (sMonth == undefined) {
    sMonth = '04';
  }
  let eMonth = document.getElementById('eMonthonth').value;
  if (eMonth == undefined) {
    eMonth = '08';
  }
  let sDay = document.getElementById('sDayay').value;
  if (sDay == undefined) {
    sDay = '03';
  }
  let eDay = document.getElementById('eDayay').value;
  if (eDay == undefined) {
    eDay = '13';
  }
  let curList = document.getElementById('curlist').value;
  if (curList == '') {
    curList = 'INR                     ';
  }
  let opt = document.getElementById('period').value;
  if (opt == undefined) {
    opt = 'M';
  }

  let sDayate = sDay + '-' + sMonth + '-' + sYear;
  let eDayate = eDay + '-' + eMonth + '-' + eYear;
  console.log(opt);
  console.log(curList);
  console.log(sDayate);
  console.log(eDayate);
  const globalTemps = await getData(curList, sDayate, eDayate, opt);

  let chartStatus = Chart.getChart('myChart'); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  let myChart = new Chart(count, {
    type: 'line',
    data: {
      labels: globalTemps.months,
      datasets: [
        {
          label: 'Exchange Rate',
          data: globalTemps.new_curr,
          fill: false,
          borderColor: 'rgba(18, 18, 114, 1)',
          backgroundColor: 'rgba(18, 18, 114, 0.5)',
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });
  // }

  console.log('Passed');
}

async function getData(value2, value3, value4, value5) {
  const currency = [
    'USD',
    'DZD',
    'AUD',
    'BWP',
    'BRL',
    'BND',
    'CAD',
    'CLP',
    'CNY',
    'CZK',
    'DKK',
    'EUR',
    'INR',
    'ILS',
    'JPY',
    'KRW',
    'KWD',
    'MYR',
    'MUR',
    'MXN',
    'NZD',
    'NOK',
    'OMR',
    'PEN',
    'PHP',
    'PLN',
    'QAR',
    'RUB',
    'SAR',
    'SGD',
    'ZAR',
    'SEK',
    'CHF',
    'THB',
    'TTD',
    'AED',
    'GBP',
    'UYU',
    'COP',
    'BHD',
    'VEF',
    'HUF',
    'ISK',
    'IDR',
    'IRR',
    'KZT',
    'LYD',
    'NPR',
    'PKR',
    'LKR',
    'TND',
  ];
  // let c1 = value1
  let curList = value2;
  let d1 = value3;
  let d2 = value4;
  let opt = value5;
  let start = d1.toString();
  let end = d2.toString();
  // d1 = new Date(d1);
  // d2 = new Date(d2);

  console.log(start);
  console.log(end);
  console.log(curList);
  console.log(d1);
  console.log(d2);
  console.log(typeof d1);
  let sDayd = parseInt(start.slice(8, 10));
  let sMonthm = parseInt(start.slice(5, 7));
  let sYeary = parseInt(start.slice(0, 4));
  let eDayd = parseInt(end.slice(8, 10));
  let eMonthm = parseInt(end.slice(5, 7));
  let eYeary = parseInt(end.slice(0, 4));

  let i = currency.indexOf(curList) + 2;
  // let j= currency.indexOf(curList)+1;
  // let text2 =x.concat(z,".csv")
  // let text3="db/".concat(text2);
  let path1 = 'combined_file.csv';
  // path1=path1.concat(q,".csv");
  //console.log(path1);
  const response = await fetch(path1);
  //console.log("response: ", response);
  const data = await response.text();
  //console.log("data2",data);
  const t_date = [];
  const temps = [];
  const rows = data.split('\n').slice(1);
  rows.forEach((row) => {
    const cols = row.split(',');
    if (cols[1] >= d1 && cols[1] <= d2) {
      t_date.push(cols[1]);
      temps.push(parseFloat(cols[i]));
    }
  });

  //YEARLY ****************************************************************************************************
  if (opt == 'Y') {
    diff = eYeary - sYeary + 1;
    // let curr = new Array(diff); for (let a=sYeary; a<diff; a++) curr[a] = 0;
    // let years = new Array(diff); for (let b=sYeary; b<diff; b++) years[b] = 0;
    const curr = [];
    const years = [];
    // years.push(0);
    for (let a = sYeary; a <= eYeary; a++) {
      curr[a] = 0;
    }
    console.log(curr);
    for (let k = sYeary; k <= eYeary; k++) {
      let cnt = 0;
      for (let l = 0; l < t_date.length; l++) {
        let yy = t_date[l];
        console.log(typeof yy);
        if (yy.slice(0, 4) == k) {
          curr[k] = curr[k] + temps[l];
          cnt = cnt + 1;
        }
      }
      curr[k] = curr[k] / cnt;
      years.push(k);
      console.log('curr', curr);
    }
    console.log('yr', years);
    console.log('curr', curr);

    const new_curr = [];
    // new_curr.push(0);
    for (let k = sYeary; k <= eYeary; k++) {
      new_curr.push(curr[k]);
    }
    console.log('ncurr', new_curr);

    var max = Math.max.apply(null, new_curr);
    console.alert('max', max);
    var min = Math.min.apply(null, new_curr);
    console.alert('min', min);
    months = years;

    return { months, new_curr, max, min };
  }

  //MONTHLY ****************************************************************************************************

  if (opt == 'M') {
    diff = eYeary - sYeary + 1;
    // let curr = new Array(diff); for (let a=sYeary; a<diff; a++) curr[a] = 0;
    // let years = new Array(diff); for (let b=sYeary; b<diff; b++) years[b] = 0;
    const curr = [];
    const months = [];
    for (let a = sMonthm; a <= eMonthm; a++) {
      curr[a] = 0;
    }
    console.log(curr);
    for (let k = sMonthm; k <= eMonthm; k++) {
      let cnt = 0;
      for (let l = 0; l < t_date.length; l++) {
        let yy = t_date[l];
        console.log(typeof yy);
        if (yy.slice(5, 7) == k) {
          curr[k] = curr[k] + temps[l];
          cnt = cnt + 1;
        }
      }
      curr[k] = curr[k] / cnt;
      months.push(k);
      console.log('curr', curr);
    }
    console.log('mm', months);
    console.log('curr', curr);

    const new_curr = [];
    for (let k = sMonthm; k <= eMonthm; k++) {
      new_curr.push(curr[k]);
    }
    console.log('ncurr', new_curr);

    var max = Math.max.apply(null, new_curr);
    console.log('max', max);
    var min = Math.min.apply(null, new_curr);
    console.log('min', min);

    return { months, new_curr, max, min };
  }

  //DAILY ****************************************************************************************************

  if (opt == 'D') {
    diff = eYeary - sYeary + 1;
    const curr = [];
    const months = [];
    for (let a = sDayd; a <= eDayd; a++) {
      curr[a] = 0;
    }
    console.log(curr);
    for (let k = sDayd; k <= eDayd; k++) {
      let cnt = 0;
      for (let l = 0; l < t_date.length; l++) {
        let yy = t_date[l];
        console.log(typeof yy);
        if (yy.slice(8, 10) == k) {
          curr[k] = curr[k] + temps[l];
          cnt = cnt + 1;
        }
      }
      curr[k] = curr[k] / cnt;
      months.push(k);
      console.log('curr', curr);
    }
    console.log('mm', months);
    console.log('curr', curr);

    const new_curr = [];
    for (let k = sDayd; k <= eDayd; k++) {
      new_curr.push(curr[k]);
    }
    console.log('ncurr', new_curr);

    var max = Math.max.apply(null, new_curr);
    console.log('max', max);
    var min = Math.min.apply(null, new_curr);
    console.log('min', min);

    return { months, new_curr, max, min };
  }

  //WEEKLY ****************************************************************************************************

  if (opt == 'W') {
    diff = eYeary - sYeary + 1;
    const curr = [];
    const months = [];
    for (let a = sDayd; a <= eDayd; a++) {
      curr[a] = 0;
    }
    console.log(curr);
    for (let k = sDayd; k <= eDayd; k++) {
      let cnt = 0;
      for (let l = 0; l < t_date.length; l++) {
        let yy = t_date[l];
        console.log(typeof yy);
        if (yy.slice(8, 10) == k) {
          curr[k] = curr[k] + temps[l];
          cnt = cnt + 1;
        }
      }
      curr[k] = curr[k] / cnt;
      months.push(k);
      console.log('curr', curr);
    }
    console.log('mm', months);
    console.log('curr', curr);

    const new_curr = [];
    for (let k = sDayd; k <= eDayd; k++) {
      new_curr.push(curr[k]);
    }
    console.log('ncurr', new_curr);

    var max = Math.max.apply(null, new_curr);
    console.log('max', max);
    var min = Math.min.apply(null, new_curr);
    console.log('min', min);

    return { months, new_curr, max, min };
  }

  //QUARTERLY ****************************************************************************************************

  if (opt == 'Q') {
    diff = eYeary - sYeary + 1;
    // let curr = new Array(diff); for (let a=sYeary; a<diff; a++) curr[a] = 0;
    // let years = new Array(diff); for (let b=sYeary; b<diff; b++) years[b] = 0;
    const curr = [];
    const months = [];
    for (let a = sMonthm; a <= eMonthm; a++) {
      curr[a] = 0;
    }
    console.log(curr);
    for (let k = sMonthm; k <= eMonthm; k = k + 3) {
      let cnt = 0;
      for (let l = 0; l < t_date.length; l++) {
        let yy = t_date[l];
        console.log('type yy', typeof yy);
        if (yy.slice(5, 7) >= k && yy.slice(5, 7) < k + 3) {
          curr[k] = curr[k] + temps[l];
          cnt = cnt + 1;
        }
      }
      curr[k] = curr[k] / cnt;
      months.push(k);
      console.log('curr', curr);
    }
    console.log('mm', months);
    console.log('curr', curr);

    const new_curr = [];
    for (let k = sMonthm; k <= eMonthm; k++) {
      if (curr[k] != 0) {
        new_curr.push(curr[k]);
      }
    }
    console.log('ncurr', new_curr);

    var max = Math.max.apply(null, new_curr);
    console.log('max', max);
    var min = Math.min.apply(null, new_curr);
    console.log('min', min);
    return { months, new_curr, max, min };
  }
}
