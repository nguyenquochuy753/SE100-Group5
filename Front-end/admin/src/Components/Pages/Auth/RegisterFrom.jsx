import React, { Fragment, useState } from 'react';
import { Facebook, Linkedin, Twitter } from 'react-feather';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Btn, H4, P, H6 } from '../../../AbstractElements';
import { Link } from 'react-router-dom';
// import logoWhite from '../../../assets/images/logo/logo.png';
// import logoDark from '../../../assets/images/logo/logo_dark.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const RegisterFrom = ({ logoClassMain }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();


  const signInAuth = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("authenticated", JSON.stringify(true));
        history(`${process.env.PUBLIC_URL}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error('The email you\'ve just entered has already been registered!');
      })
  }

  return (
    <Fragment>
      <div className='login-card'>
        <div>
          {/* <div>
            <Link className={`logo ${logoClassMain ? logoClassMain : ''}`} to={process.env.PUBLIC_URL}>
              <Image attrImage={{ className: 'img-fluid for-light', src: logoWhite, alt: 'looginpage' }} />
              <Image attrImage={{ className: 'img-fluid for-dark', src: logoDark, alt: 'looginpage' }} />
            </Link>
          </div> */}
          <div className='login-main'>
            <Form className='theme-form login-form'>
              <H4>Create your account</H4>
              <P>Enter your personal details to create account</P>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Your Name</Label>
                <Row className='g-2'>
                  <Col xs='6'>
                    <Input className='form-control' type='text' required='' placeholder='Fist Name' />
                  </Col>
                  <Col xs='6'>
                    <Input className='form-control' type='email' required='' placeholder='Last Name' />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Email Address</Label>
                <Input className='form-control' type='email' required='' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
              </FormGroup>
              <FormGroup className='position-relative'>
                <Label className='col-form-label m-0 pt-0'>Password</Label>
                <div className='position-relative'>
                  <Input className='form-control' type={togglePassword ? 'text' : 'password'} name='login[password]' onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                  <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                    <span className={togglePassword ? '' : 'show'}></span>
                  </div>
                </div>
              </FormGroup>
              <FormGroup className='m-0'>
                <div className='checkbox'>
                  <Input id='checkbox1' type='checkbox' />
                  <Label className='text-muted' for='checkbox1'>
                    Agree with <span>Privacy Policy</span>
                  </Label>
                </div>
              </FormGroup>
              <FormGroup>
                <Btn 
                  attrBtn={{ className: 'd-block w-100', color: 'primary', type: 'submit' }} 
                  onClick={(e) => signInAuth(e)}
                >
                    Create Account
                </Btn>
              </FormGroup>
              <div className='login-social-title'>
                <H6 attrH6={{ className: 'text-muted or mt-4' }}>Or Sign up with</H6>
              </div>
              <div className='social my-4 '>
                <div className='btn-showcase'>
                  <a className='btn btn-light' href='https://www.linkedin.com/login' rel='noreferrer' target='_blank'>
                    <Linkedin className='txt-linkedin' /> LinkedIn
                  </a>
                  <a className='btn btn-light' href='https://twitter.com/login?lang=en' rel='noreferrer' target='_blank'>
                    <Twitter className='txt-twitter' />
                    twitter
                  </a>
                  <a className='btn btn-light' href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
                    <Facebook className='txt-fb' />
                    facebook
                  </a>
                </div>
              </div>
              <P attrPara={{ className: 'mb-0 text-start' }}>
                Already have an account?
                <Link className='ms-2' to={`${process.env.PUBLIC_URL}/login`}>
                  Sign in
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default RegisterFrom;
