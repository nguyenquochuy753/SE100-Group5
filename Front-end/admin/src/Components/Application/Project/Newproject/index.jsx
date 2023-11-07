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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMeal } from "../../../../actions/meal.actions";

const Newproject = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const dispatch = useDispatch();
  const project = useContext(ProjectContext);
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProject = (data) => {
    console.log("Test");
    if (data !== "") {
      // project.addNewProject(data);

      console.log(data);
      // console.log("file", file);
      const form = new FormData();
      form.append("ten_mon_an", data.title);
      form.append("gia", data.rate);
      form.append("trang_thai", data.status);
      form.append("ma_danh_muc", data.category);
      form.append("hinh_anh_mon_an", file);

      dispatch(addMeal(form));
      history(
        `${process.env.PUBLIC_URL}/app/ecommerce/meal/meal-list/${layoutURL}`
      );
    } else {
      errors.showMessages();
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Món Ăn"
        title="Thêm Món Ăn"
        mainTitle="Thêm Món Ăn"
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
                  <UploadProjectFileClass
                    register={register}
                    errors={errors}
                    setFile={setFile}
                  />
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

export default Newproject;
