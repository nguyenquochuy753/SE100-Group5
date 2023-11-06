import React, { Fragment } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import {
  Doing,
  Done,
  ProgressLevel,
  ProjectRate,
  ProjectStatus,
} from "../../../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../../actions/category.actions";

const ProjectRateClass = ({ register }) => {
  const { ref, ...status } = register("status");
  const { ref: refCategory, ...category } = register("category");

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Fragment>
      <Row>
        <Col sm="4">
          <FormGroup>
            <Label>Giá</Label>
            <input
              className="form-control"
              type="number"
              name="rate"
              //   defaultValue="0"
              placeholder="Nhập giá của món ăn"
              {...register("rate", { required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>Danh Mục</Label>
            {categories && categories.length > 0 && (
              <Input
                type="select"
                name="progress_level"
                className="form-control digits"
                required
                innerRef={refCategory}
                {...category}
              >
                {categories?.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
                {/* <option value="Còn">Còn</option>
                <option value="Hết">Hết</option> */}
              </Input>
            )}
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>Trạng Thái</Label>
            <Input
              type="select"
              name="badge"
              placeholder="Trạng Thái"
              className="form-control digits"
              required
              innerRef={ref}
              {...status}
            >
              <option value="Còn">Còn</option>
              <option value="Hết">Hết</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectRateClass;
