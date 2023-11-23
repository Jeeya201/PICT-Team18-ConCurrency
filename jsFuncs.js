async function setup() {

  const ctx = document.getElementById('myChart').getContext('2d');
    
    let sYear = document.getElementById("s_Year").value;
    if(sYear==undefined)
    {
        sYear="2012";
    }
    let eYear = document.getElementById("e_Year").value;
    if(eYear==undefined)
    {
        eYear="2012";
    }
    let sMonth = document.getElementById("s_Month").value;
    if(sMonth==undefined)
    {
        sMonth="01";
    }
    let eMonth = document.getElementById("e_Month").value;
    if(eMonth==undefined)
    {
        eMonth="01";
    }
    let sDay = document.getElementById("s_Day").value;
    if(sDay==undefined)
    {
        sDay="01";
    }
    let eDay = document.getElementById("e_Day").value;
    if(eDay==undefined)
    {
        eDay="01";
    }
    let c2 = document.getElementById("curlist").value;
    if(c2=="")
    {
        c2="INR";
    }
    let option= document.getElementById("period").value;
    if(option==undefined)
    {
        option="M";
    }

 
    
    let sDate = sYear + "-" + sMonth + "-" + sDay;
    let eDate = eYear + "-" + eMonth + "-" + eDay;
    console.log(option);
    console.log(c2);
    console.log(sDate);
    console.log(eDate);
    const globalTemps = await getData(c2,sDate,eDate,option);
    
  
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
    let c2=value2
    let d1=value3
    let d2=value4
    let option=value5
    let start = d1.toString();
    let end = d2.toString();
    

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

    let path1="combined_final.csv";

    const response = await fetch(path1);
    console.log("response: ", response);
    const data = await response.text();

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
        if(option=='Y'){
         
          const curr = [];
          const years =[];
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

        if(option=='M'){
          diff = (e_yy-s_yy)+1;
          
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

        if(option=='D'){
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

         if(option=='W'){
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

         if(option=='Q'){
          diff = (e_yy-s_yy)+1;
          
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

