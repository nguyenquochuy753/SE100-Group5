import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import EditMyProfile from "./EditmyProfile";
import MyProfileEdit from "./MyProfile";
import UserTable from "./UserTable";

const UserCreate = () => {
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Thêm Nhân Viên"
        parent="Quản Lý Nhân Sự"
        title="Thêm Nhân Viên"
      />
      <Container fluid={true}>
        <div className="edit-profile">
          <Row>
            <Col xl="4">
              <MyProfileEdit />
            </Col>
            <Col xl="8">
              <EditMyProfile />
            </Col>
            {/* <Col md="12">
              <UserTable />
            </Col> */}
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default UserCreate;
