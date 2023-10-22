import {
  productColumns,
  productData,
} from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../../../../actions/meal.actions";
import { Btn, H6, Image, P } from "../../../../AbstractElements";
import { generatePublicUrl } from "../../../../urlConfig";
import CommonModal from "../../../UiKits/Modals/common/modalMeal";
import CustomizerContext from "../../../../_helper/Customizer";
import { useNavigate } from "react-router";
const style = {
  width: 40,
  height: 40,
};
const style2 = { width: 60, fontSize: 14, padding: 4 };
function formatDate(value) {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
}

const ProductTableData = () => {
  const { layoutURL } = useContext(CustomizerContext);

  const dispatch = useDispatch();
  const history = useNavigate();

  const meal = useSelector((state) => state.meal);
  const [meals, setMeals] = useState([]);
  const [modal, setModal] = useState(false);
  const [idRemove, setIdRemove] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  const openModel = (id) => {
    setModal(true);
    setIdRemove(id);
  };
  useEffect(() => {
    dispatch(getMeal());
    const mealTranfer = meal.meals.map((m) => ({
      image: (
        <Image
          attrImage={{
            src: generatePublicUrl(m.hinh_anh_mon_an),
            style: style,
            alt: "",
          }}
        />
      ),
      Details: (
        <div>
          <H6>{m.ten_mon_an}</H6>
          <span></span>
        </div>
      ),
      amount: m.gia,
      stock: <div className="font-success">{m.trang_thai}</div>,
      start_date: formatDate(m.createdAt),
      action: (
        <div>
          <span>
            <Btn
              attrBtn={{
                style: style2,
                color: "danger",
                className: "btn btn-xs",
                type: "button",
              }}
              onClick={() => openModel(m._id)}
            >
              Xoá
            </Btn>
          </span>{" "}
          &nbsp;&nbsp;
          <span>
            <Btn
              attrBtn={{
                style: style2,
                color: "success",
                className: "btn btn-xs",
                type: "button",
              }}
              onClick={() => {
                history(
                  `${process.env.PUBLIC_URL}/app/project/meal/edit-meal/${m._id}/${layoutURL}`
                );
              }}
            >
              Sửa{" "}
            </Btn>
          </span>
        </div>
      ),
    }));
    setMeals(mealTranfer);
  }, [dispatch, meal]);

  return (
    <Fragment>
      <CommonModal
        isOpen={modal}
        title={"Xoá Món Ăn"}
        toggler={toggle}
        idRemove={idRemove}
      >
        <P>
          {
            "Món ăn của bạn chọn sẽ được xóa. Bạn có chắc muốn thực hiện hành động ?"
          }
        </P>
      </CommonModal>
      <div className="table-responsive product-table">
        <DataTable
          noHeader
          pagination
          // paginationServer
          columns={productColumns}
          data={meals}
          highlightOnHover={true}
          striped={true}
          responsive={true}
        />
      </div>
    </Fragment>
  );
};
export default ProductTableData;
