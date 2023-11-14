import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import { ProductListDesc, ProductListTitle } from "../../../../Constant";
import ProductTableData from "./ProductTableData";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";

const IngredientListContain = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Món Ăn"
        title="Danh Sách Nguyên Liệu"
        mainTitle="Danh Sách Nguyên Liệu"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard
                title={"Danh Sách Nguyên Liệu"}
                span1={"Các nguyên liệu nhà hàng đã tạo"}
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
export default IngredientListContain;
