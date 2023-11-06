import { getCartTotal } from "../../../../Services/Ecommerce.service";
import { Price, ProductName, Quantity, Sub_total } from "../../../../Constant";
import { H6, P } from "../../../../AbstractElements";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceDescription from "./InvoiceDescription";
import PrintInvoice from "./PrintInvoice";
import { Col, Label, Row, Table, Container, CardBody, Card } from "reactstrap";
import React, { Component, Fragment } from "react";

class ItemDescription extends Component {
  render() {
    const { cart, symbol, order } = this.props;
    const totalAmount = order?.mon_an?.reduce(
      (pre, curr) => pre + curr.ma_mon_an.gia * curr.sl,
      0
    );
    return (
      <Fragment>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="invoice">
                    <div>
                      <InvoiceHeader order={order} />
                      <InvoiceDescription order={order} />
                      <div
                        className="table-responsive invoice-table"
                        id="table"
                      >
                        <Table bordered striped>
                          <tbody>
                            <tr>
                              <td className="item">
                                <H6 attrH6={{ className: "p-2 mb-0" }}>
                                  Tên Món Ăn
                                </H6>
                              </td>
                              <td className="quantity">
                                <H6 attrH6={{ className: "p-2 mb-0" }}>
                                  Số Lượng
                                </H6>
                              </td>
                              <td className="Rate">
                                <H6 attrH6={{ className: "p-2 mb-0" }}>Giá</H6>
                              </td>
                              <td className="subtotal">
                                <H6 attrH6={{ className: "p-2 mb-0" }}>
                                  Tạm Tính
                                </H6>
                              </td>
                            </tr>
                            {order &&
                              order?.mon_an &&
                              order?.mon_an?.map((item) => {
                                return (
                                  <tr key={item.ma_mon_an._id}>
                                    <td>
                                      <Label>{item.ma_mon_an.ten_mon_an}</Label>
                                    </td>
                                    <td>
                                      <P
                                        attrPara={{
                                          className: "itemtext digits",
                                        }}
                                      >
                                        {item.sl}
                                      </P>
                                    </td>
                                    <td>
                                      <P
                                        attrPara={{
                                          className: "itemtext digits",
                                        }}
                                      >
                                        {item.ma_mon_an?.gia?.toLocaleString(
                                          "it-IT",
                                          {
                                            style: "currency",
                                            currency: "VND",
                                          }
                                        )}{" "}
                                      </P>
                                    </td>
                                    <td className="payment digits">
                                      <P
                                        attrPara={{
                                          className: "itemtext digits",
                                        }}
                                      >
                                        {(
                                          item.ma_mon_an.gia * item.sl
                                        )?.toLocaleString("it-IT", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </P>
                                    </td>
                                  </tr>
                                );
                              })}
                            <tr key="total">
                              <td>
                                <Label>Tổng Cộng</Label>
                              </td>
                              <td></td>
                              <td></td>
                              <td className="payment digits">
                                {totalAmount?.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <PrintInvoice />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default ItemDescription;
