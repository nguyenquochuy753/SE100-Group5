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
import {
  getIngredientById,
  updateIngredient,
} from "../../../../actions/ingredient.actions";
import { getIngredientTypes } from "../../../../actions/ingredientType.actions";

const EditIngredient = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const dispatch = useDispatch();
  const project = useContext(ProjectContext);
  const meal = useSelector((state) => state.meal.meal[0]);
  const ingredient = useSelector((state) => state.ingredient.ingredient);
  const ingredientTypes = useSelector(
    (state) => state.ingredientType.ingredientTypes
  );

  const categories = useSelector((state) => state.category.categories);
  const [loading, setLoading] = useState(false);
  const [mealStatus, setMealStatus] = useState(meal?.trang_thai);
  const [mealEdit, setMealEdit] = useState();
  const [ingredientEdit, setIngredientEdit] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [ingredientTypeList, setIngredientTypeList] = useState([]);

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
    // dispatch(getMealById(id));
    dispatch(getIngredientById(id));
    dispatch(getIngredientTypes());
    // setMealStatus(meal?.trang_thai);
    // setLoading(false);
    // setMealEdit(meal);
    // setCategoryList(categories);
    setIngredientTypeList(ingredientTypes);
    setIngredientEdit(ingredient);
  }, [dispatch, ingredient]);

  // console.log(mealEdit);

  const AddProject = (data) => {
    if (data !== "") {
      // project.addNewProject(data);

      console.log(data);
      dispatch(
        updateIngredient({
          id: id,
          ten_nguyen_lieu:
            data.title != "" ? data.title : ingredientEdit.ten_nguyen_lieu,
          khoi_luong_ton:
            data.rate != "" ? data.rate : ingredientEdit.khoi_luong_ton,
          ma_loai_nguyen_lieu:
            data.category != ingredientEdit.ma_loai_nguyen_lieu
              ? data.category
              : ingredientEdit.ma_loai_nguyen_lieu,
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
        `${process.env.PUBLIC_URL}/app/ecommerce/ingredient/ingredient-list/${layoutURL}`
      );
    } else {
      errors.showMessages();
    }
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Nguyên Liệu"
        title="Cập Nhập Nguyên Liệu"
        mainTitle="Cập Nhập Nguyên Liệu"
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
                    name={ingredientEdit?.ten_nguyen_lieu}
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
                        <Label>Khối Lượng Tồn</Label>
                        <input
                          className="form-control"
                          type="number"
                          name="rate"
                          defaultValue={ingredientEdit?.khoi_luong_ton}
                          placeholder="Nhập khối lượng tồn của nguyên liệu"
                          {...register("rate", {
                            required:
                              ingredientEdit?.khoi_luong_ton != ""
                                ? false
                                : true,
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="4">
                      <FormGroup>
                        <Label>Loại Nguyên Liệu</Label>
                        {ingredientEdit &&
                          ingredientEdit.ma_loai_nguyen_lieu && (
                            <Input
                              type="select"
                              name="badge"
                              placeholder="Trạng Thái"
                              className="form-control digits"
                              required
                              innerRef={refCategory}
                              defaultValue={
                                ingredientEdit?.ma_loai_nguyen_lieu?._id
                              }
                              {...category}
                            >
                              {ingredientEdit?.ma_loai_nguyen_lieu && (
                                <option
                                  value={ingredientEdit.ma_loai_nguyen_lieu._id}
                                >
                                  {
                                    ingredientEdit.ma_loai_nguyen_lieu
                                      .ten_loai_nguyen_lieu
                                  }
                                </option>
                              )}
                              {ingredientTypes?.map((c) => {
                                if (
                                  c._id !=
                                  ingredientEdit?.ma_loai_nguyen_lieu?._id
                                ) {
                                  return (
                                    <option value={c._id} key={c._id}>
                                      {c.ten_loai_nguyen_lieu}
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
                      {/* <FormGroup>
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
                          </Input>
                        )}
                      </FormGroup> */}
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

export default EditIngredient;
