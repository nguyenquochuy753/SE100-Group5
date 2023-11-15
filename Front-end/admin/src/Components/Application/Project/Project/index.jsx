import React, { Fragment, useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Target, Info, CheckCircle, PlusCircle, Bookmark } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Done, All, Doing, CreateNewProject } from "../../../../Constant";
import { Breadcrumbs } from "../../../../AbstractElements";
import ProjectContext from "../../../../_helper/Project";
import CusClass from "../Common/CusClass";
import CustomizerContext from "../../../../_helper/Customizer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bookTable, getTable } from "../../../../actions/table.actions";

const Project = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const table = useSelector((state) => state.table.tables);
  const tableBook = useSelector((state) => state.table.tableBook);
  const { layoutURL } = useContext(CustomizerContext);
  const [activeTab, setActiveTab] = useState("1");
  const { allData } = useContext(ProjectContext);
  useEffect(() => {
    dispatch(getTable());
  }, [dispatch]);
  const bookTableHandler = (id, name, trang_thai) => {
    if (trang_thai == "Đang Ăn") {
      history(
        `${process.env.PUBLIC_URL}/app/ecommerce/detailtable/${id}/${layoutURL}`
      );
    } else {
      dispatch(bookTable({ id, name }));
      history(`${process.env.PUBLIC_URL}/app/ecommerce/select/${layoutURL}`);
    }
  };
  console.log(table);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Nhà Hàng"
        title="Đặt Bàn"
        mainTitle="Đặt Bàn"
      />
      <Container fluid={true}>
        <Row className="project-card">
          <Col md="12" className="project-list">
            <Card>
              <Row>
                <Col md="6">
                  <Nav tabs className="border-tab">
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => setActiveTab("1")}
                      >
                        <Target />
                        Tất Cả
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => setActiveTab("2")}
                      >
                        <Info />
                        Trống
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => setActiveTab("3")}
                      >
                        <CheckCircle />
                        Đang Ăn
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "4" ? "active" : ""}
                        onClick={() => setActiveTab("4")}
                      >
                        <Bookmark />
                        Đã Đặt
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                {/* <Col md="6">
                  <div className="text-end">
                    <Link
                      className="btn btn-primary"
                      style={{ color: "white" }}
                      to={`${process.env.PUBLIC_URL}/app/project/new-project/${layoutURL}`}
                    >
                      {" "}
                      <PlusCircle />
                      {CreateNewProject}
                    </Link>
                  </div>
                </Col> */}
              </Row>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {table?.map((item, i) => (
                        <CusClass
                          item={item}
                          key={i}
                          bookTable={bookTableHandler}
                        />
                      ))}
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      {table?.map((item, i) =>
                        item.trang_thai == "Trống" ? (
                          <CusClass item={item} key={i} />
                        ) : (
                          ""
                        )
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      {table?.map((item, i) =>
                        item.trang_thai == "Đang Ăn" ? (
                          <CusClass item={item} key={i} />
                        ) : (
                          ""
                        )
                      )}
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Project;
