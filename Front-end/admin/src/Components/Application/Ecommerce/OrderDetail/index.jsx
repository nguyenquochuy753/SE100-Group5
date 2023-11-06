import React, { Fragment } from "react";
import PrintComponent from "./Print";
import { Breadcrumbs } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaceOrderById } from "../../../../actions/order.actions";
import { useParams } from "react-router";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order } = useSelector((state) => state.order);
  console.log(id);
  useEffect(() => {
    if (id) {
      dispatch(getPlaceOrderById(id));
    }
  }, [dispatch]);
  return (
    <Fragment>
      <Breadcrumbs parent="Ecommerce" title={`Hóa Đơn`} mainTitle="Hóa Đơn" />
      <PrintComponent order={order} />
    </Fragment>
  );
};
export default OrderDetail;
