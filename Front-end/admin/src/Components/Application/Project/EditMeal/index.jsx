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
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import CustomizerContext from "../../../../_helper/Customizer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMeal,
  getMealById,
  updateMeal,
} from "../../../../actions/meal.actions";
import { getCategories } from "../../../../actions/category.actions";

const EditMeal = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const dispatch = useDispatch();
  const project = useContext(ProjectContext);
  const meal = useSelector((state) => state.meal.meal[0]);
  const categories = useSelector((state) => state.category.categories);
  const [loading, setLoading] = useState(false);
  const [mealStatus, setMealStatus] = useState(meal?.trang_thai);
  const [mealEdit, setMealEdit] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref, ...status } = register("status");
  const { ref: refCategory, ...category } = register("category");

  useEffect(() => {
    // setLoading(true);
    dispatch(getMealById(id));
    dispatch(getCategories());
    // setMealStatus(meal?.trang_thai);
    // setLoading(false);
    setMealEdit(meal);
    setCategoryList(categories);
  }, [dispatch, meal]);

  // console.log(mealEdit);

  const AddProject = (data) => {
    if (data !== "") {
      // project.addNewProject(data);

      console.log(data);
      dispatch(
        updateMeal({
          id: id,
          ten_mon_an: data.title != "" ? data.title : meal.ten_mon_an,
          gia: data.rate != "" ? data.rate : meal.gia,
          trang_thai:
            data.status != meal.trang_thai ? data.status : meal.trang_thai,
          hinh_anh_mon_an: meal.hinh_anh_mon_an,
          ma_danh_muc:
            data.category != meal.ma_danh_muc
              ? data.category
              : meal.ma_danh_muc,
        })
      );
      // console.log("file", file);
      // const form = new FormData();
      // form.append("ten_mon_an", data.title);
      // form.append("gia", data.rate);
      // form.append("trang_thai", data.status);
      // form.append("hinh_anh_mon_an", file);

      // dispatch(addMeal(form));

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
                  <ProjectTitleClass
                    register={register}
                    errors={errors}
                    name={mealEdit?.ten_mon_an}
                  />

                  {/* <ClientNameClass register={register} errors={errors} /> */}
                  {/* <ProjectRateClass
                    register={register}
                    errors={errors}
                    gia={meal?.gia}
                    trang_thai={mealStatus}
                  /> */}
                  <Row>
                    <Col sm="4">
                      <FormGroup>
                        <Label>Giá</Label>
                        <input
                          className="form-control"
                          type="number"
                          name="rate"
                          defaultValue={mealEdit?.gia}
                          placeholder="Nhập giá của món ăn"
                          {...register("rate", {
                            required: mealEdit?.gia != "" ? false : true,
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="4">
                      <FormGroup>
                        <Label>Danh Mục</Label>
                        {mealEdit && (
                          <Input
                            type="select"
                            name="badge"
                            placeholder="Trạng Thái"
                            className="form-control digits"
                            required
                            innerRef={refCategory}
                            // defaultValue={mealEdit?.trang_thai}
                            {...category}
                          >
                            {mealEdit?.ma_danh_muc && (
                              <option value={mealEdit.ma_danh_muc._id}>
                                {mealEdit.ma_danh_muc.name}
                              </option>
                            )}
                            {categoryList?.map((c) => {
                              if (c._id != mealEdit?.ma_danh_muc?._id) {
                                return (
                                  <option value={c._id} key={c._id}>
                                    {c.name}
                                  </option>
                                );
                              }
                            })}

                            {/* <option value="Hết">Hết</option> */}
                          </Input>
                        )}
                      </FormGroup>
                    </Col>
                    <Col sm="4">
                      <FormGroup>
                        <Label>Trạng Thái</Label>
                        {mealEdit && mealEdit.trang_thai && (
                          <Input
                            type="select"
                            name="badge"
                            placeholder="Trạng Thái"
                            className="form-control digits"
                            required
                            innerRef={ref}
                            defaultValue={mealEdit?.trang_thai}
                            {...status}
                          >
                            <option value={mealEdit?.trang_thai}>
                              {mealEdit?.trang_thai}
                            </option>
                            <option
                              value={`${
                                mealEdit?.trang_thai == "Hết" ? "Còn" : "Hết"
                              }`}
                            >{`${
                              mealEdit?.trang_thai == "Hết" ? "Còn" : "Hết"
                            }`}</option>
                            {/* <option value="Hết">Hết</option> */}
                          </Input>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <IssueClass register={register} /> */}
                  {/* <EnterSomeDetailsClass register={register} errors={errors} /> */}
                  {/* <UploadProjectFileClass
                    register={register}
                    errors={errors}
                    setFile={setFile}
                  /> */}
                  <Row>
                    <Col>
                      <div className="text-end">
                        <Btn attrBtn={{ color: "success", className: "me-3" }}>
                          Sửa
                        </Btn>
                        <Link
                          to={`${process.env.PUBLIC_URL}/app/ecommerce/meal/meal-list/${layoutURL}`}
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

export default EditMeal;
