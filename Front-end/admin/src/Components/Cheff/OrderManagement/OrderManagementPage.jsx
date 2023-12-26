import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderManagementPage.css";
import Header from "../Common/Header/Header";
import CustomModal from "../Common/Modal/Modal";

const OrderManagementPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedTableID, setSelectedTableID] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/v1/table/getTableNotAvailable")
      .then((res) => {
        setTables(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  }, []);

  const handleSelectTable = (tableID, tableName) => {
    axios
      .get(`http://localhost:8000/v1/table/getTable/${tableID}`)
      .then((res) => {
        setMenuItems(res.data && res.data.length > 0 ? res.data[0].mon_an : []);
      })
      .catch((error) => {
        console.error("Error fetching table details:", error);
      });
    setSelectedTable(tableName);
    setSelectedTableID(tableID);
  };

  const getStatusHandler = (status) =>
    ({
      "Chờ chế biến": {
        className: "waiting-label",
        text: "Chờ chế biến",
        bgColor: "#ffe066",
      },
      "Chế biến xong": {
        className: "done-label",
        text: "Chế biến xong",
        bgColor: "#82e0aa",
      },
    }[status]);

  const handleItemClick = (itemId) => {
    setShowModal(true);
    setSelectedItem(itemId);
  };

  const updateItemStatus = (itemId, newStatus) => {
    const updatedMenuItems = menuItems.map((item) => {
      if (item.ma_mon_an._id === itemId) {
        return { ...item, trang_thai: newStatus };
      }
      return item;
    });

    setMenuItems(updatedMenuItems);

    const allItemsDone = updatedMenuItems.every(
      (item) => item.trang_thai === "Chế biến xong"
    );

    if (allItemsDone) {
      const updatedTables = tables.filter(
        (table) => table._id !== selectedTableID
      );
      setTables(updatedTables);
      setSelectedTable(null);
      setSelectedTableID(null);
    }
  };

  return (
    <div>
      <Header />
      <div className="container_cheff">
        <h3>Danh sách bàn</h3>
        <div className="table-buttons">
          <div className="scrollable">
            {tables
              .filter((table) =>
                table.mon_an.some((item) => item.trang_thai === "Chờ chế biến")
              )
              .map((table) => (
                <button
                  key={table._id}
                  className={selectedTable === table.ten_ban ? "selected" : ""}
                  onClick={() => handleSelectTable(table._id, table.ten_ban)}
                >
                  {table.ten_ban}
                </button>
              ))}
          </div>
        </div>
        {selectedTable && (
          <div>
            <h3>Menu của {selectedTable}</h3>
            <div className="menu-items-scroll">
              <div className="menu-items">
                {menuItems.length > 0 ? (
                  menuItems.map((item, index) => {
                    const statusHandler = getStatusHandler(item.trang_thai);
                    return (
                      <div
                        className="menu-item"
                        key={index}
                        onClick={() => handleItemClick(item.ma_mon_an._id)}
                      >
                        <img
                          src={`http://localhost:8000/${item.ma_mon_an?.hinh_anh_mon_an}`}
                          alt={item.ma_mon_an?.ten_mon_an}
                        />
                        <div className="item-info">
                          <h2>{item.ma_mon_an?.ten_mon_an}</h2>
                          <p>Số lượng: {item.sl}</p>
                          {statusHandler && (
                            <span
                              className={statusHandler.className}
                              style={{ backgroundColor: statusHandler.bgColor }}
                            >
                              {statusHandler.text}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <CustomModal
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
            itemId={selectedItem}
            tableId={selectedTableID}
            updateItemStatus={updateItemStatus}
          />
        )}
      </div>
    </div>
  );
};

export default OrderManagementPage;
