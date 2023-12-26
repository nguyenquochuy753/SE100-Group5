import React from "react";
import Modal from "react-modal";
import "./Modal.css"; // File CSS để tạo kiểu cho modal
import axios from "axios";

const CustomModal = ({
  isOpen,
  handleClose,
  itemId,
  tableId,
  updateItemStatus,
}) => {
  console.log(itemId + "-" + tableId);
  const handleConfirm = () => {
    axios
      .put(`http://localhost:8000/v1/table/finishTheDish/${tableId}/${itemId}`)
      .then((response) => {
        // Cập nhật lại trạng thái món ăn từ OrderManagementPage
        updateItemStatus(itemId, "Chế biến xong");
        handleClose(); // Đóng modal sau khi xác nhận
      })
      .catch((error) => {
        console.error("Error confirming dish:", error);
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modalCheff"
      overlayClassName="overlayCheff"
    >
      <div className="modal-content-cheff">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <p>Bạn có chắc chắn muốn hoàn thành món ăn này?</p>
        <div className="modal-buttons-cheff">
          <button onClick={handleConfirm}>Xác nhận</button>
          <button onClick={handleClose}>Hủy</button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
