import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import { ProductListDesc, ProductListTitle } from "../../../../Constant";
import ProductTableData from "./ProductTableData";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";

const CategoryListContain = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Món Ăn"
        title="Danh Sách Danh Mục"
        mainTitle="Danh Sách Danh Mục"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard
                title={"Danh Sách Danh Mục Món Ăn"}
                span1={"Các danh mục món ăn nhà hàng đã tạo"}
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
export default CategoryListContain;
