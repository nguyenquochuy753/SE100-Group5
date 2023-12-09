import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import { ProductListDesc, ProductListTitle } from "../../../../Constant";
import ProductTableData from "./ProductTableData";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";

const UserList = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Nhân Sự"
        title="Danh Sách Nhân Viên"
        mainTitle="Danh Sách Nhân Viên"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard
                title={"Danh Sách Nhân Viên"}
                span1={"Các nhân viên đang làm việc trong nhà hàng"}
              />
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
export default UserList;
