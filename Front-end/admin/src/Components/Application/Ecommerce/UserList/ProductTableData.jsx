import {
  productData,
  tableColumns,
  ingredintColumns,
  employeeColumns,
} from "../../../../Data/Ecommerce/ProductList";
import React, { Fragment } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { deleteTableById, getTable } from "../../../../actions/table.actions";
import { Btn, H6, Image, P } from "../../../../AbstractElements";
import { generatePublicUrl } from "../../../../urlConfig";
import { useState } from "react";
import CommonModal from "../../../UiKits/Modals/common/modal";
import { useNavigate } from "react-router";
import { useContext } from "react";
import CustomizerContext from "../../../../_helper/Customizer";
import { getCategories } from "../../../../actions/category.actions";
import { getIngredientTypes } from "../../../../actions/ingredientType.actions";
import {
  deleteIngredientById,
  getIngredients,
  getUsers,
} from "../../../../actions/ingredient.actions";
import ModalCustom from "../../../UiKits/Modals/common/modalCustom";
import axios from "axios";

const style = {
  width: 40,
  height: 40,
};

const style2 = { width: 60, fontSize: 14, padding: 4 };
function formatDate(value) {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
}
const ProductTableData = () => {
  const { layoutURL } = useContext(CustomizerContext);

  const dispatch = useDispatch();
  const history = useNavigate();
  const table = useSelector((state) => state.table);
  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const [modal, setModal] = useState(false);
  const [idRemove, setIdRemove] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  const openModel = (id) => {
    setModal(true);
    setIdRemove(id);
  };

  const deleteHandler = async (id) => {
    console.log(id);
    await axios.delete("http://localhost:8000/v1/user/deleteUserById/" + id);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, ingredients]);

  // const userData = await axios.get("http://localhost:8000/v1/user/getAllUsers").data;
  // console.log(userData);

  const ingredientTranfer = ingredients?.map((m) => ({
    Details: (
      <div>
        <H6>{m.firstName}</H6>
        <span></span>
      </div>
    ),
    amount: m.email,
    stock: <div className="font-success">{}</div>,
    type: m.address ? m.address : "Chưa có địa chỉ",
    start_date: m.userType,
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
            onClick={() => openModel(m.userId)}
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
                `${process.env.PUBLIC_URL}/app/project/ingredient/edit-ingredient/${m._id}/${layoutURL}`
              );
            }}
          >
            Sửa{" "}
          </Btn>
        </span>
      </div>
    ),
  }));

  // useEffect(() => {
  //   dispatch(getTable());
  //   const tableTranfer = table.tables.map((t) => ({
  //     Details: (
  //       <div>
  //         <H6>{t.ten_ban}</H6>
  //         <span></span>
  //       </div>
  //     ),
  //     amount: t.so_ghe,
  //     stock: <div className="font-success">{t.trang_thai}</div>,
  //     start_date: formatDate(t.createdAt),
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
  //             onClick={() => openModel(t._id)}
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
  //                 `${process.env.PUBLIC_URL}/app/project/table/edit-table/${t._id}/${layoutURL}`
  //               );
  //             }}
  //           >
  //             Sửa{" "}
  //           </Btn>
  //         </span>
  //       </div>
  //     ),
  //   }));
  //   setTables(tableTranfer);
  // }, [dispatch, table]);
  return (
    <Fragment>
      <ModalCustom
        isOpen={modal}
        title={"Xoá Nguyên Liệu"}
        toggler={toggle}
        idRemove={idRemove}
        onConfirm={deleteHandler}
      >
        <P>
          {
            "Nguyên liệu của bạn chọn sẽ được xóa. Bạn có chắc muốn thực hiện hành động ?"
          }
        </P>
      </ModalCustom>
      <div className="table-responsive product-table">
        <DataTable
          noHeader
          pagination
          // paginationServer
          columns={employeeColumns}
          data={ingredientTranfer}
          highlightOnHover={true}
          striped={true}
          responsive={true}
        />
      </div>
    </Fragment>
  );
};
export default ProductTableData;
