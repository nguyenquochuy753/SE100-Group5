import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { H4, Image } from "../../../AbstractElements";
import { TapUpBalance, ThisMonth, TotalBalanceTitle } from "../../../Constant";

import CountUp from "react-countup";
import WidgetImg from "../../../assets/images/dashboard-2/widget-img.png";
import MobileGif from "../../../assets/images/dashboard-2/mobile.gif";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../actions/order.actions";

const TotalBalance = () => {
  const today = new Date();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const totalBalanceThisMounth = order?.reduce((preOrder, currOrder) => {
    const date = new Date(currOrder.createdAt);
    if (date.getMonth() == today.getMonth()) {
      return (
        preOrder +
        currOrder.mon_an.reduce(
          (pre, curr) => pre + curr.ma_mon_an?.gia * curr.sl,
          0
        )
      );
    } else {
      return preOrder;
    }
  }, 0);
  return (
    <Card className="o-hidden">
      <CardBody className="balance-widget">
        <span className="f-w-500 f-light">Tổng Số Dư</span>
        <H4 attrH4={{ className: "mb-3 mt-1 f-w-500 mb-0 f-22" }}>
          <CountUp
            suffix="đ"
            duration={5}
            start={0}
            separator=","
            end={totalBalanceThisMounth}
          />
          <span className="f-light f-14 f-w-400 ms-1">Tháng Này</span>
        </H4>
        <Link
          className="purchase-btn btn btn-primary btn-hover-effect f-w-500"
          to="#"
        >
          Nhấn Vào Số Dư
        </Link>
        <div className="mobile-right-img">
          <Image
            attrImage={{
              className: "left-mobile-img",
              src: "data:image/png;base64,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",
              alt: "",
            }}
          />
          <Image
            attrImage={{
              className: "mobile-img",
              src: "https://react.pixelstrap.com/cuba-context/static/media/mobile.a64a3ab46d68f70e1e57.gif",
              alt: "mobile with coin",
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default TotalBalance;
