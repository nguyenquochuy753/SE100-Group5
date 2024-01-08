import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { H5, H4 } from "../../../AbstractElements";
import { DailyDropdown, OrderThisMonthTitle } from "../../../Constant";
// import { OrderThisMonthChart } from "../../../Data/Ecommerce/Chart";
import DropdownCommon from "../../Common/Dropdown";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
const getCountOfDate = (order, date) => {
  const count = order?.reduce((preOrder, currOrder) => {
    const dateOrder = new Date(currOrder.createdAt);
    if (dateOrder.getDate() == date) {
      return preOrder + 1;
    } else {
      return preOrder;
    }
  }, 0);
  return count;
};
const OrderThisMonth = ({ order }) => {
  const today = new Date();
  const listDate = [];
  for (let i = 1; i <= today.getDate(); i++) {
    if (i < 10) {
      listDate.push("0" + i);
    } else {
      listDate.push(i + "");
    }
  }
  const listOrderOfDate = [];
  let countOrder = 0;
  for (let i = 1; i <= today.getDate(); i++) {
    const count = getCountOfDate(order, i);
    if (countOrder < count) {
      countOrder = count;
    }
    listOrderOfDate.push(count);
  }
  console.log(listOrderOfDate);
  const totalSaleOrderMounth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (date.getMonth() == today.getMonth()) {
      return (
        preOrder +
        currOrder?.mon_an?.reduce(
          (pre, curr) => pre + curr.ma_mon_an.gia * curr.sl,
          0
        )
      );
    } else {
      return preOrder;
    }
  }, 0);

  const OrderThisMonthChart = {
    series: [
      {
        name: "Đơn hàng",
        data: listOrderOfDate,
      },
    ],
    options: {
      chart: {
        height: 235,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      colors: [
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
        "#7064F5",
      ],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 1,
          gradientToColors: [
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
            "#FF8BA7",
          ],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          // stops: [0, 50, 100],
          colorStops: [
            {
              offset: 0,
              color: "#e183b7",
              opacity: 1,
            },
            {
              offset: 20,
              color: "#ff8ba7",
              opacity: 1,
            },
            {
              offset: 30,
              color: "#b377d0",
              opacity: 1,
            },
            {
              offset: 65,
              color: "#7064f5",
              opacity: 1,
            },
            {
              offset: 70,
              color: "#b778cf",
              opacity: 1,
            },
            {
              offset: 80,
              color: "#eb86b2",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#a873d7",
              opacity: 1,
            },
          ],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        borderColor: "#e7e7e7",
        yaxis: {
          lines: {
            show: false,
          },
        },
        column: {
          colors: ["transparent", "var(--light-background)"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: listDate,
        tickAmount: 6,
        tickPlacement: "between",
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: 0,
        max: countOrder,
        axisBorder: {
          show: true,
          color: "var(--chart-border)",
          offsetX: 12,
          offsetY: 5,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        shared: false,
      },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 230,
            },
          },
        },
      ],
    },
  };

  return (
    <Card className="card">
      <CardHeader className="card-header card-no-border">
        <div className="header-top">
          <H5 attrH5={{ className: "m-0" }}>Đơn Hàng Tháng Này</H5>
          <div className="card-header-right-icon">
            <DropdownCommon
              dropdownMain={{
                className: "icon-dropdown",
                direction: "start",
              }}
              options={DailyDropdown}
              iconName="icon-more-alt"
              btn={{ tag: "span" }}
            />
          </div>
        </div>
      </CardHeader>
      {totalSaleOrderMounth && (
        <CardBody className="card-body pt-0">
          <div className="light-card balance-card d-inline-block">
            <H4 attrH4={{ className: "m-0" }}>
              <CountUp
                className="me-1"
                suffix="đ"
                duration={0}
                separator=","
                end={totalSaleOrderMounth}
              />
              <CountUp
                className="f-light f-14"
                prefix="("
                suffix="đ Mục Tiêu)"
                duration={0}
                separator=","
                end={500000000}
              />
            </H4>
          </div>
          <div className="order-wrapper">
            <ReactApexChart
              type="line"
              height={235}
              options={OrderThisMonthChart.options}
              series={OrderThisMonthChart.series}
            />
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default OrderThisMonth;
