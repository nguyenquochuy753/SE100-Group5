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
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, CardBody, Form } from "reactstrap";
import CustomizerContext from "../../../../_helper/Customizer";
import { useDispatch } from "react-redux";
import { addTable } from "../../../../actions/table.actions";
import { addCategory } from "../../../../actions/category.actions";
import { addIngredientType } from "../../../../actions/ingredientType.actions";

const NewIngredientType = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const project = useContext(ProjectContext);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProject = (data) => {
    if (data !== "") {
      console.log(data);
      // project.addNewProject(data);
      // dispatch(
      //   addTable({
      //     ten_ban: data.title,
      //     so_ghe: data.soGhe,
      //     trang_thai: data.status,
      //   })
      // );
      dispatch(addIngredientType({ ten_loai_nguyen_lieu: data.title }));
      history(
        `${process.env.PUBLIC_URL}/app/ecommerce/ingredient/ingredient-type-list/${layoutURL}`
      );
    } else {
      errors.showMessages();
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Quản Lý Món Ăn"
        title="Thêm Loại Nguyên Liệu"
        mainTitle="Thêm Loại Nguyên Liệu"
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
                  {/* <ProjectRateClass register={register} errors={errors} /> */}
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

export default NewIngredientType;
