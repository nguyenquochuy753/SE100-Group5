import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { MoreVertical, Info } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "../../../../AbstractElements";
import { OrderHistoryDataTable } from "../../../../Data/Ecommerce/Orderhistory";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../actions/order.actions";
import { useContext } from "react";
import CustomizerContext from "../../../../_helper/Customizer";

const OrderHistoryTable = () => {
  function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  }
  const order = useSelector((state) => state.order.orders);
  const { layoutURL } = useContext(CustomizerContext);
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  console.log(order);
  const updatedData = {
    ...OrderHistoryDataTable,
    productRow: order?.map((item) => {
      return {
        product: "6534f91c783455389ab655ab",
        productName: (
          <div className="product-name">
            <Link to="#javascript"> {item?.ten_kh}</Link>
            <div className="order-process">
              <span
                className={`order-process-circle ${"shipped-order"}`}
              ></span>
              {item?.sdt_kh}
            </div>
          </div>
        ),
        size: item?.ma_ban.ten_ban,
        color: "Nhân Viên",
        articleNumber: formatDate(item?.createdAt),
        units: item?.mon_an.length,
        price: item?.mon_an
          .reduce((pre, curr) => pre + curr.ma_mon_an?.gia * curr.sl, 0)
          .toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
        action: (
          <Info
            onClick={() => {
              history(
                `${process.env.PUBLIC_URL}/app/ecommerce/orderdetail/${item._id}/${layoutURL}`
              );
            }}
          />
        ),
      };
    }),
    productColumns: [
      ...OrderHistoryDataTable.productColumns,
      {
        name: <i className="fa fa-angle-down" />,
        selector: (row) => row.action,
        sortable: false,
        center: true,
        minWidth: "50px",
        maxWidth: "60px",
      },
    ],
  };
  return (
    <div className="table-responsive table-bordernone orderHistoryTable product-table">
      <DataTable
        pagination
        paginationServer
        columns={updatedData.productColumns}
        data={updatedData.productRow}
        highlightOnHover={true}
        striped={true}
        responsive={true}
      />
    </div>
  );
};

export default OrderHistoryTable;
