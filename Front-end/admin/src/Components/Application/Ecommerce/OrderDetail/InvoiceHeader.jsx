import React, { Fragment } from "react";
import { H3, H4, P, Image } from "../../../../AbstractElements";
import { InvoiceHash, IssuedJan, PaymentDue } from "../../../../Constant";
import { Col, Media, Row } from "reactstrap";
// import logo1 from "../../../../assets/images/other-images/logo-login.png";
import logo from "../../../../assets/images/logo/logo.png";
const InvoiceHeader = ({ order }) => {
  function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  }
  return (
    <Fragment>
      <Row className="invo-header">
        <Col sm="6">
          <Media>
            <div className="media-left">
              <Image
                attrImage={{
                  className: "media-object img-60",
                  src: logo,
                  alt: "",
                  style: {
                    with: "100px",
                    height: "90px",
                  },
                }}
              />
            </div>
            <Media body className="m-l-20 text-right">
              <H4 attrH4={{ className: "media-heading f-w-600" }}>
                Restaurant
              </H4>
              <P>
                hello@123.in
                <br />
                <span className="digits">{"289-335-6503"}</span>
              </P>
            </Media>
          </Media>
        </Col>
        <Col sm="6">
          <div className="text-md-end text-xs-center">
            <H3>
              {InvoiceHash}
              <span className="digits counter">{order?._id}</span>
            </H3>
            <P>
              {/* {IssuedJan}
              <span className="digits">27, 2022</span> */}
              <br />
              Ngày Thanh Toán:{" "}
              <span className="digits"> {formatDate(order?.createdAt)}</span>
            </P>
          </div>
        </Col>
      </Row>
      <hr />
    </Fragment>
  );
};
export default InvoiceHeader;
