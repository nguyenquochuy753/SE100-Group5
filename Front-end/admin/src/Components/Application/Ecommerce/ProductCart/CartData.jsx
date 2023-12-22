import React, { Fragment, useContext } from "react";
import { CartTitle, CartTableHeader } from "../../../../Constant";
import { getCartTotal } from "../../../../Services/Ecommerce.service";
import { Btn, H6, Image } from "../../../../AbstractElements";
import { CardBody, Table, Row, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { XCircle } from "react-feather";
import ProductContext from "../../../../_helper/Ecommerce/Product";
import CartContext from "../../../../_helper/Ecommerce/Cart";
import EmptyCart from "./EmptyCart";
import HeaderCard from "../../../Common/Component/HeaderCard";
import CustomizerContext from "../../../../_helper/Customizer";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../../../urlConfig";
import { addMealToCart, clearCart } from "../../../../actions/cart.actions";
import { toast } from "react-toastify";
import { addMealToTable } from "../../../../actions/table.actions";

const CartData = () => {
  const { layoutURL } = useContext(CustomizerContext);
  const history = useNavigate();

  const dispatch = useDispatch();
  const id = window.location.pathname.split("/").pop();
  const layout = id;
  const { symbol } = useContext(ProductContext);
  // const { addToCart, cart, decrementQty, removeFromCart } = useContext(CartContext);
  const { addToCart, decrementQty, removeFromCart } = useContext(CartContext);
  const cart = useSelector((state) => state.cart.carts);
  const table = useSelector((state) => state.table.tableBook);

  const incrementQty = (product, quantity) => {
    addToCart(product, quantity);
  };
  const decrementQuantity = (id) => {
    decrementQty(id);
  };
  const removefromcart = (item) => {
    removeFromCart(item.id);
  };
  var images = require.context("../../../../assets/images", true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };
  const totalAmount = cart.reduce((total, c) => total + c.p.gia * c.qty, 0);
  const plusMealHandler = (id) => {
    const newCart = [];
    for (const c of cart) {
      if (c.p._id == id) {
        c.qty += 1;
        newCart.push(c);
      } else {
        newCart.push(c);
      }
    }
    dispatch(addMealToCart(newCart));
  };
  const minusMealHandler = (id) => {
    const newCart = [];
    for (const c of cart) {
      if (c.p._id == id) {
        c.qty -= 1;
        if (c.qty > 0) {
          newCart.push(c);
        }
      } else {
        newCart.push(c);
      }
    }
    dispatch(addMealToCart(newCart));
  };
  const removeMealHandler = (id) => {
    const newCart = cart.filter((c) => c.p._id != id);
    dispatch(addMealToCart(newCart));
  };
  const orderHandler = () => {
    if (!table.id) {
      toast.error("Vui lòng chọn bàn trước khi đặt món");
      return;
    }

    dispatch(
      addMealToTable({
        id: table.id,
        trang_thai: "Đang ăn",
        mon_an: cart.map((c) => ({
          ma_mon_an: c.p._id,
          sl: c.qty,
        })),
      })
    );
    dispatch(clearCart());

    toast.success(`${table.name} đặt món thành công`);
    history(`${process.env.PUBLIC_URL}/app/project/book/${layout}`);
  };
  return (
    <Fragment>
      {cart && cart.length > 0 ? (
        <div>
          <HeaderCard title={`Giỏ Hàng ${table && table.name}`} />
          <CardBody className="cart">
            <Row>
              <div className="order-history table-responsive wishlist">
                <Table className="table-bordered">
                  <thead>
                    <tr>
                      {CartTableHeader.map((items, i) => (
                        <th key={i}>{items}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Image
                              attrImage={{
                                className: "img-fluid img-60",
                                src: `${generatePublicUrl(
                                  item.p.hinh_anh_mon_an
                                )}`,
                                alt: "#",
                              }}
                            />
                          </td>
                          <td>
                            <div className="product-name">
                              <a href="#javascript">{item.p.ten_mon_an}</a>
                            </div>
                          </td>
                          <td>
                            {item.p.gia.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td className="qty-box">
                            <div className="input-group bootstrap-touchspin">
                              <span className="input-group-prepend">
                                <Btn
                                  attrBtn={{
                                    color: "primary",
                                    className:
                                      "bootstrap-touchspin-down btn-square",
                                    // onClick: () =>
                                    //   decrementQuantity(item.p._id),
                                  }}
                                  onClick={() => minusMealHandler(item.p._id)}
                                >
                                  <i className="fa fa-minus"></i>
                                </Btn>
                              </span>
                              <Input
                                type="text"
                                name="quantity"
                                value={item.qty}
                                readOnly={true}
                                style={{ textAlign: "center" }}
                                className="form-control input-number"
                              />
                              <span className="input-group-append">
                                <Btn
                                  attrBtn={{
                                    color: "primary",
                                    className:
                                      "bootstrap-touchspin-up btn-square",
                                    // onClick: () => plusMealHandler(item.p._id),
                                  }}
                                  onClick={() => plusMealHandler(item.p._id)}
                                >
                                  {" "}
                                  <i className="fa fa-plus"></i>
                                </Btn>{" "}
                              </span>
                            </div>
                          </td>
                          <td>
                            <a
                              href="#javascript"
                              onClick={() => removeMealHandler(item.p._id)}
                            >
                              <XCircle />
                            </a>
                          </td>
                          <td>
                            {/* {symbol} */}
                            {(item.p.gia * item.qty).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan="4">
                        <div className="input-group">
                          <Input
                            className="form-control me-2"
                            type="text"
                            placeholder="Nhập mã giảm giá"
                          />
                          <a className="btn btn-primary" href="#javascript">
                            Xác Nhận
                          </a>
                        </div>
                      </td>
                      <td className="total-amount">
                        <H6 attrH6={{ className: "m-0 text-end" }}>
                          <span className="f-w-600">Tổng Cộng :</span>
                        </H6>
                      </td>
                      <td>
                        <span>
                          {totalAmount.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-end" colSpan="5">
                        <Link
                          to={`${process.env.PUBLIC_URL}/app/ecommerce/product/${layoutURL}`}
                          className="btn btn-secondary cart-btn-transform"
                        >
                          tiếp tục mua sắm
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-success cart-btn-transform"
                          onClick={orderHandler}
                        >
                          thanh toán
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Row>
          </CardBody>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Fragment>
  );
};
export default CartData;
