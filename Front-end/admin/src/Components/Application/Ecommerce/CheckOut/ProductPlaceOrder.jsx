import React, { Fragment, useContext } from "react";
import { H4, LI, UL, Image } from "../../../../AbstractElements";
import { getCartTotal } from "../../../../Services/Ecommerce.service";
import CartContext from "../../../../_helper/Ecommerce/Cart";
import paypal from "../../../../assets/images/checkout/paypal.png";
import { Col, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../../AbstractElements";
import { useNavigate } from "react-router";
import CustomizerContext from "../../../../_helper/Customizer";
import { addMealToTable } from "../../../../actions/table.actions";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../../actions/order.actions";
import { useState } from "react";
import { useEffect } from "react";

const ProductPlaceOrder = ({ table, idTable, nameTable }) => {
  const { cart } = useContext(CartContext);
  const { layoutURL } = useContext(CustomizerContext);
  const dispatch = useDispatch();
  const history = useNavigate();
  const meal = table?.map((t) => ({
    ...t.ma_mon_an,
    qty: t.sl,
    isDone: t.da_hoan_thanh,
  }));
  const mealTotal = meal?.reduce((pre, curr) => pre + curr.qty * curr.gia, 0);
  const checkOutHandler = () => {
    const mon_an = meal.map((m) => ({ ma_mon_an: m._id, sl: m.qty }));
    const ma_ban = idTable;
    const ten_kh = "Vãng Lai";
    const sdt_kh = "123456789";

    dispatch(
      addOrder({
        ma_ban,
        ten_kh,
        sdt_kh,
        mon_an,
      })
    );

    dispatch(
      addMealToTable({
        id: idTable,
        trang_thai: "Trống",
        mon_an: [],
      })
    );
    history(`${process.env.PUBLIC_URL}/app/ecommerce/invoice/${layoutURL}`);
  };

  return (
    <Fragment>
      <Col xl="6" sm="12">
        <div className="checkout-details">
          <div className="order-box">
            <div className="title-box">
              <div className="checkbox-title">
                <H4>{nameTable} </H4>
                <span>Tổng Cộng</span>
              </div>
            </div>
            {meal &&
              meal.map((item) => {
                return (
                  <UL
                    attrUL={{
                      className: "simple-list border-x-0 border-t-0 qty",
                    }}
                    key={item._id}
                  >
                    <LI attrLI={{ className: "border-0" }}>
                      {item.ten_mon_an} x {item.qty}
                      <span>
                        {item?.gia.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </LI>
                  </UL>
                );
              })}
            <UL attrUL={{ className: "simple-list border-0  sub-total" }}>
              {/* <LI attrLI={{ className: "border-0 bg-transparent" }}>
                Subtotal <span className="count">$ {getCartTotal(cart)}</span>
              </LI> */}
              {/* <LI attrLI={{ className: 'shipping-class border-0  bg-transparent' }}>
                Shipping
                <div className='shopping-checkout-option'>
                  <Label className='d-block' htmlFor='chk-ani'>
                    <Input className='checkbox_animated' id='chk-ani' type='checkbox' />
                    Option 1
                  </Label>
                  <Label className='d-block' htmlFor='chk-ani1'>
                    <Input className='checkbox_animated' id='chk-ani1' type='checkbox' />
                    Option 2
                  </Label>
                </div>
              </LI> */}
            </UL>
            <UL attrUL={{ className: "simple-list sub-total total" }}>
              <LI attrLI={{ className: "border-0 bg-transparent " }}>
                Tổng Cộng{" "}
                <span className="count">
                  {mealTotal?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </LI>
            </UL>

            <div className="animate-chk">
              <Row>
                <Col>
                  <Label className="d-block" htmlFor="edo-ani">
                    <Input
                      className="radio_animated"
                      id="edo-ani"
                      type="radio"
                      name="rdo-ani"
                      data-original-title=""
                      title=""
                    />
                    Thẻ Tín Dụng
                  </Label>
                  <Label className="d-block" htmlFor="edo-ani1">
                    <Input
                      className="radio_animated"
                      id="edo-ani1"
                      type="radio"
                      name="rdo-ani"
                      data-original-title=""
                      title=""
                    />
                    Tiền Mặt
                  </Label>
                  <Label
                    className="d-flex align-items-center"
                    htmlFor="edo-ani2"
                  >
                    <Input
                      className="radio_animated"
                      id="edo-ani2"
                      type="radio"
                      name="rdo-ani"
                      data-original-title=""
                      title=""
                    />
                    PayPal
                    <Image
                      attrImage={{
                        className: "img-paypal",
                        src: `${paypal}`,
                        alt: "",
                      }}
                    />
                  </Label>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <div className="text-end">
              <Btn
                attrBtn={{ type: "submit", color: "primary" }}
                onClick={checkOutHandler}
              >
                Thanh Toán
              </Btn>{" "}
            </div>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};
export default ProductPlaceOrder;
