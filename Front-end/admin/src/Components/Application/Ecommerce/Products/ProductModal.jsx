import React, { Fragment, useContext, useEffect, useState } from "react";
import { Btn, H4, H6, Image, LI, P, UL } from "../../../../AbstractElements";
import {
  ProductDetails,
  Quantity,
  AddToCart,
  ViewDetails,
  ProductSizeArray,
} from "../../../../Constant";
import CartContext from "../../../../_helper/Ecommerce/Cart";
import ProductContext from "../../../../_helper/Ecommerce/Product";
import { Modal, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomizerContext from "../../../../_helper/Customizer";
import { useDispatch, useSelector } from "react-redux";
import { getMealById } from "../../../../actions/meal.actions";
import { generatePublicUrl } from "../../../../urlConfig";

const ProductModal = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(props.value);
  // eslint-disable-next-line
  const [stock, setStock] = useState("");
  const { addToCart } = useContext(CartContext);
  const { layoutURL } = useContext(CustomizerContext);
  const { productItem, symbol } = useContext(ProductContext);
  const meal = useSelector((state) => state.meal.meal);
  const [quantity, setQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState(null);
  useEffect(() => {
    // productItem.forEach((product, i) => {
    //   if (product.id === props.dataid) {
    //     setSingleProduct(product);
    //   }
    // });
    dispatch(getMealById(props.dataid));
    setSingleProduct(meal[0]);
  }, [meal, props.dataid]);
  console.log(singleProduct);
  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const plusQty = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };
  const minusQty = () => {
    if (quantity > 1) {
      setStock("InStock");
      setQuantity(quantity - 1);
    }
  };
  const onCloseModal = () => {
    setOpen(false);
    props.setOpenModal(false);
  };
  const history = useNavigate();
  const AddToCarts = (item, quantity) => {
    addToCart(item, quantity);
    history(`${process.env.PUBLIC_URL}/app/ecommerce/cart/${layoutURL}`);
  };

  return (
    <Fragment>
      <Modal
        className="modal-dialog modal-lg modal-dialog-centered product-modal"
        isOpen={open}
      >
        <div className="modal-body">
          <div className="modal-header">
            <div className="modal-title">
              <div className="product-box row">
                <Col lg="6">
                  <Image
                    attrImage={{
                      className: "img-fluid",
                      src: `${generatePublicUrl(
                        singleProduct?.hinh_anh_mon_an
                      )}`,
                      alt: "",
                    }}
                  />
                </Col>
                <Col lg="6" className="product-details text-start">
                  <H4>{singleProduct?.ten_mon_an}</H4>
                  <div className="product-price">
                    {/* {symbol} */}
                    {singleProduct?.gia.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                    {/* <del>
                      {symbol}
                      {singleProduct.discountPrice}
                    </del> */}
                  </div>
                  <div className="product-view">
                    <H6 attrH6={{ className: "f-w-600" }}>Danh Mục</H6>
                    <P attrPara={{ className: "mb-0" }}>
                      {singleProduct?.ma_danh_muc.name}
                    </P>
                  </div>
                  <div className="product-view">
                    <H6 attrH6={{ className: "f-w-600" }}>Chi Tiết Món Ăn</H6>
                    <P attrPara={{ className: "mb-0" }}>
                      {singleProduct?.discription}
                    </P>
                  </div>
                  <div className="product-size">
                    <UL
                      attrUL={{
                        className: "simple-list d-flex gap-1 flex-row",
                      }}
                    >
                      {ProductSizeArray.map((items, i) => (
                        <LI attrLI={{ className: "border-0" }} key={i}>
                          <Btn
                            attrBtn={{
                              color: "outline-light ",
                              type: "button",
                              databsoriginaltitle: "",
                              title: "",
                            }}
                          >
                            {items}
                          </Btn>
                        </LI>
                      ))}
                    </UL>
                  </div>
                  <div className="product-qnty">
                    <H6 attrH6={{ className: "f-w-600" }}>Số Lượng</H6>
                    <fieldset>
                      <InputGroup>
                        <Btn
                          attrBtn={{
                            color: "primary",
                            className: "btn-square bootstrap-touchspin-down",
                            onClick: minusQty,
                          }}
                        >
                          <i className="fa fa-minus"></i>
                        </Btn>
                        <InputGroupText
                          className="bootstrap-touchspin-prefix"
                          style={{ display: "none" }}
                        ></InputGroupText>
                        <Input
                          className="touchspin text-center py-0"
                          type="text"
                          name="quantity"
                          value={quantity}
                          onChange={(e) => changeQty(e)}
                        />
                        <Btn
                          attrBtn={{
                            color: "primary",
                            className: "btn-square bootstrap-touchspin-up",
                            onClick: plusQty,
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </Btn>
                      </InputGroup>
                    </fieldset>
                    <div className="addcart-btn">
                      <Link
                        to={`${process.env.PUBLIC_URL}/app/ecommerce/cart/${layoutURL}`}
                        className="btn btn-primary me-3"
                        onClick={() => AddToCarts(singleProduct, quantity)}
                      >
                        Thêm Vào Giỏ Hàng
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/app/ecommerce/product-page/${layoutURL}/${singleProduct?._id}`}
                        className="btn btn-primary"
                      >
                        Xem Chi Tiết
                      </Link>
                    </div>
                  </div>
                </Col>
              </div>
            </div>
            <Btn
              attrBtn={{
                color: "transprant",
                className: "btn-close",
                onClick: onCloseModal,
                type: "button",
                databsdismiss: "modal",
                arialabel: "Close",
              }}
              onClick={onCloseModal}
            ></Btn>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
export default ProductModal;
