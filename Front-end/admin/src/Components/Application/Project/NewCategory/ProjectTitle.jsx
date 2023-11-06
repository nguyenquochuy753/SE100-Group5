import React, { Fragment } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { ProjectTitle } from "../../../../Constant";

const ProjectTitleClass = ({ register, errors }) => {
  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup>
            <Label>Tên</Label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Tên danh mục *"
              {...register("title", { required: true })}
            />
            <span style={{ color: "red" }}>
              {errors.title && "Title is required"}
            </span>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectTitleClass;
