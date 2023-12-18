import React, { Fragment } from "react";
import { Btn, H4 } from "../../../../AbstractElements";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  EditProfile,
  Company,
  Username,
  UsersCountryMenu,
  AboutMe,
  UpdateProfile,
  FirstName,
  LastName,
  Address,
  EmailAddress,
  PostalCode,
  Country,
  City,
  UsersCountry,
} from "../../../../Constant";

const EditMyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onEditSubmit = (data) => {
    alert(data);
  };
  return (
    <Fragment>
      <Form className="card" onSubmit={handleSubmit(onEditSubmit)}>
        <CardHeader>
          <H4 attrH4={{ className: "card-title mb-0" }}>Thông Tin Cá Nhân</H4>
          <div className="card-options">
            <a className="card-options-collapse" href="#javascript">
              <i className="fe fe-chevron-up"></i>
            </a>
            <a className="card-options-remove" href="#javascript">
              <i className="fe fe-x"></i>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            {/* <Col md="5">
              <FormGroup className="mb-3">
                {" "}
                <Label className="form-label">{Company}</Label>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Company"
                  {...register("company", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.company && "Company is required"}{" "}
                </span>
              </FormGroup>
            </Col> */}
            {/* <Col sm="6" md="3">
              <FormGroup>
                {" "}
                <Label className="form-label">{Username}</Label>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  {...register("Username", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.Username && "Username is required"}{" "}
                </span>
              </FormGroup>
            </Col> */}
            <Col sm="6" md="12">
              <FormGroup>
                {" "}
                <Label className="form-label">Địa Chỉ Email Cá Nhân</Label>
                <Input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  {...register("EmailAddress", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.EmailAddress && "EmailAddress is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label className="form-label">Tên</Label>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Nhập tên của nhân viên"
                  {...register("FirstName", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.FirstName && "FirstName is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label className="form-label">Họ</Label>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Nhập họ của nhân viên"
                  {...register("LastName", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.LastName && "LastName is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label className="form-label">Địa Chỉ</Label>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Nhập địa chỉ thường trú của nhân viên"
                  {...register("Address", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.Address && "Address is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                {" "}
                <Label className="form-label">Thành phố</Label>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Nhập thành phố nhân viên đang ở"
                  {...register("City", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.City && "City is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="3">
              <FormGroup>
                <Label className="form-label">Mã Bưu Chính</Label>
                <Input
                  className="form-control"
                  type="number"
                  placeholder="Nhập mã bưu chính của nhân viên"
                />
              </FormGroup>
            </Col>
            <Col md="5">
              <FormGroup>
                <Label className="form-label">Quốc Gia</Label>
                <Input
                  type="select"
                  name="select"
                  className="form-control btn-square"
                >
                  {UsersCountry.map((items, i) => (
                    <option key={i}>{items}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="12">
              <div>
                {" "}
                <Label className="form-label">Giới Thiệu</Label>
                <Input
                  type="textarea"
                  className="form-control"
                  rows="5"
                  placeholder="Nhập thông tin mô tả nhân viên"
                />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-end">
          <Btn attrBtn={{ color: "primary", type: "submit" }}>
            Cập nhập thông tin cá nhân
          </Btn>
        </CardFooter>
      </Form>
    </Fragment>
  );
};
export default EditMyProfile;
