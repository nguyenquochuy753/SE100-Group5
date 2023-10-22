import React, { Fragment, useContext } from "react";
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
import { useDispatch } from "react-redux";
import { addTable } from "../../../../actions/table.actions";

const EditTable = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const project = useContext(ProjectContext);
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProject = (data) => {
    if (data !== "") {
      // project.addNewProject(data);
      dispatch(
        addTable({
          ten_ban: data.title,
          so_ghe: data.soGhe,
          trang_thai: data.status,
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
                  <ProjectTitleClass register={register} errors={errors} />
                  {/* <ClientNameClass register={register} errors={errors} /> */}
                  <ProjectRateClass register={register} errors={errors} />
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

export default EditTable;
