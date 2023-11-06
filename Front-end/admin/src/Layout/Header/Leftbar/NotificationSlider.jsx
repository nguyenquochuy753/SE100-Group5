import React from "react";
import { Link } from "react-router-dom";
import { H6, Image } from "../../../AbstractElements";
import fireImage from "../../../assets/images/giftools.gif";
import Slider from "react-slick";
import { notificationSliderOption } from "./NotificationSliderOption";

const NotificationSlider = () => {
  return (
    <div className="notification-slider overflow-hidden ">
      <Slider className="m-0" {...notificationSliderOption}>
        <div className="d-flex h-100">
          <Image attrImage={{ src: fireImage, alt: "gif" }} />
          <H6 attrH6={{ className: "mb-0 f-w-400" }}>
            <span className="font-primary">Đừng bỏ lỡ! </span>
            <span className="f-light">
              Ra bản cập nhật mới đã được phát hành.
            </span>
          </H6>
          <i className="icon-arrow-top-right f-light" />
        </div>
        <div className="d-flex h-100">
          <Image attrImage={{ src: fireImage, alt: "gif" }} />
          <H6 attrH6={{ className: "mb-0 f-w-400" }}>
            <span className="f-light">
              Một cái gì đó bạn yêu thích hiện đang được bán!{" "}
            </span>
          </H6>
          <Link
            className="ms-1"
            to="https://1.envato.market/3GVzd"
            target="_blank"
          >
            Mua ngay !
          </Link>
        </div>
      </Slider>
    </div>
  );
};

export default NotificationSlider;
