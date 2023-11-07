import React, { Fragment } from "react";
import PrintComponent from "./Print";
import { Breadcrumbs } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaceOrderById } from "../../../../actions/order.actions";

const InvoiceContain = () => {
  const dispatch = useDispatch();
  const { order, orderId } = useSelector((state) => state.order);
  console.log(orderId);
  useEffect(() => {
    if (orderId) {
      dispatch(getPlaceOrderById(orderId));
    }
  }, [dispatch, orderId]);
  return (
    <Fragment>
      <Breadcrumbs parent="Ecommerce" title={`Hóa Đơn`} mainTitle="Hóa Đơn" />
      <PrintComponent order={order} />
    </Fragment>
  );
};
export default InvoiceContain;
