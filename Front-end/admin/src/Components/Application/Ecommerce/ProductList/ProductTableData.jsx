import {
  productColumns,
  productData,
} from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../../../../actions/meal.actions";
import { Btn, H6, Image } from "../../../../AbstractElements";
import { generatePublicUrl } from "../../../../urlConfig";
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
  const dispatch = useDispatch();
  const meal = useSelector((state) => state.meal);
  const [meals, setMeals] = useState([]);
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
      amount: m.gia.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      }),
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
      <div className="table-responsive product-table">
        <DataTable
          noHeader
          pagination
          paginationServer
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
