import React, { Fragment, useContext, useEffect } from "react";
import { Breadcrumbs, Btn } from "../../../../AbstractElements";
import ProjectContext from "../../../../_helper/Project";
import { Add, Cancel } from "../../../../Constant";
import ProjectTitleClass from "./ProjectTitle";
import ClientNameClass from "./ClientName";
import ProjectRateClass from "./ProjectRate";
import IssueClass from "./IssueClass";
import EnterSomeDetailsClass from "./EnterSomeDetails";
import UploadProjectFileClass from "./UploadProjectFile";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, CardBody, Form } from "reactstrap";
import CustomizerContext from "../../../../_helper/Customizer";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  getTableById,
  updateTable,
} from "../../../../actions/table.actions";
import { useState } from "react";

const EditCategory = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const project = useContext(ProjectContext);
  const table = useSelector((state) => state.table.table);
  const [tableEdit, setTableEdit] = useState();
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(getTableById(id));
    setTableEdit(table[0]);
  }, [dispatch, table]);

  const AddProject = (data) => {
    if (data !== "") {
      // project.addNewProject(data);
      console.log(data);
      dispatch(
        updateTable({
          id: id,
          ten_ban: data.title != "" ? data.title : tableEdit.ten_ban,
          so_ghe: data.soGhe != "" ? data.soGhe : tableEdit.so_ghe,
          trang_thai: tableEdit.trang_thai,
        })
      );
      history(
        `${process.env.PUBLIC_URL}/app/ecommerce/table/table-list/${layoutURL}`
      );
    } else {
      errors.showMessages();
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Bàn Ăn"
        title="Cập Nhập Bàn Ăn"
        mainTitle="Cập Nhập Bàn Ăn"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form
                  className="theme-form"
                  onSubmit={handleSubmit(AddProject)}
                >
                  <ProjectTitleClass
                    register={register}
                    errors={errors}
                    name={tableEdit?.ten_ban}
                  />
                  {/* <ClientNameClass register={register} errors={errors} /> */}
                  <ProjectRateClass
                    register={register}
                    errors={errors}
                    numChair={tableEdit?.so_ghe}
                    statusTable={tableEdit?.trang_thai}
                  />
                  {/* <IssueClass register={register} /> */}
                  {/* <EnterSomeDetailsClass register={register} errors={errors} /> */}
                  {/* <UploadProjectFileClass register={register} errors={errors} /> */}
                  <Row>
                    <Col>
                      <div className="text-end">
                        <Btn attrBtn={{ color: "success", className: "me-3" }}>
                          Thêm
                        </Btn>
                        <Link
                          to={`${process.env.PUBLIC_URL}/app/project/project-list`}
                        >
                          <Btn attrBtn={{ color: "danger" }}>Hủy</Btn>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default EditCategory;
