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
import { getIngredientTypes } from "../../../../actions/ingredientType.actions";
import { useEffect } from "react";

const ProjectRateClass = ({ register }) => {
  const { ref, ...ingredientType } = register("ingredientType");
  const ingredientTypes = useSelector(
    (state) => state.ingredientType.ingredientTypes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientTypes());
  }, [dispatch]);
  return (
    <Fragment>
      <Row>
        {/* <Col sm="4">
          <FormGroup>
            <Label>{ProgressLevel}</Label>
            <Input
              type="select"
              name="progress_level"
              className="form-control digits"
              required
            >
              <option value="25">{"25"}</option>
              <option value="50">{"50"}</option>
              <option value="70">{"70"}</option>
              <option value="100">{"100"}</option>
            </Input>
          </FormGroup>
        </Col> */}
        <Col sm="4">
          <FormGroup>
            <Label>Khối Lượng Tồn</Label>
            <input
              className="form-control"
              type="number"
              name="rate"
              //   defaultValue="0"
              placeholder="Nhập khối lượng tồn của nguyên liệu"
              {...register("rate", { required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm="4">
          <FormGroup>
            <Label>Loại Nguyên Liệu</Label>
            {ingredientTypes && ingredientTypes.length > 0 && (
              <Input
                type="select"
                name="progress_level"
                className="form-control digits"
                required
                innerRef={ref}
                {...ingredientType}
              >
                {ingredientTypes?.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.ten_loai_nguyen_lieu}
                  </option>
                ))}
                {/* <option value="Còn">Còn</option>
                <option value="Hết">Hết</option> */}
              </Input>
            )}
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectRateClass;
