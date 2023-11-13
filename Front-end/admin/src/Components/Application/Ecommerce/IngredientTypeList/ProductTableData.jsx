import {
  productData,
  tableColumns,
  categoryColumns,
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
  const ingredientTypes = useSelector(
    (state) => state.ingredientType.ingredientTypes
  );
  const [modal, setModal] = useState(false);
  const [idRemove, setIdRemove] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  const openModel = (id) => {
    setModal(true);
    setIdRemove(id);
  };
  const [tables, setTables] = useState([]);

  useEffect(() => {
    dispatch(getIngredientTypes());
  }, [dispatch]);

  const ingredientTypeTranfer = ingredientTypes?.map((m) => ({
    Details: (
      <div>
        <H6>{m._id}</H6>
        <span></span>
      </div>
    ),
    amount: m.ten_loai_nguyen_lieu,
    stock: <div className="font-success">{}</div>,
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
                `${process.env.PUBLIC_URL}/app/project/table/edit-table/${m._id}/${layoutURL}`
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
      <CommonModal
        isOpen={modal}
        title={"Xoá Bàn"}
        toggler={toggle}
        idRemove={idRemove}
      >
        <P>
          {
            "Bàn của bạn chọn sẽ được xóa. Bạn có chắc muốn thực hiện hành động ?"
          }
        </P>
      </CommonModal>
      <div className="table-responsive product-table">
        <DataTable
          noHeader
          pagination
          paginationServer
          columns={categoryColumns}
          data={ingredientTypeTranfer}
          highlightOnHover={true}
          striped={true}
          responsive={true}
        />
      </div>
    </Fragment>
  );
};
export default ProductTableData;
