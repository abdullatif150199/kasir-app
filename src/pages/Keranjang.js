import React, { Component, useEffect, useState } from "react";
import { Col, Row, ListGroup, Badge, Button } from "react-bootstrap";
import numberWithCommas from "../utils/utils";
import TotalBayar from "../components/TotalBayar";
import swal from "sweetalert";
import ModalKeranjang from "../components/ModalKeranjang";
import axios from "axios";
import { API_URL } from "../config/API_URL";
import { connect } from "react-redux";

class Hasil extends Component {
  state = {
    keranjangs: [],
    showModal: false,
    keranjangDetail: false,
    jumlah: 0,
    keterangan: "",
    totalHarga: 0,
  };

  refreshKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        this.setState({
          keranjangs: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.refreshKeranjangs();
  }

  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
      totalHarga: keranjang.totalHarga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handlePlus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  handleMinus = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      keterangan: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      totalHarga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data).then((res) => {
      swal({
        title: "Sukses!",
        text: `sukses update pesanan ${data.product.nama}`,
        icon: "success",
        button: false,
        timer: 1000,
      });
      this.refreshKeranjangs();
    });
  };

  handleDelete = (id) => {
    axios.delete(API_URL + "keranjangs/" + id).then((res) => {
      this.handleClose();
      this.refreshKeranjangs();
      swal({
        title: "Hapus Pesanan!",
        text: `sukses hapus pesanan ${this.state.keranjangDetail.product.nama}`,
        icon: "error",
        button: false,
        timer: 1000,
      });
    });
  };

  render() {
    // const keranjangs = this.props.keranjangs;
    const keranjangs = this.state.keranjangs;
    if (keranjangs.length === 0) {
      return (
        <div class="d-flex justify-content-center align-items-center text-center" style={{ height: "100vh" }}>
          <h5>
            <strong>Keranjang Anda Masih Kosong...</strong>
          </h5>
        </div>
      );
    }
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Col md={4} className="text-center hasil">
          {keranjangs.length > 0 && (
            <div className="overflow-scroll" style={{ height: "80vh" }}>
              <ListGroup variant="flush">
                <Row className="mt-2">
                  <Col md={2} sm={2} xs={2}>
                    <p>
                      <strong>JUMLAH</strong>
                    </p>
                    <hr />
                  </Col>
                  <Col md={6} sm={6} xs={6}>
                    <p>
                      <strong>HARGA/BIJI</strong>
                    </p>
                    <hr />
                  </Col>
                  <Col md={4} sm={4} xs={4}>
                    <p>
                      <strong>TOTAL</strong>
                    </p>
                    <hr />
                  </Col>
                </Row>
                {keranjangs.map((keranjang, index) => {
                  return (
                    <Row key={index}>
                      <Col md={2} sm={2} xs={2}>
                        <h5>
                          <Badge bg="success">{keranjang.jumlah}</Badge>
                        </h5>
                      </Col>
                      <Col md={6} sm={6} xs={6}>
                        <ListGroup.Item style={{ border: "none" }}>
                          <p>
                            <b>{keranjang.product.nama}</b>
                          </p>
                          <p>Rp.{numberWithCommas(keranjang.product.harga)}</p>
                        </ListGroup.Item>
                      </Col>
                      <Col md={4} sm={4} xs={4}>
                        <p>
                          <b>Rp.{numberWithCommas(keranjang.totalHarga)}</b>
                        </p>
                        <Button
                          bg="primary"
                          onClick={() => {
                            this.handleShow(keranjang);
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </ListGroup>
            </div>
          )}
          <ModalKeranjang handleClose={this.handleClose} {...this.state} handlePlus={this.handlePlus} handleMinus={this.handleMinus} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} />
          {keranjangs.length > 0 && <TotalBayar keranjangs={keranjangs} {...this.props} />}
        </Col>
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  axios
    .get(API_URL + "keranjangs")
    .then((res) => {
      const keranjang = res.data;
      dispatch({ type: "UPDATE_VALUE", payload: keranjang.length });
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    plusKeranjang: () => dispatch({ type: "UPDATE_VALUE" }),
    minusKeranjang: () => dispatch({ type: "PLUS" }),
  };
};

const stateToProps = (state) => {
  return {
    value: state.value,
  };
};

export default connect(stateToProps, dispatchToProps)(Hasil);
