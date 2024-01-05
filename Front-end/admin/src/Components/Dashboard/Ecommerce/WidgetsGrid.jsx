import React from "react";
import { Col, Row } from "reactstrap";
// import { SmallWidgetsData } from '../../../Data/Ecommerce';
import SmallWidgets from "../../Common/CommonWidgets/SmallWidgets";
import TotalBalance from "./TotalBalance";

const WidgetsGrid = ({ order }) => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const totalOrderThisMonth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return preOrder + 1;
    } else {
      return preOrder;
    }
  }, 0);
  const totalSaleOrderThisMonth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
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
  const totalOrderLastMonth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (
      date.getMonth() === lastMonth.getMonth() &&
      date.getFullYear() === lastMonth.getFullYear()
    ) {
      return preOrder + 1;
    } else {
      return preOrder;
    }
  }, 0);
  const totalSaleOrderLastMonth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (
      date.getMonth() === lastMonth.getMonth() &&
      date.getFullYear() === lastMonth.getFullYear()
    ) {
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
  const SmallWidgetsData = [
    {
      title: "Đơn Hàng Mới",
      color: "primary",
      total: totalOrderThisMonth,
      gros: Math.abs(
        100 - (totalOrderThisMonth / totalOrderLastMonth) * 100
      ).toFixed(0),
      icon: "new-order",
    },
    {
      title: "New Customers",
      color: "warning",
      total: 2_908,
      gros: 20,
      icon: "customers",
    },
    {
      title: "Doanh Thu Trung Bình",
      color: "secondary",
      total: totalSaleOrderThisMonth,
      gros: Math.abs(
        100 - (totalSaleOrderThisMonth / totalSaleOrderLastMonth) * 100
      ).toFixed(0),
      // prefix: "$",
      icon: "sale",
      suffix: "đ",
    },
    {
      title: "Gross Profit",
      color: "success",
      total: 3_908,
      gros: 80,
      prefix: "$",
      icon: "profit",
    },
  ];
  return (
    <Col xxl="5" md="7" className="box-col-7">
      <Row>
        <Col sm="12">
          <TotalBalance />
        </Col>
        {order &&
          SmallWidgetsData.map((data, i) => (
            <Col xs="6" key={i}>
              <SmallWidgets data={data} />
            </Col>
          ))}
      </Row>
    </Col>
  );
};

export default WidgetsGrid;
