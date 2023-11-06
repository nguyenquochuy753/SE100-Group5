import {
  productColumns,
  productData,
  tableProductColumns,
} from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../../../../actions/meal.actions";
import { Btn, H6, Image, P, Spinner } from "../../../../AbstractElements";
import { generatePublicUrl } from "../../../../urlConfig";
import CommonModal from "../../../UiKits/Modals/common/modalTable";
import CustomizerContext from "../../../../_helper/Customizer";
import { useNavigate } from "react-router";
import { addMealToTable } from "../../../../actions/table.actions";
import { Col } from "reactstrap";
const style = {
  width: 40,
  height: 40,
};
const style2 = { width: 90, fontSize: 14, padding: 4 };
function formatDate(value) {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
}

const ProductTableData = ({ table, idTable }) => {
  const { layoutURL } = useContext(CustomizerContext);
  console.log(table);

  const dispatch = useDispatch();
  const history = useNavigate();

  // const meal = useSelector((state) => state.meal);
  const meal = table?.map((t) => ({
    ...t.ma_mon_an,
    qty: t.sl,
    isDone: t.da_hoan_thanh,
  }));
  console.log(meal);
  const [modal, setModal] = useState(false);
  const [idRemove, setIdRemove] = useState();
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const openModel = (id) => {
    setModal(true);
    setIdRemove(id);
  };
  const doneMealHandler = (mealId) => {
    // console.log("MealId", mealId);
    // console.log("tableId", idTable);
    // console.log(table);
    setLoading(true);
    const tranfromTable = table.map((t) => ({
      ma_mon_an: t.ma_mon_an._id,
      sl: t.sl,
      da_hoan_thanh: t.ma_mon_an._id == mealId ? true : t.da_hoan_thanh,
    }));
    dispatch(
      addMealToTable({
        id: idTable,
        mon_an: tranfromTable,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const checkOutMealHandler = () => {
    history(
      `${process.env.PUBLIC_URL}/app/ecommerce/checkout/${idTable}/${layoutURL}`
    );
  };
  const mealTranfer = meal?.map((m) => ({
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
    stock: m.isDone ? (
      <div className="font-success">Hoàn Thành</div>
    ) : (
      <div className="font-danger">Chưa Hoàn Thành</div>
    ),
    start_date: m.qty,
    action: (
      <div>
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "success",
              className: "btn btn-xs",
              type: "button",
              disabled: m.isDone,
            }}
            onClick={() => doneMealHandler(m._id)}
          >
            Hoàn Thành
          </Btn>
        </span>
      </div>
    ),
  }));
  // useEffect(() => {
  //   const mealTranfer = meal.meals.map((m) => ({
  //     image: (
  //       <Image
  //         attrImage={{
  //           src: generatePublicUrl(m.hinh_anh_mon_an),
  //           style: style,
  //           alt: "",
  //         }}
  //       />
  //     ),
  //     Details: (
  //       <div>
  //         <H6>{m.ten_mon_an}</H6>
  //         <span></span>
  //       </div>
  //     ),
  //     amount: m.gia,
  //     stock: <div className="font-success">{m.trang_thai}</div>,
  //     start_date: formatDate(m.createdAt),
  //     action: (
  //       <div>
  //         <span>
  //           <Btn
  //             attrBtn={{
  //               style: style2,
  //               color: "danger",
  //               className: "btn btn-xs",
  //               type: "button",
  //             }}
  //             onClick={() => openModel(m._id)}
  //           >
  //             Xoá
  //           </Btn>
  //         </span>{" "}
  //         &nbsp;&nbsp;
  //         <span>
  //           <Btn
  //             attrBtn={{
  //               style: style2,
  //               color: "success",
  //               className: "btn btn-xs",
  //               type: "button",
  //             }}
  //             onClick={() => {
  //               history(
  //                 `${process.env.PUBLIC_URL}/app/project/meal/edit-meal/${m._id}/${layoutURL}`
  //               );
  //             }}
  //           >
  //             Sửa{" "}
  //           </Btn>
  //         </span>
  //       </div>
  //     ),
  //   }));
  //   setMeals(mealTranfer);
  // }, []);
  console.log(loading);
  return (
    <Fragment>
      {/* <CommonModal
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
      </CommonModal> */}

      {loading ? (
        <div className="loader-box">
          <Spinner attrSpinner={{ className: "loader-3" }} />
        </div>
      ) : (
        <div className="table-responsive product-table">
          <DataTable
            noHeader
            pagination
            // paginationServer
            columns={tableProductColumns}
            data={mealTranfer}
            highlightOnHover={true}
            striped={true}
            responsive={true}
          />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Btn
          attrBtn={{
            style: style2,
            color: "info",
            className: "btn btn-xs",
            type: "button",
          }}
          onClick={checkOutMealHandler}
        >
          Thanh Toán
        </Btn>
      </div>
    </Fragment>
  );
};
export default ProductTableData;
