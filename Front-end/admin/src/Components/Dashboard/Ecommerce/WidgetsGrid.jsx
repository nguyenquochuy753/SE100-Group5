import React from "react";
import { Col, Row } from "reactstrap";
// import { SmallWidgetsData } from '../../../Data/Ecommerce';
import SmallWidgets from "../../Common/CommonWidgets/SmallWidgets";
import TotalBalance from "./TotalBalance";

const WidgetsGrid = ({ order }) => {
  const today = new Date();
  // console.log(order?.length);

  const totalOrderMounth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (date.getMonth() == today.getMonth()) {
      return preOrder + 1;
    } else {
      return preOrder;
    }
  }, 0);
  const totalOrderPreMounth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (date.getMonth() == today.getMonth() - 1) {
      return preOrder + 1;
    } else {
      return preOrder;
    }
  }, 0);
  const SmallWidgetsData = [
    {
      title: "Đơn Hàng Mới",
      color: "primary",
      total: totalOrderMounth,
      gros: Math.abs(100 - (totalOrderMounth / totalOrderPreMounth) * 100),
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
      title: "Average Sale",
      color: "secondary",
      total: 389,
      gros: 10,
      prefix: "$",
      icon: "sale",
      suffix: "k",
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
