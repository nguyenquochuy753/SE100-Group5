import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import LeftGrid from "./LeftGrid";
import RightGrid from "./RightGrid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders } from "../../../actions/order.actions";

const Ecommerce = () => {
  const order = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Bảng Điều Khiển Nhà Hàng"
        parent="Bảng Điều Khiển"
        title="Nhà Hàng"
      />
      <Container fluid={true}>
        <Row className="size-column">
          {order && <LeftGrid order={order} />}
          <RightGrid />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Ecommerce;
