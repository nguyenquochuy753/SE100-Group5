import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import { ProductListDesc, ProductListTitle } from "../../../../Constant";
import ProductTableData from "./ProductTableData";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";

const TableListContain = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Bàn Ăn"
        title="Danh Sách Bàn Ăn"
        mainTitle="Danh Sách Bàn Ăn"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title={ProductListTitle} span1={ProductListDesc} />
              <CardBody>
                <ProductTableData />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default TableListContain;
