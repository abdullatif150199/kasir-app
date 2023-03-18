import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import numberWithCommas from "../utils/utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/API_URL";

export default class TotalBayar extends Component {
  handleSubmit = (totalBayar) => {
    const pesanans = {
      totalHarga: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanans).then((res) => {
      this.props.keranjangs.map((keranjang) => {
        axios.delete(API_URL + "keranjangs/" + keranjang.id).then((res) => console.log(res));
      });
    });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.totalHarga;
    }, 0);
    // console.log(totalBayar);
    return (
      <div className="fixed-bottom margin-auto">
        <Row>
          <Col md={{ span: 5, offset: 3 }}>
            <h5>
              <span style={{ float: "left" }}>Total Harga : </span>
              <strong style={{ float: "right" }}>Rp.{numberWithCommas(totalBayar)}</strong>
            </h5>
            <Link to="/sukses">
              <Button
                variant="primary"
                className="mb-2 mt-2"
                size="md"
                style={{ width: "100%" }}
                onClick={() => {
                  this.handleSubmit(totalBayar);
                }}
              >
                Bayar
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
