import React, { Fragment } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import {
  Doing,
  Done,
  ProgressLevel,
  ProjectRate,
  ProjectStatus,
} from "../../../../Constant";

const ProjectRateClass = ({ register }) => {
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
            <Label>Trạng Thái</Label>
            <Input
              type="select"
              name="badge"
              placeholder="Trạng Thái"
              className="form-control digits"
              required
            >
              <option value="stock">Còn</option>
              <option value="empty">Hết</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectRateClass;
