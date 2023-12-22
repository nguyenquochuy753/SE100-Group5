import React, { useState } from "react";
import { InputGroup } from "reactstrap";

import { Minus, Plus, X } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import cartItem1 from "../../../assets/images/other-images/cart-img.jpg";
import { Cart, CheckOut, GOTOYOURCART, OrderTotal } from "../../../Constant";
import SvgIcon from "../../../Components/Common/Component/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../../urlConfig";
import { addMealToCart, clearCart } from "../../../actions/cart.actions";
import { toast } from "react-toastify";
import { addMealToTable } from "../../../actions/table.actions";

const CartHeader = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const id = window.location.pathname.split("/").pop();
  const layout = id;
  const [cartDropdown, setCartDropDown] = useState(false);
  const RedirectToCart = () => {
    history(`${process.env.PUBLIC_URL}/app/ecommerce/cart/${layout}`);
  };
  const cart = useSelector((state) => state.cart.carts);
  const table = useSelector((state) => state.table.tableBook);
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
    <li className="cart-nav onhover-dropdown">
      <div className="cart-box" onClick={() => setCartDropDown(!cartDropdown)}>
        <SvgIcon iconId="stroke-ecommerce" />
        <span className="badge rounded-pill badge-success">{cart.length}</span>
      </div>
      <div
        className={`cart-dropdown onhover-show-div ${
          cartDropdown ? "active" : ""
        }`}
      >
        <h6 className="mb-0 f-20 dropdown-title">
          Giỏ Hàng {table && `(${table.name})`}
        </h6>
        <ul>
          {cart.map((c) => (
            <li className="mt-0" key={c.p._id}>
              <div
                className="media"
                // onClick={RedirectToCart}
              >
                <img
                  className="img-fluid b-r-5 me-3 img-60"
                  src={generatePublicUrl(c.p.hinh_anh_mon_an)}
                  alt=""
                />
                <div className="media-body">
                  <span>{c.p.ten_mon_an}</span>
                  <div className="qty-box">
                    <InputGroup>
                      <span className="input-group-prepend">
                        <button
                          className="btn quantity-left-minus"
                          type="button"
                          data-type="minus"
                          data-field=""
                          onClick={() => minusMealHandler(c.p._id)}
                        >
                          <Minus />
                        </button>
                      </span>

                      <input
                        className="form-control input-number"
                        type="number"
                        name="quantity"
                        value={c.qty}
                      />
                      <span className="input-group-prepend">
                        <button
                          className="btn quantity-right-plus"
                          type="button"
                          data-type="plus"
                          data-field=""
                          onClick={() => plusMealHandler(c.p._id)}
                        >
                          <Plus />
                        </button>
                      </span>
                    </InputGroup>
                  </div>
                  <h6 className="font-primary">
                    {c.p.gia.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h6>
                </div>
                <div
                  className="close-circle"
                  onClick={() => removeMealHandler(c.p._id)}
                >
                  <a className="btn-danger" href="#javascript">
                    <X />
                  </a>
                </div>
              </div>
            </li>
          ))}
          {/* <li className="mt-0">
            <div className="media" onClick={RedirectToCart}>
              <img
                className="img-fluid b-r-5 me-3 img-60"
                src={cartItem1}
                alt=""
              />
              <div className="media-body">
                <span>{"Furniture Chair for Home"}</span>
                <div className="qty-box">
                  <InputGroup>
                    <span className="input-group-prepend">
                      <button
                        className="btn quantity-left-minus"
                        type="button"
                        data-type="minus"
                        data-field=""
                      >
                        <Minus />
                      </button>
                    </span>
                    <input
                      className="form-control input-number"
                      type="text"
                      name="quantity"
                      defaultValue="1"
                    />
                    <span className="input-group-prepend">
                      <button
                        className="btn quantity-right-plus"
                        type="button"
                        data-type="plus"
                        data-field=""
                      >
                        <Plus />
                      </button>
                    </span>
                  </InputGroup>
                </div>
                <h6 className="font-primary">{"$500.00"}</h6>
              </div>
              <div className="close-circle">
                <a className="btn-danger" href="#javascript">
                  <X />
                </a>
              </div>
            </div>
          </li> */}
          <li className="total">
            <h6 className="mb-0">
              Tổng Cộng :{" "}
              <span className="f-right f-14">
                {totalAmount.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </h6>
          </li>
          <li className="text-center">
            <Link
              to={`${process.env.PUBLIC_URL}/app/ecommerce/cart/${layout}`}
              className="d-block mb-3 view-cart f-w-700"
            >
              ĐẾN GIỎ HÀNG CỦA BẠN
            </Link>
            {/* <Link
              to={`${process.env.PUBLIC_URL}/app/ecommerce/checkout/${layout}`}
              className="btn btn-primary view-checkout"
            >
              THANH TOÁN
            </Link> */}
            <button
              className="btn btn-primary view-checkout"
              onClick={orderHandler}
            >
              ĐẶT MÓN
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default CartHeader;
