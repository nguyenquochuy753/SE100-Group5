import React, { Fragment, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { H5, H4, H6, P, Image, Btn } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import {
  MyProfile,
  Bio,
  Password,
  Website,
  Save,
  EmailAddress,
} from "../../../../Constant";
import CustomizerContext from "../../../../_helper/Customizer";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



const MyProfileEdit = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [userType, setUserType] = useState('waiter');
  const [description, setDescription] = useState(null);

  const { layoutURL } = useContext(CustomizerContext);

  // function onUserCreate = async (e) => {
  const onUserCreate = async (e) => {
    if (email == null || password == null || confirmPassword == null || userType == null) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
    } else {
      if (password != confirmPassword) {
        toast.error("Mật khẩu không khớp!");
      } else {
        const existedUser = await axios.get('http://localhost:8000/v1/user/getUserByEmail/' + email);

        if (existedUser.data[0] != null) {
          toast.error('Tài khoản đã tồn tại!');
          return;
        }

        await axios.post('http://localhost:8000/v1/user/addUser', {
          data: {
            userId: uuidv4(),
            email: email,
            password: password,
            userType: userType,
            description: description,
          }
        }).then((res) => {
          toast.success("Thêm tài khoản thành công!");
        }).catch((err) => {
          toast.error("Có lỗi: " + err);
        });
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <H4 attrH4={{ className: "card-title mb-0" }}>Thông Tin Tài Khoản</H4>
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
          <Form>
            <Row className="mb-2">
              <div className="profile-title">
                <div className="media">
                  <Image
                    attrImage={{
                      className: "img-70 m-0 rounded-circle",
                      alt: "",
                      src: `${require("../../../../assets/images/user/7.jpg")}`,
                    }}
                  />
                  <div className="media-body">
                    <Link
                      to={`${process.env.PUBLIC_URL}/app/users/userProfile/${layoutURL}`}
                    >
                      <H5 attrH5={{ className: "mb-1" }}>VŨ QUỐC HÙNG</H5>
                    </Link>
                    <P>ĐẦU BẾP</P>
                  </div>
                </div>
              </div>
            </Row>
            <FormGroup className="mb-3">
              <H6 attrH6={{ className: "form-label" }}>Tiểu Sử</H6>
              <Input
                type="textarea"
                className="form-control"
                rows="5"
                placeholder="Nhập tiểu sử của bạn ở đây."
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="form-label">Địa Chỉ Email</Label>
              <Input
                className="form-control"
                placeholder="your-email@domain.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="form-label">Mật Khẩu</Label>
              <Input
                className="form-control"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="form-label">Xác Nhận Mật Khẩu</Label>
              <Input
                className="form-control"
                type="password"
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            {/* <FormGroup className="mb-3">
              <Label className="form-label">{Website}</Label>
              <Input className="form-control" placeholder="http://Uplor .com" />
            </FormGroup> */}
            <FormGroup className="mb-3">
              <Label className="form-label">Loại Tài Khoản</Label>
              <Input
                type="select"
                name="select"
                className="form-control btn-square"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="waiter">Nhân Viên</option>
                <option value="chef">Đầu Bếp</option>
              </Input>
            </FormGroup>
            
          </Form>
        </CardBody>
        <CardFooter className="text-end">
          <Btn attrBtn={{ color: "primary", type: "submit"}} onClick={(e) => onUserCreate(e) }>
            Lưu
          </Btn>
        </CardFooter>
      </Card>
    </Fragment>
  );
};
export default MyProfileEdit;
