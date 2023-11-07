import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4 } from "../AbstractElements";
import {
  EmailAddress,
  // ForgotPassword,
  Password,
  // RememberPassword,
  SignIn,
} from "../Constant";

import { useNavigate } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";

// import CustomizerContext from "../_helper/Customizer";
import OtherWay from "./OtherWay";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = ({ selected }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  // const { layoutURL } = useContext(CustomizerContext);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));

  useEffect(() => {
    localStorage.setItem("profileURL", man);
    localStorage.setItem("Name", "Emay Walter");
  }, [value, name]);

  const loginAuth = async (e) => {
    e.preventDefault();
    setValue(man);
    setName("Emay Walter");
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("authenticated", JSON.stringify(true));
        history(`${process.env.PUBLIC_URL}`);
        toast.success("Successfully logged in!");
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
        toast.error("You entered wrong username or password!");
      });
    // if (email === "test@gmail.com" && password === "test123") {
    // localStorage.setItem("login", JSON.stringify(true));
    // localStorage.setItem("authenticated", JSON.stringify(true));
    // // history(`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`);
    // history(`${process.env.PUBLIC_URL}`);
    // toast.success("Successfully logged in!..");
    // } else {
    //   toast.error("You enter wrong password or username!..");
    // }
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <H4>{selected === "simpleLogin" ? "" : "Sign in"}</H4>
                  {/* <P>{"Enter your email & password to login"}</P> */}
                  <br />
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      // value={email}
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input
                        className="form-control"
                        type={togglePassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        // value={password}
                        placeholder="Enter your password"
                      />
                      <div
                        className="show-hide"
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    <br />
                    {/* <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a> */}
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "d-block w-100 mt-2",
                        onClick: (e) => loginAuth(e),
                      }}
                      onClick={(e) => loginAuth(e)}
                    >
                      {SignIn}
                    </Btn>
                  </div>
                  <OtherWay />
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
