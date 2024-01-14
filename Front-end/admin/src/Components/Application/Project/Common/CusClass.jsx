import React from "react";
import { Col, Row, Progress } from "reactstrap";
import { H6, Image, LI, P, UL } from "../../../../AbstractElements";
import { Issues, Resolved, Comment, Done } from "../../../../Constant";
import { generatePublicUrl } from "../../../../urlConfig";

const CusClass = ({ item, bookTable }) => {
  console.log(item.mon_an);
  const calcProgressHandler = () => {
    let count = 0;
    for (const meal of item.mon_an) {
      if (meal.trang_thai === "Hoàn thành") {
        count++;
      }
    }
    return (count / item.mon_an.length) * 100;
  };
  return (
    <Col
      className="col-xxl-4"
      md="6"
      onClick={() => bookTable(item._id, item.ten_ban, item.trang_thai)}
    >
      <div className="project-box">
        <span
          className={`badge ${
            item?.trang_thai === "Trống" ? "badge-success" : "badge-primary"
          }`}
        >
          {item?.trang_thai}
        </span>
        <H6>{item?.ten_ban}</H6>
        <div className="media">
          {/* <Image
            attrImage={{
              className: "img-20 me-1 rounded-circle",
              src: `${require(`../../../../assets/images/${item?.img}`)}`,
              alt: "",
            }}
          /> */}
          <div className="media-body">
            <P>Số Ghế: {item?.so_ghe}</P>
          </div>
        </div>
        <P>Danh sách các món ăn đã đặt</P>
        <Row className="details">
          {item.mon_an &&
            item.mon_an.map((m) => (
              <>
                <Col xs="6">
                  <span>{m.ma_mon_an.ten_mon_an}</span>
                </Col>
                <Col
                  xs="6"
                  className={
                    item?.badge === "Done" ? "font-success" : "font-primary"
                  }
                >
                  {m.sl}
                </Col>
              </>
            ))}
          {/* <Col xs="6">
            {" "}
            <span>{Resolved}</span>
          </Col>
          <Col
            xs="6"
            className={item?.badge === "Done" ? "font-success" : "font-primary"}
          >
            {item?.resolved}
          </Col>
          <Col xs="6">
            {" "}
            <span>{Comment}</span>
          </Col>
          <Col
            xs="6"
            className={item?.badge === "Done" ? "font-success" : "font-primary"}
          >
            {item?.comment}
          </Col> */}
        </Row>
        <div className="customers">
          <UL attrUL={{ className: "d-inline-block" }}>
            {item.mon_an &&
              item.mon_an.map((m) => (
                <>
                  <LI attrLI={{ className: "d-inline-block border-0" }}>
                    <Image
                      attrImage={{
                        className: "img-30 rounded-circle",
                        src: `${generatePublicUrl(
                          m.ma_mon_an.hinh_anh_mon_an
                        )}`,
                        alt: "",
                      }}
                    />
                  </LI>
                </>
              ))}

            {/* <LI attrLI={{ className: "d-inline-block border-0" }}>
              <Image
                attrImage={{
                  className: "img-30 rounded-circle",
                  src: `${require(`../../../../assets/images/${item?.customers_img2}`)}`,
                  alt: "",
                }}
              />
            </LI>
            <LI attrLI={{ className: "d-inline-block border-0" }}>
              <Image
                attrImage={{
                  className: "img-30 rounded-circle",
                  src: `${require(`../../../../assets/images/${item?.customers_img3}`)}`,
                  alt: "",
                }}
              />
            </LI> */}
            {/* <LI attrLI={{ className: "d-inline-block ms-2 border-0" }}>
              <P attrPara={{ className: "f-12" }}>{`+${item?.like} More`}</P>
            </LI> */}
          </UL>
        </div>
        <div className="project-status mt-4">
          <div className="media mb-0">
            <P>
              {item.mon_an && item.mon_an.length > 0
                ? calcProgressHandler().toFixed(0)
                : 0}
              %{" "}
            </P>
            <div className="media-body text-end">
              <span>{Done}</span>
            </div>
          </div>
          {item.mon_an &&
          item.mon_an.length > 0 &&
          calcProgressHandler() == 100 ? (
            <Progress
              className="sm-progress-bar"
              color="success"
              value={
                item.mon_an && item.mon_an.length > 0
                  ? calcProgressHandler()
                  : 0
              }
              style={{ height: "5px" }}
            />
          ) : (
            <Progress
              className="sm-progress-bar"
              striped
              color="primary"
              value={
                item.mon_an && item.mon_an.length > 0
                  ? calcProgressHandler()
                  : 0
              }
              style={{ height: "5px" }}
            />
          )}
        </div>
      </div>
    </Col>
  );
};

export default CusClass;
