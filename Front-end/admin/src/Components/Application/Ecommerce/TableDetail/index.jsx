import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import { ProductListDesc, ProductListTitle } from "../../../../Constant";
import ProductTableData from "./ProductTableData";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTableById } from "../../../../actions/table.actions";

const TableDetail = () => {
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table.table[0]);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTableById(id));
  }, [dispatch, table]);
  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Bàn Ăn"
        title={table?.ten_ban}
        mainTitle={table?.ten_ban}
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard
                title={table?.ten_ban}
                span1="Danh Sách các món ăn mà bàn đã đặt"
              />
              <CardBody>
                <ProductTableData table={table?.mon_an} idTable={id} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default TableDetail;
