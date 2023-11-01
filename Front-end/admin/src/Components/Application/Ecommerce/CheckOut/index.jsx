import React, { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import { BillingDetails } from "../../../../Constant";
import CheckoutTableData from "./CheckoutTableData";

import ProductPlaceOrder from "./ProductPlaceOrder";
import HeaderCard from "../../../Common/Component/HeaderCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getTableById } from "../../../../actions/table.actions";

const CheckOutContain = () => {
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table.table[0]);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getTableById(id));
  }, [dispatch]);
  return (
    <Fragment>
      <Breadcrumbs
        parent={table?.ten_ban}
        title="Thanh Toán"
        mainTitle="Thanh Toán"
      />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card className="checkout">
              <HeaderCard title="Chi Tiết Thanh Toán" />
              <CardBody>
                <Row>
                  {/* <CheckoutTableData /> */}
                  <ProductPlaceOrder
                    table={table?.mon_an}
                    idTable={id}
                    nameTable={table?.ten_ban}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CheckOutContain;
