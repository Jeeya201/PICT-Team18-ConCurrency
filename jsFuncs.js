async function setup() {

  const ctx = document.getElementById('myChart').getContext('2d');
    
    let s_Y = document.getElementById("s_Year").value;
    if(s_Y==undefined)
    {
        s_Y="2012";
    }
    let e_Y = document.getElementById("e_Year").value;
    if(e_Y==undefined)
    {
        e_Y="2018";
    }
    let s_M = document.getElementById("s_Month").value;
    if(s_M==undefined)
    {
        s_M="04";
    }
    let e_M = document.getElementById("e_Month").value;
    if(e_M==undefined)
    {
        e_M="08";
    }
    let s_D = document.getElementById("s_Day").value;
    if(s_D==undefined)
    {
        s_D="03";
    }
    let e_D = document.getElementById("e_Day").value;
    if(e_D==undefined)
    {
        e_D="13";
    }
    let c2 = document.getElementById("curlist").value;
    if(c2=="")
    {
        c2="INR";
    }
    let opt= document.getElementById("period").value;
    if(opt==undefined)
    {
        opt="M";
    }

 
    let s_date = s_Y + "-" + s_M + "-" + s_D;
    let e_date = e_Y + "-" + e_M + "-" + e_D;
    console.log(opt);
    console.log(c2);
    console.log(s_date);
    console.log(e_date);
    const globalTemps = await getData(c2,s_date,e_date,opt);
    
  
      let chartStatus = Chart.getChart("myChart"); // <canvas> id
      if (chartStatus != undefined) {
      chartStatus.destroy();}
      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: globalTemps.months,
          datasets: [
            {
              label: 'Exchange Rate',
              data: globalTemps.new_curr,
              fill: false,
              borderColor: 'rgba(18, 18, 114, 1)',
              backgroundColor: 'rgb(82, 183, 136)',
              borderWidth: 1
            }
          ]
  
        },
        options: {}
      });
    // }

    console.log("Passed")

  }

 
  async function getData(value2,value3,value4,value5){
    const currency=["USD","DZD","AUD","BWP","BRL","BND","CAD","CLP","CNY","CZK","DKK","EUR","INR","ILS","JPY","KRW","KWD","MYR","MUR","MXN","NZD","NOK","OMR","PEN","PHP","PLN","QAR","RUB","SAR","SGD","ZAR","SEK","CHF","THB","TTD","AED","GBP","UYU","COP","BHD","VEF","HUF","ISK","IDR","IRR","KZT","LYD","NPR","PKR","LKR","TND"]
    // let c1 = value1
    let c2=value2
    let d1=value3
    let d2=value4
    let opt=value5
    let start = d1.toString();
    let end = d2.toString();
    // d1 = new Date(d1);
    // d2 = new Date(d2);

    console.log(start);
    console.log(end);
    console.log(c2);
    console.log(d1);
    console.log(d2);
    console.log(typeof d1);
    let s_dd = parseInt(start.slice(8,10));
    let s_mm = parseInt(start.slice(5,7));
    let s_yy = parseInt(start.slice(0,4));
    let e_dd = parseInt(end.slice(8,10));
    let e_mm = parseInt(end.slice(5,7));
    let e_yy = parseInt(end.slice(0,4));

    let i= currency.indexOf(c2)+2;
    // let j= currency.indexOf(c2)+1;
    // let text2 =x.concat(z,".csv")
    // let text3="db/".concat(text2);
    let path1="NT_final.csv";
    // path1=path1.concat(q,".csv");
    //console.log(path1);
    const response = await fetch(path1);
    //console.log("response: ", response);
    const data = await response.text();
    //console.log("data2",data);
        const t_date = [];
        const temps = [];
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
          const cols = row.split(',');
          if(cols[1]>=d1 && cols[1]<=d2)
          {
            t_date.push(cols[1]);
            temps.push(parseFloat(cols[i]));
          }
          
        });

        //YEARLY ****************************************************************************************************
        if(opt=='Y'){
          diff = (e_yy-s_yy)+1;
          // let curr = new Array(diff); for (let a=s_yy; a<diff; a++) curr[a] = 0;
          // let years = new Array(diff); for (let b=s_yy; b<diff; b++) years[b] = 0;
          const curr = [];
          const years =[];
          // years.push(0);
          for(let a=s_yy;a<=e_yy;a++){
            curr[a]=0;
          }
          console.log(curr);
          for(let k=s_yy;k<=e_yy;k++){
            let cnt=0;
            for(let l=0;l<t_date.length;l++){
              let yy=t_date[l]
              console.log(typeof(yy));
              if(yy.slice(0,4)==k){
                curr[k] = curr[k]+temps[l];
                cnt=cnt+1; 
              }
            }
            curr[k]=curr[k]/cnt;
            years.push(k);
            console.log("curr",curr);
          }
          console.log("yr",years);
          console.log("curr",curr);

          const new_curr=[];
          // new_curr.push(0);
          for(let k=s_yy;k<=e_yy;k++)
          {
            new_curr.push(curr[k]);
          }
          console.log("ncurr",new_curr);

          var max= Math.max.apply(null,new_curr);
          console.log("max",max);
          var min= Math.min.apply(null,new_curr);
          console.log("min",min);
          months=years

          return { months, new_curr, max, min};
        }

        
        //MONTHLY ****************************************************************************************************

        if(opt=='M'){
          diff = (e_yy-s_yy)+1;
          // let curr = new Array(diff); for (let a=s_yy; a<diff; a++) curr[a] = 0;
          // let years = new Array(diff); for (let b=s_yy; b<diff; b++) years[b] = 0;
          const curr = [];
          const months =[];
          for(let a=s_mm;a<=e_mm;a++){
            curr[a]=0;
          }
          console.log(curr);
          for(let k=s_mm;k<=e_mm;k++){
            let cnt=0;
            for(let l=0;l<t_date.length;l++){
              let yy=t_date[l]
              console.log(typeof(yy));
              if(yy.slice(5,7)==k){
                curr[k] = curr[k]+temps[l];
                cnt=cnt+1; 
              }
            }
            curr[k]=curr[k]/cnt;
            months.push(k);
            console.log("curr",curr);
          }
          console.log("mm",months);
          console.log("curr",curr);

          const new_curr=[];
          for(let k=s_mm;k<=e_mm;k++)
          {
            new_curr.push(curr[k]);
          }
          console.log("ncurr",new_curr);

          var max= Math.max.apply(null,new_curr);
          console.log("max",max);
          var min= Math.min.apply(null,new_curr);
          console.log("min",min);

          return { months, new_curr, max, min};
        }

         //DAILY ****************************************************************************************************

        if(opt=='D'){
          diff = (e_yy-s_yy)+1;
          const curr = [];
          const months =[];
          for(let a=s_dd;a<=e_dd;a++){
            curr[a]=0;
          }
          console.log(curr);
          for(let k=s_dd;k<=e_dd;k++){
            let cnt=0;
            for(let l=0;l<t_date.length;l++){
              let yy=t_date[l]
              console.log(typeof(yy));
              if(yy.slice(8,10)==k){
                curr[k] = curr[k]+temps[l];
                cnt=cnt+1; 
              }
            }
            curr[k]=curr[k]/cnt;
            months.push(k);
            console.log("curr",curr);
          }
          console.log("mm",months);
          console.log("curr",curr);

          const new_curr=[];
          for(let k=s_dd;k<=e_dd;k++)
          {
            new_curr.push(curr[k]);
          }
          console.log("ncurr",new_curr);

          var max= Math.max.apply(null,new_curr);
          console.log("max",max);
          var min= Math.min.apply(null,new_curr);
          console.log("min",min);

          return { months, new_curr, max, min};
        }


         //WEEKLY ****************************************************************************************************

         if(opt=='W'){
          diff = (e_yy-s_yy)+1;
          const curr = [];
          const months =[];
          for(let a=s_dd;a<=e_dd;a++){
            curr[a]=0;
          }
          console.log(curr);
          for(let k=s_dd;k<=e_dd;k++){
            let cnt=0;
            for(let l=0;l<t_date.length;l++){
              let yy=t_date[l]
              console.log(typeof(yy));
              if(yy.slice(8,10)==k){
                curr[k] = curr[k]+temps[l];
                cnt=cnt+1; 
              }
            }
            curr[k]=curr[k]/cnt;
            months.push(k);
            console.log("curr",curr);
          }
          console.log("mm",months);
          console.log("curr",curr);

          const new_curr=[];
          for(let k=s_dd;k<=e_dd;k++)
          {
            new_curr.push(curr[k]);
          }
          console.log("ncurr",new_curr);

          var max= Math.max.apply(null,new_curr);
          console.log("max",max);
          var min= Math.min.apply(null,new_curr);
          console.log("min",min);

          return { months, new_curr, max, min};
        }


         //QUARTERLY ****************************************************************************************************

         if(opt=='Q'){
          diff = (e_yy-s_yy)+1;
          // let curr = new Array(diff); for (let a=s_yy; a<diff; a++) curr[a] = 0;
          // let years = new Array(diff); for (let b=s_yy; b<diff; b++) years[b] = 0;
          const curr = [];
          const months =[];
          for(let a=s_mm;a<=e_mm;a++){
            curr[a]=0;
          }
          console.log(curr);
          for(let k=s_mm;k<=e_mm;k=k+3){
            let cnt=0;
            for(let l=0;l<t_date.length;l++){
              let yy=t_date[l]
              console.log("type yy",typeof(yy));
              if((yy.slice(5,7)>=k) && (yy.slice(5,7)<k+3)){
                curr[k] = curr[k]+temps[l];
                cnt=cnt+1; 
              }
            }
            curr[k]=curr[k]/cnt;
            months.push(k);
            console.log("curr",curr);
          }
          console.log("mm",months);
          console.log("curr",curr);

          const new_curr=[];
          for(let k=s_mm;k<=e_mm;k++)
          {
            if(curr[k]!=0){
              new_curr.push(curr[k]);
            }
            
          }
          console.log("ncurr",new_curr);

          var max= Math.max.apply(null,new_curr);
          console.log("max",max);
          var min= Math.min.apply(null,new_curr);
          console.log("min",min);
          return { months, new_curr, max, min};
        }
  }

