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
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const EditMyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onEditSubmit = (data) => {
    console.log(data);
  };

  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [description, setDescription] = useState(null);

  const onUserEdit = async (e) => {
    if (email == null || firstName == null || lastName == null || address == null || city == null || postalCode == null || country == null) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
    } else {

      // await axios.post('http://localhost:8000/v1/user/addUser', {
      //   data: {
      //     userId: uuidv4(),
      //     email: email,
      //     password: password,
      //     userType: userType,
      //     firstName: firstName,
      //     lastName: lastName,
      //     address: address,
      //     city: city,
      //     postalCode: postalCode,
      //     country: country,
      //     description: description,
      //   }
      // })

      const localStorageId = localStorage.getItem("userId");
      const currentUserId = localStorageId.substring(1, localStorageId.length - 1);

      console.log('http://localhost:8000/v1/user/editUserById/' + currentUserId);

      await axios.put('http://localhost:8000/v1/user/editUserById/' + currentUserId, {
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
          description: description,
      }).then((res) => {
        toast.success("Chỉnh sửa tài khoản thành công!");
      }).catch((err) => {
        toast.error("Có lỗi: " + err);
      })
    }
  }
  return (
    <Fragment>
      <Form className="card" onSubmit={null}>
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
            <Col sm="6" md="12">
              <FormGroup>
                {" "}
                <Label className="form-label">Địa Chỉ Email Cá Nhân</Label>
                <Input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  {...register("EmailAddress", { required: true })}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setAddress(e.target.value)}
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
                  onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setPostalCode(e.target.value)}
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
                  onChange={(e) => setCountry(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-end">
          <Btn attrBtn={{ color: "primary"}} onClick={(e) => onUserEdit(e)} >
            Cập nhập thông tin cá nhân
          </Btn>
        </CardFooter>
      </Form>
    </Fragment>
  );
};
export default EditMyProfile;
