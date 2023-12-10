import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts';
import { useGetAllProductQuery } from '../../Services/Api_Product';
import Loading from '../../Component/Loading';

const Dashboard = () => {
  const { data: dataGetViews, isLoading: loadingViews }: any = useGetAllProductQuery();
  const [totalViews, setTotalViews]: any = useState(); // default views
  const [totalAllViews, setTotalAllViews]: any = useState(0);
  const [selectView, setSelectView]: any = useState("top10");
  const HandelViews = (): void => {
    Highcharts.chart({
      chart: {
        type: 'pie',
        renderTo: 'StatictisViews'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            format: '{point.name}: {point.percentage:.1f} %'
          },
        }
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.y} lượt xem</b>'
    },
      series: totalViews.series,
    });

  }
  setTimeout(() => {
    HandelViews();
  }, 100);

  const Top10_View = () => {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    setSelectView("top10");
    if (!loadingViews) {
      let arrayNew: any = [];
      let countViews = 0;
      dataGetViews.map((views: any) => {
        if (views.views > 0) {
          countViews += views.views
          arrayNew.push({
            name: views.name,
            y: views.views,
            color: getRandomColor()
          });
        };
      });
      setTotalAllViews(countViews);
      let data: any = arrayNew.sort((a: any, b: any) => a.y - b.y)
      data = data.slice(-10)
      setTotalViews({
        series: [{
          data
        }]
      });
    };
  }

  const Top5_View = () => {
    setSelectView("top5");
    const data = totalViews.series[0].data.slice(-5)
    setTotalViews({
      series: [{
        data
      }]
    });
  }

  useEffect(() => {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    if (!loadingViews) {
      let arrayNew: any = [];
      let countViews = 0;
      dataGetViews.map((views: any) => {
        if (views.views > 0) {
          countViews += views.views
          arrayNew.push({
            name: views.name,
            y: views.views,
            color: getRandomColor()
          });
        };
      });
      setTotalAllViews(countViews);
      let data: any = arrayNew.sort((a: any, b: any) => a.y - b.y)
      data = data.slice(-10)
      setTotalViews({
        series: [{
          data
        }]
      });
    };
  }, [dataGetViews])


  return (
    <div className='h-[80vh] scrollDasboard'>

      <div className="flex justify-between border rounded-md VIEWS select-none">
        <div className={`selector-Views`}>
          <h3 className='mt-2 text-sky-600 ml-10'>Thống kê theo lượt xem:</h3>
          <p className='ml-2'>(*) Mặc định 10 sản phẩm có lượt views cao nhất</p>
          <p className='-mt-4 ml-2'>(*) Tổng lượt xem toàn bộ: <span className='text-orange-500'>{totalAllViews} views /{dataGetViews?.length} sản phẩm.</span></p>
          <div className="flex space-x-2 ml-20 ">
            {selectView == "top10" ? <input type="radio" id='top10' name='a' checked /> : <input type="radio" id='top10' name='a' disabled/>}
            <label htmlFor='top10'><p className='m-0 cursor-pointer font-bold' onClick={() => Top10_View()}>Top 10 sản phẩm lượt xem cao nhất. </p></label>
          </div>
          <div className="flex space-x-2 ml-20 ">
            {selectView == "top5" ? <input type="radio" id='top5' name='a' checked /> : <input type="radio" id='top5' name='a' disabled/>}
            <label htmlFor='top5'><p className='m-0 cursor-pointer font-bold' onClick={() => Top5_View()}>Top 5 sản phẩm lượt xem cao nhất. </p></label>

          </div>
        </div>
        {loadingViews ? <Loading /> : <div className='w-[900px] h-[500px]' id={`StatictisViews`}></div>}

      </div>

    </div>
  )
}

export default Dashboard
