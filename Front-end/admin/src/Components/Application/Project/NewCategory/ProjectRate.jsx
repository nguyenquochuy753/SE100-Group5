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
  const { ref, ...status } = register("status");

  return (
    <Fragment>
      <Row>
        <Col sm="4">
          <FormGroup>
            <Label>Số Ghế</Label>
            <input
              className="form-control"
              type="number"
              name="soGhe"
              //   defaultValue="0"
              placeholder="Nhập số ghế của bàn ăn"
              {...register("soGhe", { required: true })}
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
            <Label for="exampleSelect">Trạng Thái</Label>
            <Input
              type="select"
              name="status"
              placeholder="Trạng Thái"
              className="form-control digits"
              id="exampleSelect"
              required
              innerRef={ref}
              {...status}
              // {...register("status", { required: true })}
            >
              <option value="Trống">Trống</option>
              <option value="Đã Đặt">Đã Đặt</option>
              <option value="Đang ăn">Đang ăn</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectRateClass;
