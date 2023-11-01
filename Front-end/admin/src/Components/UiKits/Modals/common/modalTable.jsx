import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Btn } from "../../../../AbstractElements";
import { Close, SaveChanges } from "../../../../Constant";
import { useDispatch } from "react-redux";
import { addMealToTable } from "../../../../actions/table.actions";

const CommonModal = (props) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    // dispatch(
    //   addMealToTable({
    //     id: table.id,
    //     trang_thai: "Đang Ăn",
    //     mon_an: cart.map((c) => ({
    //       ma_mon_an: c.p._id,
    //       sl: c.qty,
    //     })),
    //   })
    // );
    props.toggler();
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggler}
      size={props.size}
      centered
    >
      <ModalHeader toggle={props.toggler}>{props.title}</ModalHeader>
      <ModalBody className={props.bodyClass}>{props.children}</ModalBody>
      <ModalFooter>
        <Btn
          attrBtn={{ color: "secondary", onClick: props.toggler }}
          onClick={props.toggler}
        >
          Đóng
        </Btn>
        <Btn
          attrBtn={{ color: "primary", onClick: props.deleteHandler }}
          onClick={deleteHandler}
        >
          Xóa
        </Btn>
      </ModalFooter>
    </Modal>
  );
};

export default CommonModal;
